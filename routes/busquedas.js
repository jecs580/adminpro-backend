/*
    Ruta: api/todo/:busqueda
*//*
    Ruta: /api/users
*/
const {Router}  = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const {getTodo} = require('../controllers/busquedas');
const router = Router();

router.get('/:busqueda',validarJWT, getTodo);

// router.post('/',[
//     check('name','El nombre es obligatorio').not().isEmpty(),
//     check('password','El password es obligatoria').not().isEmpty(),
//     check('email', 'El email es obligatorio').isEmail(),
//     validarCampos,
// ],createUser);

// router.put('/:id',[
//     validarJWT,
//     check('name','El nombre es obligatorio').not().isEmpty(),
//     check('email', 'El email es obligatorio').isEmail(),
//     check('role', 'El role es obligatorio').not().isEmpty(),
//     validarCampos,
// ],updateUser);


// router.delete('/:id',validarJWT,deleteUser);

module.exports = router;