const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/proyecto', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Conectado a la BD'))
.catch(error => console.error('Ocurrio un error con la BD', error));