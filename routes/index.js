const Router = require('express');
const router = new Router();
const productsRouter = require('./productsRouter');
const categoriesRouter = require('./categoriesRouter');
const styleRouter = require('./styleRouter');
const adminRouter = require('./adminRouter');

router.use('/admin', adminRouter);
router.use('/product', productsRouter);
router.use('/categories', categoriesRouter);
router.use('/styles', styleRouter);

module.exports = router;
