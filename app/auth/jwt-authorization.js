const jwt = require('jsonwebtoken');
class JwtAuth {
    constructor() {

    }
    static verifyJWT(req, res, next) {
        const token = req.headers['x-access-token'];
        if (!token) return res.status(401).json({ auth: false, message: 'Nenhum token fornecido.' });

        jwt.verify(token, process.env.SECRET, function(err, decoded) {
            if (err) return res.status(500).json({ auth: false, message: 'Falha ao autenticar o token.' });

            // se tudo estiver ok, salva no request para uso posterior
            req.userId = decoded.id;
            next();
        });
    }
}

module.exports = JwtAuth;