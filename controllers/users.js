const {response} = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/users');
const getUser = async (req, res) => {
  const usuarios = await Usuario.find({}, 'name email role google');
  res.status(200).json({
    ok: true,
    usuarios
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
    return res.json({
      ok: true,
      usuario
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok:false,
      msg:'Error inesperado... revisar logs'
    })
  }
  
};

module.exports = {
    getUser,
    createUser
}