const {response, request} = require('express');
const Usuario = require('../models/users');
const jwt =  require('jsonwebtoken');
const validarJWT= (req,res=response,next)=>{
    const token= req.header('x-token');
    if(!token){
        return res.status(401).json({
            ok:false,
            msg:'No hay token en la peticion'
        })
    }
    try {
        const {uid} = jwt.verify(token,process.env.JWT_SECRET);
        req.uid=uid;
        next();
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg:'Token no válido'
        })
    }
}

const validarAdmin_ROLE= async(req=request, res=response,next)=>{
    const uid = req.uid;
    try {
        const usuarioDB = await Usuario.findById(uid);
        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:'Usuario no existe'
            })
        }
        if(usuarioDB.role !=='ADMIN_ROLE'){
            return res.status(403).json({
                ok:false,
                msg:'No tiene privilegios para hacer eso'
            }) 
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado... revisar logs'
        })
    }
}
module.exports = {
    validarJWT,
    validarAdmin_ROLE
}