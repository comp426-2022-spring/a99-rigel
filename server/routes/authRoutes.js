const { Router } = require('express');
const authController = require('')
const router = Router();

router.get('/Register', authController.register_get);
router.post('/Register', authController.register_post);
router.get('/Login', authController.login_get);
router.post('/Login', authController.login_post);

module.exports = router;