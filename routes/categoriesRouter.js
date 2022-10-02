const Router = require('express');
const router = new Router();
const categoriesController = require('../Controllers/categoriesController');

router.post('/', categoriesController.create);
router.delete('/:id', categoriesController.delete);
router.get('/', categoriesController.get);
router.get('/list', categoriesController.getList);
router.put('/:id', categoriesController.put);

module.exports = router;
