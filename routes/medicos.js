/* 
    Medicos
    Ruta: '/api/medicos'
*/
const {Router}  = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const{ getMedicos,createMedico,updateMedico,deleteMedico } = require('../controllers/medicos');

const router = Router();

router.get('/',getMedicos);

router.post('/',[
    validarJWT,
    check('name','El nombre del médico es necesario').not().isEmpty(),
    check('hospital','El id del hospital es necesario').not().isEmpty(),
    validarCampos
],createMedico);

router.put('/:id',[

],updateMedico);


router.delete('/:id',deleteMedico);

module.exports = router;