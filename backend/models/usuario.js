var mongoose = require('mongoose');


var Schema = mongoose.Schema;

// Crear un modelo para crear usuarios en la base de datos.
var usuarioSchema = new Schema({

    nombre: { type: String, require: [true, 'El nombre es necesario'] },
    email: { type: String, unique: true, require: [true, 'El email es necesario'] },
    password: { type: String, require: [true, 'El constraseña es necesario'] },
    img: { type: String, require: false },
    role: { type: String, require: false, default: 'USER_ROLE' },

});


module.exports = mongoose.model('Usuario', usuarioSchema);