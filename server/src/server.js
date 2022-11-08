const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

const session = require('express-session');
const FileStore = require('session-file-store')(session);
const userRouter = require('./routes/userRouter');
const routeRouter = require('./routes/routeRouter');
const autoRouter = require('./routes/carRouter');

app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb', extended: true }));
app.use(express.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));

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

app.use('/user', userRouter);
app.use('/api/v1/routes', routeRouter);
app.use('/car', autoRouter);

app.listen(PORT, () => console.log(`Server has started on PORT ${PORT}`));
