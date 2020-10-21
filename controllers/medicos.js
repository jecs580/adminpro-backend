const { response } = require("express")

const getMedicos=(req,res=response)=>{
    res.json({
        ok:true,
        msg:'get Medicos'
    })
}
const createMedico=(req,res=response)=>{
    res.json({
        ok:true,
        msg:'crear Medico'
    })
}
const updateMedico=(req,res=response)=>{
    res.json({
        ok:true,
        msg:'Actualizar Medico'
    })
}
const deleteMedico=(req,res=response)=>{
    res.json({
        ok:true,
        msg:'Borrar Hospitales'
    })
}

module.exports={
    getMedicos,
    createMedico,
    updateMedico,
    deleteMedico
}