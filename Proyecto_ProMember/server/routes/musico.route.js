const MusicoController = require('../controllers/musico.controller');
const {autenticar} = require('../config/jwt.config');



module.exports = (app, upload) => {

    app.post('/api/member/crear',autenticar/* , upload.single("avatar") */, MusicoController.crearMusico);

    app.get('/api/member/listar/',autenticar, MusicoController.listarMusico);

    app.delete('/api/member/eliminar/:id', autenticar, MusicoController.eliminarMusico);

    app.get('/api/member/verperfil/:id', MusicoController.verMusico);

    app.get('/api/member/listar/:especialidad', MusicoController.getMusico);

    app.put('/api/member/edit/:id',  MusicoController.editarMusico);

    app.get('/api/member/:id/avatar', autenticar, MusicoController.avatar)

    app.post('/api/member/upload', autenticar, upload.single("archivo"), MusicoController.uploadFile );

    
}