const uuid = require('uuid');
const path = require('path');
const { Categories, Style, Product } = require('../models/models');
const ApiError = require('../error/ApiError');

class categoriesController {
  async create(req, res, next) {
    try {
      let { title, styles } = req.body;
      let { img } = req.files;
      let fileName = uuid.v4() + '.jpg';
      img.mv(path.resolve(__dirname, '..', 'static', fileName));

      let category = await Categories.create({ title, img: fileName });

      if (styles) {
        styles = JSON.parse(styles);
        styles.forEach((i) => {
          Style.create({ title: i.title, number: i.number, categoriesId: category.id });
        });
      } else {
        Style.create({ title: title, number: `${Date.now()}`, categoriesId: category.id });
      }

      return res.json(category);
    } catch (error) {
      next(ApiError.badReq(error.message));
    }
  }
  async get(req, res, next) {
    try {
      const categories = await Categories.findAll({
        include: { model: Style, as: 'styles' },
      });
      return res.json(categories);
    } catch (error) {
      next(ApiError.badReq(error.message));
    }
  }
  async getList(req, res, next) {
    try {
      let products = await Product.findAll();

      let categories = await Categories.findAll();

      console.log('message');
      let list = [];
      products.forEach((product) => {
        categories.forEach((category) => {
          if (category.id == product.categories && !list.includes(category)) {
            list.push(category);
          }
        });
      });
      console.log(list);
      return res.json(list);
    } catch (error) {
      next(ApiError.badReq(error.message));
    }
  }
  async delete(req, res, next) {
    try {
      const { id } = req.params;

      await Product.update({ categories: null, styleID: null }, { where: { categories: id } });

      const category = await Categories.destroy({
        where: { id: id },
      });

      return res.json(category);
    } catch (error) {
      next(ApiError.badReq(error.message));
    }
  }
  async put(req, res, next) {
    try {
      let { id } = req.params;
      let { title } = req.body;
      let { img } = req.files || req.body;

      let fileName;
      if (typeof img == 'string') {
        fileName = img;
      } else {
        fileName = uuid.v4() + '.jpg';
        img.mv(path.resolve(__dirname, '..', 'static', fileName));
      }

      let category = await Categories.update({ title, img: fileName }, { where: { id: id } });
      console.log('message');

      return res.json(category);
    } catch (error) {
      next(ApiError.badReq(error.message));
    }
  }
}

module.exports = new categoriesController();
