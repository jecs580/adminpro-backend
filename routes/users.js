/*
    Ruta: /api/users
*/
const {Router}  = require('express');
const {getUser, createUser} = require('../controllers/users');
const router = Router();

router.get('/',getUser);

router.post('/',createUser);

module.exports = router;