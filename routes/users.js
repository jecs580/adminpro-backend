/*
    Ruta: /api/users
*/
const {Router}  = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const {getUser, createUser} = require('../controllers/users');
const router = Router();

router.get('/',getUser);

router.post('/',[
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('password','El password es obligatoria').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos,
],createUser);

module.exports = router;