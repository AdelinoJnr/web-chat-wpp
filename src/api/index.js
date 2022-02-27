const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
const socket = require('socket.io');
const webChat = require('../sockets/webChat');
require('dotenv').config();

const { PORT_FRONT } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const server = http.createServer(app);
const io = socket(server, { cors: { origin: `http://localhost:${PORT_FRONT}` } });

webChat(io);

module.exports = app;
