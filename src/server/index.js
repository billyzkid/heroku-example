const path = require('path');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

let users = [];

app.use(express.static(path.join(__dirname, '../client')));

io.on('connection', function(socket) {
  console.log(`connecting ${socket.id}`);

  //REMOVE FOR PRODUCTION, THIS IS JUST TO MAKE MY LIFE EASIER WHILE I MAKE CHANGES
  //socket.emit('server reset');
  //REMOVE FOR PRODUCTION

  socket.on('disconnect', function() {
    console.log(`disconnecting ${socket.id}`)
  });

  socket.on('new user', function(data) {
    console.log(`welcoming ${socket.id} (${data.name})`);

    users.push({
      id: socket.id,
      name: data.name
    });

    socket.emit('welcome', {
      users: users, 
      greeting: `Welcome, ${data.name}`
    });

  });

});

const port = process.env.PORT || 4000;

server.listen(port, function() {
  console.log(`You're tuned in to port ${port}!`);
});