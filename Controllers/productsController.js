const uuid = require('uuid');
const path = require('path');
const ApiError = require('../error/ApiError');
const { Product, ProductDescription } = require('../models/models');

class productController {
  async create(req, res, next) {
    try {
      let { categories, styleID, name, price, description } = req.body;
      const { img } = req.files;

      let fileName = uuid.v4() + '.jpg';
      img.mv(path.resolve(__dirname, '..', 'static', fileName));

      const product = await Product.create({
        categories,
        styleID,
        name,
        price,
        img: fileName,
      });

      if (description) {
        description = JSON.parse(description);
        description.forEach((i) =>
          ProductDescription.create({
            title: i.title,
            text: i.text,
            number: i.number,
            productId: product.id,
          }),
        );
      } else {
        ProductDescription.create({
          title: 'Материалы',
          text: 'Произвольные',
          number: Date.now(),
          productId: product.id,
        });
        ProductDescription.create({
          title: 'Тон',
          text: 'Индивидуальный',
          number: Date.now(),
          productId: product.id,
        });
        ProductDescription.create({
          title: 'Размеры',
          text: 'Индивидуальные',
          number: Date.now(),
          productId: product.id,
        });
      }

      return res.json(product);
    } catch (error) {
      next(ApiError.badReq(error.message));
    }
  }
  async get(req, res, next) {
    try {
      const products = await Product.findAll({
        include: { model: ProductDescription, as: 'description' },
      });
      return res.json(products);
    } catch (error) {
      next(ApiError.badReq(error.message));
    }
  }
  async delete(req, res, next) {
    try {
      const { id } = req.params;

      const product = await Product.destroy({ where: { id } });

      return res.json(product);
    } catch (error) {
      next(ApiError.badReq(error.message));
    }
  }
  async put(req, res, next) {
    try {
      let { id } = req.params;
      let { categories, styleID, name, price, description, oldDesc } = req.body;
      let { img } = req.files || req.body;

      let fileName;
      if (typeof img == 'string') {
        fileName = img;
      } else {
        fileName = uuid.v4() + '.jpg';
        img.mv(path.resolve(__dirname, '..', 'static', fileName));
      }

      let product = await Product.update(
        {
          categories,
          styleID,
          name,
          price,
          img: fileName,
        },
        {
          where: { id: id },
        },
      );

      if (oldDesc) {
        oldDesc = JSON.parse(oldDesc);
        oldDesc.forEach((i) => ProductDescription.destroy({ where: { productId: id } }));
      }

      if (description) {
        description = JSON.parse(description);
        description.forEach((i) =>
          ProductDescription.create({
            title: i.title,
            text: i.text,
            number: i.number,
            productId: id,
          }),
        );
      }

      return res.json(product);
    } catch (error) {
      next(ApiError.badReq(error.message));
    }
  }
  async getOne(req, res) {}
}

module.exports = new productController();
