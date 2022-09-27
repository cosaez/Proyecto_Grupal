const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/'});
const app = express();
const port = 8000;
const cors = require('cors');
const cookieParser = require('cookie-parser');

global._basedir = __dirname;

app.use(cookieParser()); 
app.use(cors({credentials: true, origin: 'http://localhost:3000'})); 
app.use(cors());
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );

require('./config/mongoose.config');

require('./routes/usuario.route')(app);
require('./routes/musico.route')(app, upload);

app.listen(port, () => console.log('Servidor en puerto ' + port));