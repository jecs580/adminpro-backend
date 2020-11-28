const {response, request} = require('express');
const bcrypt = require('bcryptjs');
const {generarJWT} = require('../helpers/jwt');
const Usuario = require('../models/users');
const getUser = async (req=request, res) => {
  const from = Number(req.query['from']) || 0;

  const [usuarios,total] = await Promise.all(
    [
      Usuario.find({}, 'name email role google img')
      .skip(from) // Especifica dede que punto empezar
      .limit(5), // Liminte de objetos devueltos
      Usuario.countDocuments()
    ]
  )
  res.status(200).json({
    ok: true,
    usuarios,
    total
  });
};
const createUser = async (req, res=response) => {
  const { email, password } = req.body;

  
  try {
    const ExisteEmail = await Usuario.findOne({email});
    if (ExisteEmail) {
      return res.status(400).json({
        ok:false,
        msg:'El correo ya esta en uso'
      })
    }
    const usuario = new Usuario(req.body);

    // Encripta password
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password,salt);

    await usuario.save();
    const token = await generarJWT(usuario.id);
    return res.json({
      ok: true,
      usuario,
      token
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok:false,
      msg:'Error inesperado... revisar logs'
    })
  }
};
const updateUser = async(req,res=response)=>{
  const uid = req.params['id'];
  try {
    const usuariodb = await Usuario.findById(uid);
    if(!usuariodb){
      return res.status(404).json({
        ok:false,
        msg:'No existe un usuario por ese id'
      });
    }
    const { password, google,email,...campos} = req.body;
    if(usuariodb.email !== email){
      const existEmail = await Usuario.findOne({email});
      if(existEmail){
        return res.status(400).json({
          ok:false,
          msg:'Ya existe un usuario con ese email'
        });
      }
    }
    if (!usuariodb.google) {
      campos.email = email;
    }else if(usuariodb.email !==email){
      return res.status(400).json({
        ok:false,
        msg:'Usuarios de google no pueden cambiar su correo'
      });
    }
    // delete campos.password; // Borramos el password del objeto
    // delete campos.google;

    const updatedUser = await Usuario.findByIdAndUpdate(uid,campos,{ new:true });

    res.json({
      ok:true,
      usuario:updatedUser
    })  
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok:false,
      msg:'Error inesperado'
    });
  }
}
const deleteUser= async(req,res=response)=>{
  const uid =  req.params['id'];
  try {
    const usuariodb = await Usuario.findById(uid);
    if(!usuariodb){
      return res.status(404).json({
        ok:false,
        msg:'No existe un usuario por ese id'
      });
    }
    const user = await Usuario.findByIdAndDelete(uid);
    return res.status(200).json({
      ok:true,
      msg:'Usuario eliminado exitosamente',
      user
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok:false,
      msg:'Error inesperado'
    });
  }
}

module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser
}