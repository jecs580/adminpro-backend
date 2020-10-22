const { response } = require("express")
const Hospital =  require('../models/hospital');
const getHospitales=(req,res=response)=>{
    res.json({
        ok:true,
        msg:'get Hospitales'
    })
}
const createHospital=  async(req,res=response)=>{
    const uid = req.uid;
    const hospital = new Hospital({...req.body,usuario:uid});

    try {
        const hospitalDB = await hospital.save();
        return res.json({
            ok:true,
            hospital:hospitalDB
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok:false,
            msg:'Error inesperado'
        })
    }
}
const updateHospitales=(req,res=response)=>{
    res.json({
        ok:true,
        msg:'Actualizar Hospitales'
    })
}
const deleteHospitales=(req,res=response)=>{
    res.json({
        ok:true,
        msg:'Borrar Hospitales'
    })
}

module.exports={
    getHospitales,
    createHospital,
    updateHospitales,
    deleteHospitales
}