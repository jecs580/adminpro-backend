const Usuario = require('../models/users');
const getUser = async (req, res) => {
  const usuarios = await Usuario.find({}, 'name email role google');
  res.status(200).json({
    ok: true,
    usuarios
  });
};
const createUser = async (req, res) => {
  const { email, password,name } = req.body;
  const usuario = new Usuario(req.body);
  await usuario.save();
  res.json({
    ok: true,
    usuario
  });
};

module.exports = {
    getUser,
    createUser
}