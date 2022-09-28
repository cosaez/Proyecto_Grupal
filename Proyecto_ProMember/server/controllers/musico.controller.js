const Musico = require('../models/musico.model');
const  fs  = require('fs');

module.exports.crearMusico = (req, res) => {
    Musico.create(req.body)
    .then( resp => {
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
    Musico.findByIdAndUpdate( req.params.id, req.body/* { runValidators: true } */)
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

module.exports.uploadFile = (req, res, next) => {
    console.log(req.file);

    const path = global._basedir + '/' + req.file.path;
    res.download(path, req.file.path);
    /* fs.readFile(path, 'utf-8', (err, data) => {
        if(err) {
            res.json({error: true, mensaje: 'Error al leer archivo'})
        } else {
            res.writeHead(200, {
                'Content-Type': req.file.mimetype,
                'Content-Disposition': 'attachment;filename=' + req.file.originalname,
                'Content-Length': data.length
            });
            res.end(Buffer.from(data, 'binary'))
        }
    }) */
    res.json({error:false})
}