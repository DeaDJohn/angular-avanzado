var express = require('express');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var mdAutentificacion = require('../middlewares/autentificacion');

// var SEED = require('../config/config').SEED;

var app = express();


var Medico = require('../models/medico');

//
// Obtener todos los usarios
//
app.get('/', (req, res, next) => {

    Medico.find({}, 'nombre hospital usuario')
        .exec(
            (err, medicos) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando médicos',
                        errors: err
                    });
                }
                res.status(200).json({
                    ok: true,
                    medicos: medicos
                });

            }
        );
});



//
// Actualizar un  medico
//

app.put('/:id', mdAutentificacion.verificaToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Medico.findById(id, (err, medico) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar el medico',
                errors: err
            });
        }

        if (!medico) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El medico con el id ' + id + ' no existe.',
                errors: { message: 'No exite un medico con ese ID.' }
            });
        }

        medico.nombre = body.nombre;
        medico.hospital = body.hospital;

        medico.save((err, medicoGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar el medico.',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                medico: medicoGuardado,
            });

        });

    });
});

//============================
// Crear un nuevo medico
//============================

app.post('/', mdAutentificacion.verificaToken, (req, res) => {

    var body = req.body;
    var medico = new Medico({
        nombre: body.nombre,
        img: body.img,
        usuario: req.usuario,
        hospital: hospital.id
    });

    medico.save((err, medicoGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error guarado medico',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            medico: medicoGuardado,
        });


    });

});

//
// Eliminar un medico por el id
//

app.delete('/:id', mdAutentificacion.verificaToken, (req, res) => {

    var id = req.params.id;

    Medico.findByIdAndRemove(id, (err, medicoBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar medico',
                errors: err
            });
        }

        if (!medicoBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El medico con el id ' + id + ' no existe.',
                errors: { message: 'No exite un medico con ese ID.' }
            });
        }

        res.status(200).json({
            ok: true,
            medico: medicoBorrado
        });
    });
});


module.exports = app;