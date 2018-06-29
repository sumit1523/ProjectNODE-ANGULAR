var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');
var passport = require('passport');
var morgan = require('morgan');
var winston = require('./config/winston');
let scheduleUpdate = require('./CRON/scheduleUpdate');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var registerRouter = require('./routes/register');
var authRouter = require('./routes/auth');
var playerRouter = require('./routes/player');
var videosRouter = require('./routes/videos');
var likeAndCommentRouter = require('./routes/likeAndComment');
var chatRouter = require('./routes/chatbox');
var productRouter = require('./routes/product');
var socket = require('socket.io');
var shopping = require('./models/shopping');
var config = require('config');


var app = express();
var urlEncoderParser = bodyParser.urlencoded({ extended: false });

//don't show the log when it is test
if(config.util.getEnv('NODE_ENV') !== 'test') {
  app.use(morgan('combined', { stream: winston.stream }));
}


mongoose.connect(config.DBHost,function(){
  console.log("MONGO DataBase Connected with "+process.env.NODE_ENV+ " Environment");
  winston.info("MONGO DataBase Connected");
  //console.log(config.util.getEnv('NODE_ENV'));
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(cookieParser());
app.use(passport.session())
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/auth', authRouter);
app.use('/player', playerRouter);
app.use('/allvideos', videosRouter);
app.use('/like-dislike', likeAndCommentRouter);
app.use('/chat',chatRouter);
app.use('/product', productRouter);

// app.post('/add',(req,res)=>{
//   var newproduct = new shopping.productlist;
//   newproduct.flag = true
//   newproduct.CategoryID= "5b2bae3f31c1e922b0fd98e0"
//   newproduct.ProductName="Yuva India Men's Cricket T-Shirt"
//   newproduct.Description="Matching up with the ever increasing requirements of the customers, we are engaged in providing Men's Cricket T-Shirt."
//   newproduct.Quantity= 3
//   newproduct.image="https://5.imimg.com/data5/DV/DY/MY-37164004/star-india-men-s-cricket-t-shirt-500x500.jpg"
//   newproduct.price= 350;
//   newproduct.save((err,result)=>{console.log(result)})
//   res.json("Operation Done");
// })



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
var server = app.listen(3001, ()=>console.log("Listen to port No 3001"));
server;
//socket setup
var io = socket(server);

io.on('connection',function(socket){
  winston.info('made socket connection');
  
  socket.on('chat',function(data) {
    winston.info('data rx',data)
    io.sockets.emit('chat',data)
  });
  
  socket.on('join',function(data) {
    socket.join(data.email)
  });
  
});

module.exports = app;
