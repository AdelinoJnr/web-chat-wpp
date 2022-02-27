const Model = require('../models/messages');
const Helpers = require('../helpers/users');

const users = [];

const webChat = (io) => io.on('connection', async (socket) => {
  console.log('BEM-VINDO');

  // Adiciona nova usuario que entrou no array
  users[socket.id] = socket.id;

  // Ataualiza o historico de mensagem para o usuario que entrou
  socket.emit('loginUser', await Model.getAllMessages());

  // Atualiza para todos os usaurios quem acabou de entrar
  io.emit('allUsers', Object.values(users));

  // Troca o nome do usuario pela sua escolha
  socket.on('nickname', (nickname) => {
    users[socket.id] = nickname;
    io.emit('allUsers', Object.values(users));
  });

  // Cria uma mensagem em tempo real no chat
  socket.on('message', (data) => Helpers.generetorMessage(data, io));

  // Disconecta um usuario ao fechar a pagina alertando todos usuarios
  socket.on('disconnect', () => {
    delete users[socket.id];
    io.emit('allUsers', Object.values(users));

    console.log('Usuario desconectado');
  });
});

module.exports = webChat;
