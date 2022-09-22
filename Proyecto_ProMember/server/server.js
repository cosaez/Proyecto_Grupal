const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const upload = multer({ dest: 'uploads/'});


/* app.post('/profile', upload.single('avatar'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
}); */



app.use(cookieParser()); 
app.use(cors({credentials: true, origin: 'http://localhost:3000'})); 
app.use(cors());
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );

require('./config/mongoose.config');

require('./routes/usuario.route')(app);
require('./routes/musico.route')(app);

app.listen(port, () => console.log('Servidor en puerto ' + port));