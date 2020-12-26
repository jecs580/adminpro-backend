/* 
    Medicos
    Ruta: '/api/medicos'
*/
const {Router}  = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const{ getMedicos,createMedico,updateMedico,deleteMedico,getMedicoById } = require('../controllers/medicos');

const router = Router();

router.get('/',validarJWT,getMedicos);

router.post('/',[
    validarJWT,
    check('name','El nombre del médico es necesario').not().isEmpty(),
    check('hospital','El id del hospital es necesario').not().isEmpty(),
    check('hospital','El id del hospital debe de ser válido').isMongoId(),
    validarCampos
],createMedico);

router.put('/:id',[
validarJWT,
check('name','El nombre del médico es necesario').not().isEmpty(),
check('hospital','El id del hospital es necesario').not().isEmpty(),
check('hospital','El id del hospital debe de ser válido').isMongoId(),
validarCampos
],updateMedico);


router.delete('/:id',validarJWT,deleteMedico);
router.get('/:id',validarJWT,getMedicoById);

module.exports = router;