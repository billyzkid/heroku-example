import User from './User.js'

let user = new User('Will');

$(document).ready(function() {
  console.log('main.js loaded');

  let users = [];
  let socket = io();

  socket.emit('new user', { name: user.name });

  socket.on('welcome', function(data) {
    users = data.users;

    $('body').append(`<p>${data.greeting}!</p>`);
  });

});
