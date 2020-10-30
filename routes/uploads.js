/*
    Ruta: api/upload/
*/
const {Router}  = require('express');
const expressfileUpload = require('express-fileupload');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const {fileUpload, retornaImage} = require('../controllers/uploads');
const router = Router();
router.use(expressfileUpload());
router.put('/:tipo/:id',validarJWT, fileUpload);
router.get('/:tipo/:foto', retornaImage);


module.exports = router;