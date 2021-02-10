import path from 'path';
import url from 'url';
import express from 'express';
import {Server as HttpServer} from 'http';
import {Server as SocketServer} from 'socket.io';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = new HttpServer(app);
const socketServer = new SocketServer(httpServer);
const port = process.env.PORT || 4000;

let users = [];

app.use(express.static(path.join(__dirname, '../client')));

socketServer.on('connection', (socket) => {
  console.log(`connecting ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`disconnecting ${socket.id}`)
  });

  socket.on('new user', (data) => {
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

httpServer.listen(port, () => {
  console.log(`You're tuned in to port ${port}!`);
});