const MusicoController = require('../controllers/musico.controller');
const {autenticar} = require('../config/jwt.config');
const multer = require('multer');
const upload = multer({ dest: 'uploads/'});

module.exports = app => {

    app.post('/api/member/crear',autenticar, MusicoController.crearMusico);

    app.get('/api/member/listar/',autenticar, MusicoController.listarMusico);

    app.delete('/api/member/eliminar/:id', autenticar, MusicoController.eliminarMusico);

    app.get('/api/member/verperfil/:id', MusicoController.verMusico);

    app.get('/api/member/listar/:especialidad', MusicoController.getMusico)

    app.post('/api/photos/upload', upload.single('avatar'), function (req, res, next) {
        console.log(req);
    })
}