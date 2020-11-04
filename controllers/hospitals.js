const { response, request } = require("express")
const Hospital =  require('../models/hospital');
const getHospitales= async(req,res=response)=>{
    const hospitales = await Hospital.find()
    .populate('usuario','name img'); // Colocamos el nombre del campo q colocamos en el modelo de hospitales

    res.json({
        ok:true,
        hospitales
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
const updateHospitales= async(req,res=response)=>{
    const id = req.params.id;
    const uid = req.uid;
    try {

        const hospitalDB = await Hospital.findById(id);
        if (!hospitalDB) {
            return res.status(404).json({
                ok:false,
                msg:'Hospital no encontrado por id'
            });
        }
        const cambiosHospital = {
            ...req.body,
            usuario:uid
        }
        const hopitalUpdated = await Hospital.findByIdAndUpdate(id,cambiosHospital, {new:true})

        return res.json({
            ok:true,
            msg:'hopital actualizado exitosamente',
            hospital:hopitalUpdated
        })
    } catch (error) {
       return res.status(500).json({
            ok:false,
            msg:'Error inesperado'
        });
    }
}
const deleteHospitales= async(req=request,res=response)=>{
    const id = req.params.id;
    try {
        const hospitalDB = await Hospital.findById(id);
        if (!hospitalDB) {
            return res.status(404).json({
                ok:false,
                msg:'Hospital no encontrado por id'
            });
        }
        await Hospital.findByIdAndDelete(id);

        return res.json({
            ok:true,
            msg:'hopital eliminado exitosamente',
        })
    } catch (error) {
       return res.status(500).json({
            ok:false,
            msg:'Error inesperado'
        });
    }
}

module.exports={
    getHospitales,
    createHospital,
    updateHospitales,
    deleteHospitales
}