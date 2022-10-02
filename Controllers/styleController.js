const { Style } = require('../models/models');
const ApiError = require('../error/ApiError');

class styleController {
  async create(req, res, next) {
    try {
      const { categoriesId, title, number } = req.body;
      const style = await Style.create({ title, categoriesId, number });
      return res.json({ style });
    } catch (error) {
      next(ApiError.badReq(error.message));
    }
  }
  async get(req, res, next) {
    try {
      const style = await Style.findAll();
      return res.json(style);
    } catch (error) {
      next(ApiError.badReq(error.message));
    }
  }
  async delete(req, res, next) {
    try {
      const { id } = req.body;
      const style = await Style.destroy({
        where: { id: id },
      });
      return res.json(style);
    } catch (error) {
      next(ApiError.badReq(error.message));
    }
  }
  async put(req, res, next) {
    try {
      let { id } = req.params;
      let { title, number, categoriesId } = req.body;

      let style = await Style.update(
        { title, number, categoriesId },
        {
          where: { id: id },
        },
      );
      return res.json(style);
    } catch (error) {
      next(ApiError.badReq(error.message));
    }
  }
}

module.exports = new styleController();
