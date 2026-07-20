import express from 'express';
import {
  createJob,
  updateJob,
  getJobById,
  getAllJobs,
  getRecruiterJobs,
  deleteJob,
} from '../controllers/jobController.js';
import { authenticate, authorize, isRecruiter } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllJobs);
router.get('/:jobId', getJobById);

router.post('/', authenticate, isRecruiter, createJob);
router.put('/:jobId', authenticate, isRecruiter, updateJob);
router.delete('/:jobId', authenticate, isRecruiter, deleteJob);
router.get('/recruiter/my-jobs', authenticate, isRecruiter, getRecruiterJobs);

export default router;