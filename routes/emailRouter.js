const Router = require('express');
const router = new Router();
const emailController = require('../Controllers/emailController');

router.post('/', emailController.send);

module.exports = router;
