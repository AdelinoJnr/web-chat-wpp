const moment = require('moment');
const Model = require('../models/messages');

const generetorMessage = async ({ chatMessage, nickname }, io) => {
  const timestamp = moment().format('DD-MM-yyyy HH:mm:ss A');
  await Model.create({ message: chatMessage, nickname, timestamp });
  io.emit('message', `${timestamp} - ${nickname}: ${chatMessage}`);
};

module.exports = { generetorMessage };
