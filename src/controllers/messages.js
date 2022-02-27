const Model = require('../models/messages');

const getAllMessages = async (_req, res) => {
  const messages = await Model.getAllMessages();

  res.status(200).json(messages);
};

module.exports = { getAllMessages };
