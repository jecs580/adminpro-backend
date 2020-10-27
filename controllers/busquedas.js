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
const getDocumentosColeccion = async(req=request, res=response)=>{
    const coleccion =  req.params['coleccion'];
    const busqueda = req.params['busqueda'];
    const regex = new RegExp(busqueda,'i');
    let data=[];
    switch (coleccion) {
        case 'medicos':
            data = await Medico.find({name:regex})
            .populate('usuario','name img')
            .populate('hospital','name img');
            break;
        case 'hospitales':
            data = await Hospital.find({name:regex})
            .populate('usuario','name img');
            break;
        case 'usuarios':
            data = await Usuario.find({name:regex});
        break;
        default:
            return res.status(400).json({
                ok:false,
                msg:'La colección tiene que ser usurios|medicos|hospitales'
            });
        }
        res.json({
            ok:true,
            resultados:data
        });
}
module.exports={
    getTodo,
    getDocumentosColeccion
}