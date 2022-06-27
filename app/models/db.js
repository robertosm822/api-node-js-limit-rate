const mysql = require('mysql');
require('dotenv').config();
class ConnectionMysql {
    constructor() {
        this.conectar();
    }
    static conectar() {
        const connection = mysql.createConnection({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DB
        });

        //tratamento de erros na conexao
        connection.connect(error => {
            if (error) throw error;
            console.log("Conectado ao banco Corretamente");
        });

        return connection;
    }
}

const connection = ConnectionMysql.conectar();
module.exports = connection;