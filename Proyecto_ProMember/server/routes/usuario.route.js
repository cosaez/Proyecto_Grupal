const UsuarioController = require('../controllers/usuario.controller');

module.exports = app => {

    app.post('/api/crearNewUsuario', UsuarioController.registrar);

    app.post('/api/loginUsuario', UsuarioController.login);

}