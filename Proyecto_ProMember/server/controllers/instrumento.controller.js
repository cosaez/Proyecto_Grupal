const Instrumento = require('../models/instrumento.model.js');

module.exports.createInstrumento = (req, res) => {
    console.log(req.body)
    Instrumento.create(req.body)
    .then((newInstrumento) => {
        res.json({instrumento: newInstrumento})
    })
    .catch((err) => {
        res.status(400).json({errors: err})
    })
}

module.exports.getAll = (req, res) => {
    Instrumento.find()
    .then(instrumentos => {
        res.json({instrumentos: instrumentos})
    })
    .catch(err => res.json({ message: "Something went wrong", error: err}));
}

module.exports.deleteInstrumento = (req, res) => {
    Instrumento.findOneAndDelete({'_id': req.params.id})
    .then(instrumento => {
        res.json({instrumento: instrumento})
    })
    .catch((err) => {
        res.json({msg: "Failed to delete"})
    })
}