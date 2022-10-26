require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const path = require('path');
const fileUpload = require('express-fileupload');
const router = require('./routes/index');

const PORT = process.env.PORT || 8080;
const app = express();
app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use('/api', router);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'РАБОТАЕТ)' });
});

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Сервер успешно запущен на порте: ${PORT}`));
  } catch (e) {
    console.log('Ошибка запуска: ', e);
  }
};

start();
