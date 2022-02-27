const server = require('./index');

const { PORT } = process.env;

server.listen(PORT, () => console.log(`RODANDO NA PORTA ${PORT}`));
