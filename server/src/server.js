const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bcrypt = require('bcrypt');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

const session = require('express-session');
const FileStore = require('session-file-store')(session);


app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.json());

const sessionConfig = {
  name: 'TravelMaster',
  store: new FileStore(),
  secret: 'FOR KHAZ MODAN',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 10,
    httpOnly: true,
  },
};

app.use(session(sessionConfig));

app.listen(PORT, () => console.log(`Server has started on PORT ${PORT}`));
