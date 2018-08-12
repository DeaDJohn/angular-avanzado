var express = require('express');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var mdAutentificacion = require('../middlewares/autentificacion');

// var SEED = require('../config/config').SEED;

var app = express();


var Hospital = require('../models/hospital');

//
// Obtener todos los usarios
//
app.get('/', (req, res, next) => {

    Hospital.find({}, 'nombre email img role')
        .exec(
            (err, hospitales) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando hospitales',
                        errors: err
                    });
                }
                res.status(200).json({
                    ok: true,
                    hospitales: hospitales
                });

            }
        );
});



//
// Actualizar un  hospital
//

app.put('/:id', mdAutentificacion.verificaToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Hospital.findById(id, (err, hospital) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar el hospital',
                errors: err
            });
        }

        if (!hospital) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El hospital con el id ' + id + ' no existe.',
                errors: { message: 'No exite un hospital con ese ID.' }
            });
        }

        hospital.nombre = body.nombre;

        hospital.save((err, hospitalGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar el hospital.',
                    errors: err
                });
            }

            // la password no se guarda en la base de datos
            // en este punto porque esta en la función de callback
            // del save. Tan solo muestra la carita para que no se vea.
            hospitalGuardado.password = ':)';

            res.status(200).json({
                ok: true,
                hospital: hospitalGuardado,
            });

        });

    });
});

//
// Crear un nuevo hospital
//
app.post('/', mdAutentificacion.verificaToken, (req, res) => {

    var body = req.body;

    var hospital = new Hospital({
        nombre: body.nombre,
        img: body.img,
        usuario: req.usuario
    });

    hospital.save((err, hospitalGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error guarado hospital',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            hospital: hospitalGuardado,
            hospitalToken: req.hospital
        });

    });

});

//
// Eliminar un usuario por el id
//

app.delete('/:id', mdAutentificacion.verificaToken, (req, res) => {

    var id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar usuario',
                errors: err
            });
        }

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario con el id ' + id + ' no existe.',
                errors: { message: 'No exite un usuario con ese ID.' }
            });
        }

        res.status(200).json({
            ok: true,
            usuario: usuarioBorrado
        });
    });
});


module.exports = app;