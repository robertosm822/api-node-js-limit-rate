const sql = require('./db.js');
class Tutorial {
    //construtor
    constructor(tutorial = {}) {
            this.title = tutorial.title;
            this.description = tutorial.description;
            this.published = tutorial.published;
        }
        //metodo que lista todos os registros da tabela
    static getAll(title, result) {
        const query = "SELECT * FROM tutorials;";
        if (title) {
            query += ` WHERE title LIKE '%${title}%'`;
        }
        sql.query(query, (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(null, err);
                return;
            }
            console.log("Tutoriais: ", res);
            result(null, res);
        });

    }
}

module.exports = Tutorial;