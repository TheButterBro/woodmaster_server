const Router = require('express');
const router = new Router();
const productsController = require('../Controllers/productsController');

router.post('/', productsController.create);
router.delete('/:id', productsController.delete);
router.get('/', productsController.get);
router.put('/:id', productsController.put);

module.exports = router;
