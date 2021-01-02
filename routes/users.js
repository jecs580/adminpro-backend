/*
    Ruta: /api/users
*/
const {Router}  = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT,validarAdmin_ROLE } = require('../middlewares/validar-jwt');

const {getUser, createUser, updateUser, deleteUser} = require('../controllers/users');
const router = Router();

router.get('/',validarJWT,getUser);

router.post('/',[
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('password','El password es obligatoria').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos,
],createUser);

router.put('/:id',[
    validarJWT,
    validarAdmin_ROLE,
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('role', 'El role es obligatorio').not().isEmpty(),
    validarCampos,
],updateUser);


router.delete('/:id',[validarJWT,validarAdmin_ROLE],deleteUser);

module.exports = router;