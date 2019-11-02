var jwt = require('jsonwebtoken');

var SEED = require('../config/config').SEED;



//
// Verificar Token.
//

exports.verificaToken = function(req, res, next) {
    var token = req.query.token;

    jwt.verify(token, SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Token incorrecto',
                errors: err
            });
        }

        req.usuario = decoded.usuario;
        // sin el next no sabe la funcion que debe continuar.
        next();

        // res.status(201).json({
        //     ok: false,
        //     decoded: decoded
        // });
    });
}

//
// Verificar Admin.
//

exports.verificaAdmin = function(req, res, next) {

    var usuario = req.usuario;

    if( usuario.role === 'ADMIN_ROLE'){
        next();
        return;
    }else{
        return res.status(401).json({
            ok: false,
            mensaje: 'Token incorrecto - No es administrador',
            errors: {message: 'No es administrador, no puede hacer esto.'}
        });
    }

}

//
// Verificar Admin o mismo usuario
//

exports.verificaAdmin_o_MismoUsuario = function(req, res, next) {

    var usuario = req.usuario;
    var id = req.params.id;

    if( usuario.role === 'ADMIN_ROLE' || usuario.id === id){
        next();
        return;
    }else{
        return res.status(401).json({
            ok: false,
            mensaje: 'Token incorrecto - No es administrador ni es el mismo usuario',
            errors: {message: 'No es administrador, no puede hacer esto.'}
        });
    }

}