const { response } = require("express")

const getHospitales=(req,res=response)=>{
    res.json({
        ok:true,
        msg:'get Hospitales'
    })
}
const createHospital=(req,res=response)=>{
    res.json({
        ok:true,
        msg:'crear Hospitales'
    })
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