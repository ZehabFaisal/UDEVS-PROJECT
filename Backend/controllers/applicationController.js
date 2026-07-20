import { Application, Job, User } from '../models/index.js';
import { Op } from 'sequelize';

export const submitApplication = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { cover_letter, resume_url } = req.body;
    const job = await Job.findByPk(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      });
    }

    if (job.status !== 'active') {
      return res.status(400).json({
        success: false,
        message: 'This job is not accepting applications',
      });
    }
    const existingApplication = await Application.findOne({
      where: {
        job_id: jobId,
        candidate_id: req.user.id,
      },
    });

    if (existingApplication) {
      return res.status(409).json({
        success: false,
        message: 'You have already applied for this job',
      });
    }

    const application = await Application.create({
      job_id: jobId,
      candidate_id: req.user.id,
      cover_letter,
      resume_url,
      status: 'submitted',
    });

    await job.increment('application_count');

    res.status(201).json({
      success: true,
      message: 'Application is submitted successfully',
      application,
    });
  } 
  catch (error) {
    console.error('Submit application error:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting application',
      error: error.message,
    });
  }
};

export const getApplicationById = async (req, res) => {
  try {
    const { applicationId } = req.params;

    const application = await Application.findByPk(applicationId, {
      include: [
        {
          model: Job,
          as: 'job',
          attributes: ['id', 'title', 'company', 'location'],
        },
        {
          model: User,
          as: 'candidate',
          attributes: ['id', 'name', 'email', 'phone', 'profile_image'],
        },
      ],
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found',
      });
    }

    res.status(200).json({
      success: true,
      application,
    });
  } catch (error) {
    console.error('Get application error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching application',
      error: error.message,
    });
  }
};

export const getCandidateApplications = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const where = { candidate_id: req.user.id };
    if (status) where.status = status;

    const { rows, count } = await Application.findAndCountAll({
      where,
      include: [
        {
          model: Job,
          as: 'job',
          attributes: ['id', 'title', 'company', 'location', 'job_type', 'salary_min', 'salary_max'],
        },
      ],
      order: [['created_at', 'DESC']],
      offset,
      limit: parseInt(limit),
    });

    res.status(200).json({
      success: true,
      applications: rows,
      pagination: {
        total: count,
        pages: Math.ceil(count / limit),
        currentPage: parseInt(page),
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    console.error('Get candidate applications error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching applications',
      error: error.message,
    });
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status, rejection_reason, rating, feedback } = req.body;

    const application = await Application.findByPk(applicationId, {
      include: [{ model: Job, as: 'job', attributes: ['posted_by'] }],
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found',
      });
    }

    if (application.job.posted_by !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized to update this application',
      });
    }

    const validStatuses = ['submitted', 'reviewing', 'shortlisted', 'rejected', 'accepted'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`,
      });
    }

    await application.update({
      status,
      rejection_reason,
      rating,
      feedback,
    });

    res.status(200).json({
      success: true,
      message: 'Application updated successfully',
      application,
    });
  } catch (error) {
    console.error('Update application error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating application',
      error: error.message,
    });
  }
};