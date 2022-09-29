const Musico = require('../models/musico.model');
const Usuario = require('../models/usuario.model');
const  fs  = require('fs');
const { secretKey } = require('../config/jwt.config');
const  jwt  = require('jsonwebtoken');

module.exports.crearMusico = (req, res, next) => {
    /* console.log('req.body',req.body);
    console.log('req.file',req.file);
    const path = global._basedir + '/' + req.file.path;
    req.body.avatar = path;
    console.log('avatar:', avatar); */
    Musico.create(req.body)
    .then( resp => {
        jwt.verify(req.cookies.usertoken, secretKey, (err, payload) => {
            if (err) { 
            res.status(401).json({verified: false});
            } else {
                Usuario.findByIdAndUpdate(payload._id, {
                    musico: true
                }).then( resp => {
                    res.json({
                        error: false
                    })
                })
            }
        });
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

module.exports.editarMusico = (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
    Musico.findByIdAndUpdate( req.params.id, req.body, { runValidators: true })
    .then(resp => {
        res.json({
            datos: resp,
            error: false
        })
    }).catch (e => {
        console.log(e)
        res.json({
            error: true,
            mensaje: 'Ha ocurrido un error al actualizar'
        })
    })
}

module.exports.avatar = (req, res) => {
    Musico.findById(req.params.id)
    .then(resp => {
        if(resp?.avatar) {
            res.download(resp.avatar);
        }
    })
}

module.exports.uploadFile = (req, res, next) => {
    console.log(req.file);

    const path = global._basedir + '/' + req.file.path;
    res.download(path, req.file.path);
    fs.rm(path, (err) => console.log(err));
}