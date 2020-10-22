/* 
    Hospitales
    Ruta: '/api/hospitals'
*/
const {Router}  = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const{ getHospitales,createHospital, updateHospitales,deleteHospitales } = require('../controllers/hospitals');

const router = Router();

router.get('/',getHospitales);

router.post('/',[
    validarJWT,
    check('name','El nombre del hospital es necesario').not().isEmpty(),
    validarCampos
],createHospital);

router.put('/:id',[

],updateHospitales);


router.delete('/:id',deleteHospitales);

module.exports = router;