const mongoose = require('mongoose');

const MusicoSchema = mongoose.Schema ({

    nombre: {
        type: String,
        require: [true, 'Nombre completo es requerido']
    },
    email: {
        type: String,
        require:[true, 'Email es requerido']
    },
    img: {
        type: String   
    },
    numero: {
        type: Number,
        require:[true, 'Numero telefonico es requerido']
    },
    rol: {
        type: String,
        require: [true,'Rol es requerido']
    },
    descripcion: {
        type: String,
        require:[true, 'Se requiere una descripcion']
    },
    especialidad: {
        type: String,
        require:[true]
    },
    status: {
        type: String,
        require:[true],
        default:''
    }
}, {timestamps: true})


const Musico = mongoose.model('Pro_Member', MusicoSchema);

module.exports = Musico;