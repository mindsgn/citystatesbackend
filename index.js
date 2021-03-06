const express = require('express')
const path = require('path');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

var port = process.env.PORT || 3000;
const app = express();

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded());
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'build')));

//app.get('/connect', (req, res) =>{
  io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('post', (message) => {
      console.log('message: ', message);

      io.emit('post', message);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
//})


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

server.listen(port, () => console.log('server is running', port))
