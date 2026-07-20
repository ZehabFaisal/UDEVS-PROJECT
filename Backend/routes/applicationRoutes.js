import express from 'express';
import { submitApplication, getApplicationById, getCandidateApplications, 
  updateApplicationStatus } from '../controllers/applicationController.js';
import { authenticate, isCandidate, isRecruiter } from '../middleware/auth.js';

const router = express.Router();

router.post('/:jobId', authenticate, isCandidate, submitApplication);
router.get('/candidate/my-applications', authenticate, isCandidate, getCandidateApplications);
router.patch('/:applicationId/status', authenticate, isRecruiter, updateApplicationStatus);

router.get('/:applicationId', authenticate, getApplicationById);

export default router;