const Musico = require('../models/musico.model');

module.exports.crearMusico = (req, res) => {
    Musico.create(req.body)
    .then( resp => {
        console.log(req.body)
        res.json({
            datos: resp,
            error: false
        })
    }).catch( e => {
        res.json({
            error: true,
            mensaje: 'Ha ocurrido un error'
        })
    })
}

module.exports.getMusico = (req, res) => {
    Musico.find({especialidad: req.params.especialidad})
    .then(resp => {
        console.log(resp);
        res.json({
            datos: resp,
            error: false
        })
    }).catch(e => {
        res.json({
            error: true,
            mensaje: 'Ha ocurrido un error'
        })
    })
}

module.exports.listarMusico = (req, res) => {
    Musico.find()
    .then(resp => {
        res.json({
            datos: resp,
            error: false
        })
    }).catch(e => {
        res.json({
            error: true,
            mensaje: 'Ha ocurrido un error'
        })
    })
} 

module.exports.eliminarMusico = (req, res) => {
    Musico.findByIdAndDelete(req.params.id)
    .then(resp => {
        res.json({
            error: false})
    }).catch(e => {
        res.json({
            error: true,
            mensaje: 'Ha ocurrido un error'
        })
    });
}

module.exports.verMusico = (req, res) => {
    Musico.findById(req.params.id)
    .then(resp => {
        res.json({
            datos: resp,
            error: false
        })
    }).catch(e => {
        res.json({
            error: true,
            mensaje: 'Ha ocurrido un error'
        })
    })
}