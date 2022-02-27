const connection = require('./connections');

const getAllMessages = async () => {
  const db = await connection();
  const result = await db.collection('messages').find().toArray();

  return result;
};

const create = async (data) => {
  const db = await connection();
  await db.collection('messages').inserOne({ ...data });
};

module.exports = { getAllMessages, create };
