import { getProfile } from '../controllers/userProfileController.js';
import { protect } from '../middleware/authMiddleware.js';
import router from './auth.js';

router.get('/', protect, getProfile);

export default router;