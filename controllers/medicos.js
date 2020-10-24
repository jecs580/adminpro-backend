const { response } = require("express")
const Medico = require('../models/medicos');
const getMedicos= async(req,res=response)=>{
    const medicos = await Medico.find()
    .populate('usuario', 'name img')
    .populate('hospital', 'name img');
    res.json({
        ok:true,
        medicos
    })
}
const createMedico= async(req,res=response)=>{
    const userid = req.uid;
    const medico = new Medico({...req.body,usuario:userid});

    try {
        const medicoDB = await medico.save();
        return res.json({
            ok:true,
            medico:medicoDB
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok:false,
            msg:'Error inesperado'
        })
    }
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