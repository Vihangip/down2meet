var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var postsRouter = require('./routes/posts');
var usersRouter = require('./routes/users');
var calendarRouter = require('./routes/calendar');

var app = express();
var cors = require('cors');

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = "mongodb+srv://PLLOW:down2meet@Down2meet.8i1q7am.mongodb.net/UserData?retryWrites=true&w=majority"

main().catch((err) => console.log(err));
async function main(){
    await mongoose.connect(mongoDB);


app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3001, () => {
    console.log(`Server Started at ${3001}`)
})

app.use('/', indexRouter);
app.use('/posts', postsRouter);
app.use('/users', usersRouter);
app.use('/calendar', calendarRouter);


}

module.exports = app;
