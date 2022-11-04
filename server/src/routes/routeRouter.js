const express = require('express');
const { Route } = require('../db/models');

const router = express.Router();

router.post('/add', async (req, res) => {
  try {
    const newRoute = await Route.create({
      title: req.body.title,
      description: req.body.description,
      done: false,
      done: req.body.photo,
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

router.route('/route/:id')
  .patch(async (req, res) => {
    try {
      const { id } = req.params;
      const {title, description, done, foto, date_start, private, rating} = req.body
      const route = await Route.findByPk(id)
      const changeRoute = await route.update({title, description, done, foto, date_start, private, rating})
      res.json(changeRoute)
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
        console.log (error)
    }
  });

  export default router;