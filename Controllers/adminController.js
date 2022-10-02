const { Admin } = require('../models/models');
const ApiError = require('../error/ApiError');

class adminController {
  async check(req, res, next) {
    try {
      console.log('AUTH');
      let { password } = req.body;

      const admin = await Admin.findOne({
        where: { password: password },
      });
      console.log(admin);
      if (!admin) {
        return res.status(404).json({ message: 'Неверный пароль' });
      } else {
        return res.json(admin);
      }
    } catch (error) {
      next(ApiError.badReq(error.message));
    }
  }
}

module.exports = new adminController();
