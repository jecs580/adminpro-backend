const {response,request} = require('express');
const Usuario = require('../models/users');
const Hospital = require('../models/hospital');
const Medico = require('../models/medicos');
const getTodo = async(req=request, res=response)=>{
    const busqueda = req.params['busqueda'];
    const regex = new RegExp(busqueda,'i');
    try {
        const [usuarios, hospitales, medicos] = await Promise.all([
            Usuario.find({name:regex}),
            Hospital.find({name:regex}),
            Medico.find({name:regex})
        ]);
        res.status(200).json({
            ok:true,
            usuarios,
            hospitales,
            medicos
        })
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Error inesperado'
        })
    }
}

module.exports={
    getTodo
}