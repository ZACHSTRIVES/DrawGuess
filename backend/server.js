const express = require('express');
var MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const app = express();
var cors = require('cors');

var server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

app.use(cors())
const port = 8000;


var all_room_info=[]
var all_users=[]

// app.use(bodyParser.urlencoded({ extended: true }));
io.on('connection', function (socket) {
  //调用传入的回调方法，将操作结果返回
  const init_data = {rooms: all_room_info}
  socket.emit('user_on_conection', init_data)
  socket.broadcast.emit('user_on_conection', init_data);
  console.log("User Connected")
  require('./routes')(app, socket, all_room_info,init_data,all_users,io);


});



server.listen(port, () => {
  console.log('We are live on ' + port);

});
