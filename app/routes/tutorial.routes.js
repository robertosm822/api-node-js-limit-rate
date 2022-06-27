const jwt = require('jsonwebtoken');
require('dotenv').config();
const JwtAuth = require('../auth/jwt-authorization.js');

module.exports = app => {
    const tutorials = require('../controllers/tutorial.controller.js');
    const rota_auth = require('express').Router();
    const rotas = require('express').Router();

    //atutenticacao rota
    rota_auth.post('/login', (req, res, next) => {
        //esse teste abaixo deve ser feito no seu banco de dados
        if (req.body.user === process.env.JWT_USER && req.body.password === process.env.JWT_PASS) {
            //auth ok
            const id = 1; //esse id viria do banco de dados
            //caso defina um tempo de expiracao ativar a flag expiresIn
            const token = jwt.sign({ id }, process.env.SECRET, {
                /* expiresIn: 3000 // expires in 5min  */
            });
            return res.json({ auth: true, token: token });
        }

        res.status(500).json({ message: 'Login inválido!' });
    });

    //mostrar todas os tutoriais
    rotas.get('/', tutorials.findAll);
    //adicionar rota ao nosso app
    app.use('/api', JwtAuth.verifyJWT, rota_auth);
    //adicionar ao app as rotas criadas personalizadas
    app.use('/api/tutorials', rotas);
};