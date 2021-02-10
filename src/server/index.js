const path = require('path');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, '../client')));

io.on('connection', function(socket) {
  console.log('new connection from ' + socket.id);

  socket.on('disconnect', function() {
    console.log(`${socket.id} disconnect`)
  });
});

const port = process.env.PORT || 4000;

server.listen(port, function() {
  console.log(`You're tuned in to port ${port}!`);
});