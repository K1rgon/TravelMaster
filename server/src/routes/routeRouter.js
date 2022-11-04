const express = require('express');
const { Route } = require('../db/models');

const router = express.Router();

router.post('/add', async (req, res) => {
  try {
    const newRoute = await Route.create({
      title: req.body.title,
      description: req.body.description,
      done: false,
      foto: req.body.photo,
      date_start: req.body.dateStart,
      private: false,
      user_id: req.session.userSession.id,
    });
    res.status(200).json(newRoute);
  } catch (error) {
    console.log(error);
  }
});

router.post('/myroutes', async (req, res) => {
  try {
    const routesByUser = await Route
      .findAll({ where: { user_id: req.session.userSession.id } });
    res.status(200).json(routesByUser);
  } catch (error) {
    console.log(error);
  }
});
