const Tutorial = require('../models/tutorial.model.js');

class TutorialController {
    constructor(req, res) {
        this.findAll(req, res);
    }
    static findAll(req, res) {
        const title = req.query.title;
        Tutorial.getAll(title, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Ocorreu um erro"
                });
            } else {
                res.send(data);
            }
        });
    }
}

module.exports = TutorialController;