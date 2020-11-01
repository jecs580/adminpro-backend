const {response, request} = require('express');
const {generarJWT} = require('../helpers/jwt');
const Usuario = require('../models/users');
const bcrypt = require('bcryptjs');
const {googleVerify} = require('../helpers/google-verify');
const login= async(req,res=response)=>{
    const {email, password} = req.body;
    try {
        const userDB= await Usuario.findOne({email});
        if (!userDB) {
            return res.status(404).json({
                ok:false,
                msg:'email no encontrado'
            });
        }

        const validPassword=bcrypt.compareSync(password,userDB.password);
        if(!validPassword){
            return res.status(404).json({
                ok:false,
                msg:'password no válido'
            }); 
        }

        const token = await generarJWT(userDB.id);
        res.status(200).json({
            ok:true,
            msg:'Login',
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
        ok:false,
        msg:'Error inesperado'
    });
    }
}

const googleSignIn = async(req=request,res=response)=> {
    const googleToken= req.body['token'];
    try {
        const {name, email, picture} = await googleVerify(googleToken);
        res.json({
            ok:true,
            msg:'Google Signin',
            name, email, picture
        })
    } catch (error) {
        res.status(401).json({
            ok:false,
            msg:'Token no es correcto',
        });
    }
}

module.exports= {
    login,
    googleSignIn
}