import { Job, User, Application } from '../models/index.js';
import { Op } from 'sequelize';

export const createJob = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      job_type,
      salary_min,
      salary_max,
      description,
      requirements,
      benefits,
      skills,
      category,
    } = req.body;

    if (!title || !company || !location || !job_type || !description) {
      return res.status(400).json({
        success: false,
        message: 'Required fields: title, company, location, job_type, description',
      });
    }

    const job = await Job.create({
      title,
      company,
      location,
      job_type,
      salary_min,
      salary_max,
      description,
      requirements: requirements || [],
      benefits: benefits || [],
      skills: skills || [],
      category,
      posted_by: req.user.id,
      status: 'draft',
    });

    res.status(201).json({
      success: true,
      message: 'Job created successfully',
      job,
    });
  } catch (error) {
    console.error('Create job error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating job',
      error: error.message,
    });
  }
};

export const updateJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findByPk(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      });
    }

    if (job.posted_by !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized to update this job',
      });
    }

    await job.update(req.body);

    res.status(200).json({
      success: true,
      message: 'Job updated successfully',
      job,
    });
  } catch (error) {
    console.error('Update job error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating job',
      error: error.message,
    });
  }
};

export const getJobById = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findByPk(jobId, {
      include: [
        {
          model: User,
          as: 'recruiter',
          attributes: ['id', 'name', 'email', 'company', 'profile_image'],
        },
        {
          model: Application,
          as: 'applications',
          attributes: ['id', 'status', 'created_at'],
          required: false,
        },
      ],
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      });
    }

    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    console.error('Get job error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching job',
      error: error.message,
    });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const { search, location, job_type, status = 'active', page = 1, limit = 10 } = req.query;

    const where = {};
    if (status) where.status = status;
    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { company: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
      ];
    }
    if (location) where.location = { [Op.iLike]: `%${location}%` };
    if (job_type) where.job_type = job_type;

    const offset = (page - 1) * limit;

    const { rows, count } = await Job.findAndCountAll({
      where,
      include: [
        {
          model: User,
          as: 'recruiter',
          attributes: ['id', 'name', 'email', 'company', 'profile_image'],
        },
      ],
      order: [['created_at', 'DESC']],
      offset,
      limit: parseInt(limit),
    });

    res.status(200).json({
      success: true,
      jobs: rows,
      pagination: {
        total: count,
        pages: Math.ceil(count / limit),
        currentPage: parseInt(page),
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching jobs',
      error: error.message,
    });
  }
};

export const getRecruiterJobs = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const { rows, count } = await Job.findAndCountAll({
      where: { posted_by: req.user.id },
      include: [
        {
          model: Application,
          as: 'applications',
          attributes: ['id', 'status', 'created_at'],
        },
      ],
      order: [['created_at', 'DESC']],
      offset,
      limit: parseInt(limit),
    });

    res.status(200).json({
      success: true,
      jobs: rows,
      pagination: {
        total: count,
        pages: Math.ceil(count / limit),
        currentPage: parseInt(page),
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    console.error('Get recruiter jobs error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching recruiter jobs',
      error: error.message,
    });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findByPk(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      });
    }

    if (job.posted_by !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized to delete this job',
      });
    }

    await job.destroy();

    res.status(200).json({
      success: true,
      message: 'Job deleted successfully',
    });
  } catch (error) {
    console.error('Delete job error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting job',
      error: error.message,
    });
  }
};
