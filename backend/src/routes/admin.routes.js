const { authAdmin } = require('../middleware/authMiddleware');
     
router.get('/dashboard-stats', authAdmin, adminController.getStats);