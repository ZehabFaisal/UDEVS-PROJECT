import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  getUserById,
  saveJob,
  getSavedJobs,
  getAllUsers,
} from '../controllers/userController.js';
import { authenticate, isCandidate, authorize } from '../middleware/auth.js';

const router = express.Router();
router.get('/profile', authenticate, getUserProfile);
router.put('/profile', authenticate, updateUserProfile);
router.post('/jobs/:jobId/save', authenticate, isCandidate, saveJob);
router.get('/jobs/saved', authenticate, isCandidate, getSavedJobs);
router.get('/', authenticate, authorize('admin'), getAllUsers);

router.get('/:userId', getUserById);
export default router;