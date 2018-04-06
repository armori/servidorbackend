var mongoose = require('mongoose');
var unique = require('mongoose-unique-validator');

var proveedorSchema = new mongoose.Schema({
    nombre: String,
    // cif: String, lo comentamos para pasarlo a unique-validator
    cif: { type: String, unique: true},
    domicilio: String,
    cp: Number,
    localidad: String,
    provincia: String,
    telefono: String,
    email: String,
    contacto: String
});

proveedorSchema.plugin(unique, { message: "El cif introducido ya existe" });

module.exports = mongoose.model('Proveedor', proveedorSchema);