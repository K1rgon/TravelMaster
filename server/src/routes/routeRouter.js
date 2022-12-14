const express = require('express');
const { where } = require('sequelize');
const { Route } = require('../db/models');

const router = express.Router();

router.post('/add', async (req, res) => {
  try {
    const newRoute = await Route.create({
      title: req.body.title,
      description: req.body.description,
      done: false,
      foto: req.body.foto,
      date_start: req.body.date_start,
      private: false,
      start_x: req.body.start_x,
      finish_x: req.body.finish_x,
      user_id: req.session.userSession.id,
    });
    res.status(200).json(newRoute);
  } catch (error) {
    console.log(error);
  }
});

router.get('/myroutes', async (req, res) => {
  try {
    console.log('1111111', req.session);
    const { id } = req.session.userSession;
    console.log('BACK', id);
    const routesByUser = await Route.findAll({ where: { user_id: id } });
    res.status(200).json(routesByUser);
  } catch (error) {
    console.log(error);
  }
});

router.route('/route/:id')
  .get(async (req, res) => {
    try {
      const { id } = req.params;
      const route = await Route.findByPk(id);
      res.status(200).json(route);
    } catch (error) {
      console.log(error);
    }
  })
  .patch(async (req, res) => {
    try {
      const { id } = req.params;
      const {
        title, description, done, foto, date_start, date_finish, rating,
      } = req.body;
      const privateRoute = req.body.private;
      const route = await Route.findByPk(id);
      const changeRoute = await route.update({
        title, description, done, foto, date_start, date_finish, private: privateRoute, rating,
      });
      res.json(changeRoute);
    } catch (error) {
      console.log(error);
    }
  })
  .delete(async (req, res) => {
    try {
      const { id } = req.params;
      await Route.destroy({ where: { id } });
      res.sendStatus(201);
    } catch (error) {
      console.log(error);
    }
  });

router.get('/', async (req, res) => {
  console.log('Public', req.session);
  const allRoutes = await Route.findAll({
    where: {
      private: false,
    },
  });
  res.status(200).json(allRoutes);
});

module.exports = router;
