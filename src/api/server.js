const server = require('./index');

const { PORT_BACK } = process.env;

server.listen(PORT_BACK, () => console.log(`RODANDO NA PORTA ${PORT_BACK}`));
