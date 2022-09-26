const multer = require('multer');
const { storage } = require('debug/src/browser');
const Imagen = require('../models/imagen.model');


module.exports.uploadFile = (req, res, next) => {
    Imagen.create(req.body)
    .then(resp =>{
        res.json({
            data: 'SEnd datos'

        })
    })
}

const upload = multer({storage: storage})