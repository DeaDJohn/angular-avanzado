var express = require('express');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var SEED = require('../config/config').SEED;

var app = express();

var Usuario = require('../models/usuario');

//Google
var CLIENT_ID = require('../config/config').CLIENT_ID;
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);


//============================
// Autetincacion Google
//============================
async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });

    const payload = ticket.getPayload();
    // const userid = payload['sub'];
    // If request specified a G Suite domain:
    //const domain = payload['hd'];

    return {
        nombre: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true,
        // payload: payload
    }
}

app.post('/google', async(req, res) => {

    var token = req.body.token;

    var userGoogle = await verify(token)
        .catch(e => {
            return res.status(400).json({
                ok: false,
                mensaje: 'Token no válido',
            });
        });

    Usuario.findOne({ email: userGoogle.email }, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }

        if (usuarioDB) {

            if (usuarioDB.google === false) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Debe usar la autenticacion normal',
                });
            } else {
                var token = jwt.sign({ usuario: usuarioDB }, SEED, { expiresIn: 14400 }); // 4 horas

                res.status(201).json({
                    ok: true,
                    usuario: usuarioDB,
                    token: token,
                    id: usuarioDB.id,
                    menu: obtenerMenu(usuarioDB.role)
                });

            }
        } else {
            // El usuario no exite hay que crearlo
            var usuario = new Usuario();

            usuario.nombre = userGoogle.nombre;
            usuario.email = userGoogle.email;
            usuario.img = userGoogle.img;
            usuario.google = true;
            usuario.password = ':)';

            usuario.save((err, usuarioDB) => {
                var token = jwt.sign({ usuario: usuarioDB }, SEED, { expiresIn: 14400 }); // 4 horas

                res.status(200).json({
                    ok: true,
                    usuario: usuarioDB,
                    token: token,
                    id: usuarioDB.id,
                    menu: obtenerMenu(usuarioDB.role)
                });
            })
        }

    });

    // return res.status(500).json({
    //     ok: true,
    //     mensaje: 'OK',
    //     googleUser: userGoogle
    // })

})

//============================
// Autenticacion normal
//============================


app.post('/', (req, res) => {
    var body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - email',
                errors: err
            });
        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - password',
                errors: err
            });
        }


        // Crear un token!!!
        usuarioDB.password = ':)';
        var token = jwt.sign({ usuario: usuarioDB }, SEED, { expiresIn: 14400 }); // 4 horas

        res.status(201).json({
            ok: true,
            usuario: usuarioDB,
            token: token,
            id: usuarioDB.id,
            menu: obtenerMenu(usuarioDB.role)
        });
    });

});


function obtenerMenu ( ROLE ) {

    var menu = [
		{
			titulo: 'Principal',
			icono: 'mdi mdi-gauge',
			submenu: [
				{ titulo: 'Dashboard', url: '/dashboard' },
				{ titulo: 'ProgressBar', url: '/progress' },
				{ titulo: 'Gráficas', url: '/graficas1' },
				{ titulo: 'RxJS', url: '/rxjs' },
				{ titulo: 'Promesas', url: '/promesas' }
			]
		},
		{
			titulo: 'Mantenimientos',
			icono: 'mdi mdi-folder-lock-open',
			submenu: [
				// { titulo: 'Usuarios', url: '/usuarios'},
				{ titulo: 'Hospitales', url: '/hospitales'},
				{ titulo: 'Médicos', url: '/medicos'}
			]
		}
    ];
    
    if( ROLE === 'ADMIN_ROLE'){
        menu[1].submenu.unshift({ titulo: 'Usuarios', url: '/usuarios'})
    }

    return menu;
}



module.exports = app;