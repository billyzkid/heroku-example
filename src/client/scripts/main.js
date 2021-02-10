import Card from './Card.js'

console.log(new Card('Ace', 'Spades'));

$(document).ready(function() {
  console.log('main.js loaded');

  let users = [];
  var socket = io();

  socket.emit('new user', { name: 'Will' });

  socket.on('welcome', function(data) {
    users = data.users;

    $('body').append(`<p>${data.greeting}!</p>`);
  });

});
