require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var postsRouter = require('./routes/posts');
var usersRouter = require('./routes/users');
var eventRouter = require('./routes/events');
var groupsRouter = require('./routes/groups');
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var sessionRouter = require('./routes/session');
const crypto = require('crypto');

function generateRandomString(length) {
  return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}

const secretKey = generateRandomString(32);
var cors = require('cors');

const session = require('express-session');
const passport = require('passport');
require('./passport');

var app = express();
app.use(cors(
  {
  origin: `${process.env.REACT_APP_URL3000}`,
  credentials: true,
}
));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../down2meet/build')));

app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = "mongodb+srv://PLLOW:down2meet@Down2meet.8i1q7am.mongodb.net/UserData?retryWrites=true&w=majority"
const eventQueries = require('./mongoDB/EventQueries');

main().catch((err) => console.log(err));
async function main(){
    await mongoose.connect(mongoDB);

app.listen(3001, () => {
    console.log(`Server Started at ${3001}`)
})

app.use('/auth', authRouter);
app.use('/', indexRouter);
app.use('/posts', postsRouter);
app.use('/users', usersRouter);
app.use('/event', eventRouter);
app.use('/groups', groupsRouter);
app.use('/session', sessionRouter);

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../down2meet/build', 'index.html')); 
});

}

module.exports = app;
