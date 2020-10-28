const { response, request } = require("express");
const { v4: uuidv4 } = require("uuid");

const fileUpload = async (req = request, res = response) => {
  const tipo = req.params.tipo;
  const id = req.params.id;
  const tiposValidos = ["hospitales", "medicos", "usuarios"];
  if (!tiposValidos.includes(tipo)) {
    return res.status(400).json({
      ok: false,
      msg: "No es un médico, usuario u hospital (tipo)",
    });
  }
  // Validacion la existencia de un archivo
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: "No hay ningún archivo",
    });
  }
  // Preceamiento de la Imagen
  const file = req.files.imagen;
  const arrayName = file.name.split(".");
  const extensionFile = arrayName[arrayName.length - 1];

  // Validar extension
  const extensionesValidas = ["jpg", "png", "jpeg", "gif"];
  if (!extensionesValidas.includes(extensionFile)) {
    return res.status(400).json({
      ok: false,
      msg: "No es una extensión permitida",
    });
  }
  // Genenar un nombre para el archivo
  const nombreArchivo = `${uuidv4()}.${extensionFile}`;

  // Path para guardar el archivo
  const path = `./uploads/${tipo}/${nombreArchivo}`;

  // Mover la imagen

  file.mv(path, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        ok: false,
        msg: "Error al mover la imagen",
      });
    }
    res.status(200).json({
      ok: true,
      msg: "Archivo subido",
      nombreArchivo,
    });
  });
};
module.exports = {
  fileUpload,
};
