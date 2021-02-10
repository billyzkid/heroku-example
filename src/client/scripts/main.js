$(document).ready(function() {
  console.log('main.js loaded');

  var socket = io();

  socket.emit('new user', { name: "Will" });

  socket.on('welcome', function(data) {
    users = data.users;

    $('body').append(`<p>${data.greeting}!</p>`);
  });

});
