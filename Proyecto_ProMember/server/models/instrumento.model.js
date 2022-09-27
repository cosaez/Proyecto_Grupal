const mongoose = require('mongoose');

const InstrumentoSchema = new mongoose.Schema({
    announcement: {
      type: String,
      required: [true, "Announcement is required."],
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    email: {
      type: String,
      required: [true, "Contact information is required."],
    }
  }, {timestamps: true});

const Instrumento = mongoose.model("Instrumento", InstrumentoSchema)

module.exports = Instrumento;