const moment = require('moment');
const Model = require('../models/messages');

const users = {};

const generetorMessage = async ({ message, nickname }, io) => {
  const timestamp = moment().format('DD-MM-yyyy HH:mm:ss A');
  await Model.create({ message, nickname, timestamp });
  io.emit('message', `${timestamp} - ${nickname}: ${message}`);
};

const getListUsers = () => Object.values(users);

const createUser = (socket) => {
  users[socket.id] = socket.id;
};

const editNickName = (socket, nickname, io) => {
  users[socket.id] = nickname;
  console.log(users);
  io.emit('users', getListUsers());
};

const disconnectUser = (socket, io) => {
  delete users[socket.id];
  console.log('usuario desconectado');
  io.emit('users', getListUsers());
};

module.exports = {
  generetorMessage, getListUsers, createUser, editNickName, disconnectUser,
};
