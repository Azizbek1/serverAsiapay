const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const db = require('./helper/db');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users/users');
const sliderRouter = require('./routes/main/slider');
const menuRouter = require('./routes/main/menu')
const blogRouter = require('./routes/blog/blog');
const cardRouter = require('./routes/main/card');
const vakanceRouter = require('./routes/vakansi/vakansiCard');
const contactRouter = require('./routes/contact/contact');
const categoryRouter = require('./routes/category/MobileCat');

const app = express();


dotenv.config();

/* DataBase  */
db();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/', indexRouter);
app.use('/api', usersRouter);
app.use('/api/menu', menuRouter)
app.use('/api/slider', sliderRouter)
app.use('/api/card', cardRouter)
app.use('/api/blog', blogRouter)
app.use('/api/cat', categoryRouter)
app.use('/api/vakanci', vakanceRouter)
app.use('/api/contact', contactRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


module.exports = app;
