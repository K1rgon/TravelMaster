const express = require('express');
const { Auto } = require('../db/models');

const router = express.Router();

router
  .get('/all', async (req, res) => {
    const id = req.session.userId;
    const allCars = await Auto.findAll({
      where: {
        user_id: id,
      },
    });
    res.json(allCars);
  })
  .post('/new', async (req, res) => {
    const {
      id, brand, model, year, fuel,
    } = req.body;
    console.log(id, brand, model, year);
    if (brand !== undefined && model !== undefined && year !== undefined && fuel !== undefined) {
      if (brand !== '' || model !== '' || year !== '' || fuel !== '') {
        const newCar = await Auto.create({
          brand, model, year, user_id: id, fuel,
        });
        console.log(newCar);
        newCar.save();
      }
      console.log('123-car');
    }
    const allCars = await Auto.findAll({
      where: {
        user_id: id,
      },
    });
    res.json(allCars);
  });

module.exports = router;
