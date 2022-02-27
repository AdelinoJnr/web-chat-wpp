const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const http = require('http');
const socket = require('socket.io');
const webChat = require('../sockets/webChat');
require('dotenv').config();

const { PORT_FRONT } = process.env;
const configCors = { cors: { origin: `http://localhost:${PORT_FRONT}`, methods: ['GET', 'POST'] } };
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const server = http.createServer(app);
const io = socket(server, configCors);

webChat(io);

module.exports = server;
