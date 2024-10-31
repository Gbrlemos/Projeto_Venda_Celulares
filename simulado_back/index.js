const express = require('express');
const cors = require('cors');

const app = express();
require('dotenv').config();

//Middleware
app.use(cors());
app.use(express.json());

//Importando as rotas
const celularesRoutes = require('./routes/celulares');
const alocacaoRoutes = require('./routes/alocacao');

//Usando as rotas
app.use('/celulares', celularesRoutes);
app.use('/alocacao', alocacaoRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});