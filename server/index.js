var express = require('express');

// APP de express -> Metodo de la libreria
var app = express();

//Servidor de node -> Servidor de express -> Le pasamos la app de express
var server = require('http').Server(app);
var io = require('socket.io')(server);

//Middleware
app.use(express.static('client'))

app.get('/hola-mundo', function (req, res) {
    res.status(200).send('Hola mundo desde una ruta');
});

var messages = [{
    id: 1,
    text: 'Bienvenido al chat privado de Socket.io y NodeJs de David Gómez...',
    nickname: 'Bot - davidgomez'
}];

io.on('connection', function (socket) {
    console.log('El nodo con IP: ' + socket.handshake.address + ' se ha conectado ...');

    socket.emit('messages', messages);

    socket.on('add-message', function(data){
        messages.push(data);
        io.sockets.emit('messages', messages);
    });
});

server.listen(6677, function () {
    console.log('Servidor está funcionando en http://localhost:6677')
});

