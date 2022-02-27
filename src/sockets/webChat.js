const Model = require('../models/messages');
const Helpers = require('../helpers/users');

const webChat = (io) => io.on('connection', async (socket) => {
  console.log('BEM-VINDO');

  // Adiciona nova usuario que entrou no array
  Helpers.createUser(socket);

  // Ataualiza o historico de mensagem para o usuario que entrou
  socket.emit('loginUser', await Model.getAllMessages());

  // Atualiza para todos os usaurios quem acabou de entrar
  io.emit('users', Helpers.getListUsers());

  // Troca o nome do usuario pela sua escolha
  socket.on('nickname', (nickname) => Helpers.editNickName(socket, nickname, io));

  // Cria uma mensagem em tempo real no chat
  socket.on('message', (data) => Helpers.generetorMessage(data, io));

  // Disconecta um usuario ao fechar a pagina alertando todos usuarios
  socket.on('disconnect', () => Helpers.disconnectUser(socket, io));
});

module.exports = webChat;
