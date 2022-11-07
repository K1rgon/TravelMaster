const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../db/models');

const router = express.Router();

router.route('/signup')
  .post(async (req, res) => {
    const {
      login, email, password, name, surname, foto,
    } = req.body;
    const hashPass = await bcrypt.hash(password, 10);
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        const newUser = await User.create({
          login, email, password: hashPass, name, surname, foto,
        });
        req.session.userSession = { id: newUser.id, email: newUser.email, login: newUser.login };
        req.session.userId = newUser.id;
        req.session.userLogin = newUser.login;
        res.json({ id: newUser.id, login: newUser.login });
      }
    } catch (error) {
      console.log('Signup err', error);
    }
  });

router.route('/signin')
  .post(async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (user) {
        const checkPass = await bcrypt.compare(password, user.password);
        if (checkPass) {
          req.session.userSession = { id: user.id, email: user.email };
          req.session.userLogin = user.login;
          console.log(user);
          res.json({
            login: user.login, email: user.email, id: user.id, foto: user.foto,
          });
        } else {
          res.status(400).json('Email или пароль введены не верно.');
        }
      }
    } catch (error) {
      console.log('Signin err', error);
    }
  });

router.get('/logout', async (req, res) => {
  req.session.destroy();
  res.clearCookie('TravelMaster');
  res.sendStatus(200);
});

router.get('/check', (req, res) => {
  const { userId, userLogin } = req.session;
  res.json({ login: userLogin, id: userId });
  res.end();
});

router.post('/update', async (req, res) => {
  try {
    const { foto, id } = req.body;
    const user = await User.findOne({
      where: {
        id,
      },
    });
    user.foto = foto;
    user.save();
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
