const Router = require('express');
const router = new Router();
const styleController = require('../Controllers/styleController');

router.post('/', styleController.create);
router.put('/delete/:id', styleController.delete);
router.get('/', styleController.get);
router.put('/:id', styleController.put);

module.exports = router;
