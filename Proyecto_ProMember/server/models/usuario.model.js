const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const UsuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "Debe ingresar su nombre"]
    },
    apellido: {
        type: String,
        required: [true, "Debe ingresar su apellido"]
    },
    email: {
        type: String,
        required: [true, "Debe ingresar su mail"]
    },
    password: {
        type: String,
        required: [true, "Debe ingresar contraseña"],
        minlength: [6, "La contraseña debe tener minimo 6 caracteres"]
    },
    musico: {type: Boolean, default: false}
}, {timestamps: true});



    UsuarioSchema.virtual('confirmPassword')
        .get(function(){return(this._confirmPassword)})
        .set(function(value){this._confirmPassword = value});

    UsuarioSchema.pre('validate', function(next) {
        console.log(this.password, this._confirmPassword );
        if (this.password !== this._confirmPassword) {
            this.invalidate('confirmPassword', 'Contraseñas deben coincidir');
        }
        next();
    });

    UsuarioSchema.pre('save', function(next) {
        bcrypt.hash(this.password, 10)
            .then(hash => {
                this.password = hash;
                next();
            });
    });
        

    const Usuario = mongoose.model('Usuario', UsuarioSchema) ;

    module.exports = Usuario;
