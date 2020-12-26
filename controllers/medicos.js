const { response, request } = require("express")
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
const getMedicoById= async(req,res=response)=>{
    const id= req.params['id'];
    try {
        const medico = await Medico.findById(id)
        .populate('usuario', 'name img')
        .populate('hospital', 'name img');
        res.json({
            ok:true,
            medico
        })
    } catch (error) {
        console.log(error);
        res.json({
            ok:false,
            msg:'Error inesperado'
        })
    }
 
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
const updateMedico = async(req=request,res=response)=>{
    const id = req.params['id'];
    const uid = req.uid;
    try {

        const medicoDB = await Medico.findById(id);
        if (!medicoDB) {
            return res.status(404).json({
                ok:false,
                msg:'Medico no encontrado por id'
            });
        }
        const cambiosMedico = {
            ...req.body,
            usuario:uid
        }
        const medicoUpdated = await Medico.findByIdAndUpdate(id,cambiosMedico, {new:true})

        return res.json({
            ok:true,
            msg:'medico actualizado exitosamente',
            medico:medicoUpdated
        })
    } catch (error) {
       return res.status(500).json({
            ok:false,
            msg:'Error inesperado'
        });
    }
}
const deleteMedico= async(req,res=response)=>{
    const id = req.params['id'];
    try {

        const medicoDB = await Medico.findById(id);
        if (!medicoDB) {
            return res.status(404).json({
                ok:false,
                msg:'Medico no encontrado por id'
            });
        }
        await Medico.findByIdAndDelete(id);
        // const medicoUpdated = await Medico.findByIdAndUpdate(id,cambiosMedico, {new:true})

        return res.json({
            ok:true,
            msg:'medico eliminado exitosamente'
        })
    } catch (error) {
       return res.status(500).json({
            ok:false,
            msg:'Error inesperado'
        });
    }
}

module.exports={
    getMedicos,
    createMedico,
    updateMedico,
    deleteMedico,
    getMedicoById
}