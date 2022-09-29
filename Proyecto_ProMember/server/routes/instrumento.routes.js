const InstrumentoController = require('../controllers/instrumento.controller');

module.exports = app => {
    app.post("/api/instrumento/create", InstrumentoController.createInstrumento)
    app.get("/api/instrumentos", InstrumentoController.getAll)
    app.delete("/api/instrumento/:id", InstrumentoController.deleteInstrumento)
}