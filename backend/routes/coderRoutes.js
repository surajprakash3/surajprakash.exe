import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  getCoderOverview,
  getCodingPlatforms,
  getDSAProgress,
  getCoderSettings,
  getCodingAchievements,
  getAllPlatformsAdmin,
  createPlatform,
  updatePlatform,
  deletePlatform,
  syncPlatform,
  syncAllPlatforms,
  createDSATopic,
  updateDSATopic,
  deleteDSATopic,
  updateCoderSettings,
  createAchievement,
  updateAchievement,
  deleteAchievement
} from '../controllers/coderController.js';

const router = express.Router();

// Public routes
router.get('/overview', getCoderOverview);
router.get('/platforms', getCodingPlatforms);
router.get('/dsa', getDSAProgress);
router.get('/settings', getCoderSettings);
router.get('/achievements', getCodingAchievements);

// Protected Admin routes
router.get('/admin/platforms', protect, getAllPlatformsAdmin);
router.post('/platforms', protect, createPlatform);
router.put('/platforms/:id', protect, updatePlatform);
router.delete('/platforms/:id', protect, deletePlatform);

router.post('/sync/:id', protect, syncPlatform);
router.post('/sync-all', protect, syncAllPlatforms);

router.post('/dsa', protect, createDSATopic);
router.put('/dsa/:id', protect, updateDSATopic);
router.delete('/dsa/:id', protect, deleteDSATopic);

router.put('/settings', protect, updateCoderSettings);

router.post('/achievements', protect, createAchievement);
router.put('/achievements/:id', protect, updateAchievement);
router.delete('/achievements/:id', protect, deleteAchievement);

export default router;
