const mongoose = require('mongoose');

const InstrumentoSchema = new mongoose.Schema({
    announcement: {
      type: String,
      required: [true, "Anuncio es requerido"],
      minlength: [5, "Anuncio debe ser al menos 5 caracteres"]
    },
    name: {
      type: String,
      required: [true, "Name is required."],
      minlength: [2, "Nombre debe ser al menos 2 caracteres"]
    },
    email: {
      type: String,
      required: [true, "email de contacto es requerido"],
    }
  }, {timestamps: true});

const Instrumento = mongoose.model("Instrumento", InstrumentoSchema)

module.exports = Instrumento;