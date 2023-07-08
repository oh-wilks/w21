const User = require("../models/user");
const bcrypt = require("bcrypt");
const { generarJWT } = require("../helpers/jwt.helper");

// registro de usuario
const registrarUsuario = async (req, res) => {
  try {
    const { user_name, password } = req.body;

    const user = await User.findOne({ user_name: user_name });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: `User ${user_name} already exists`,
        data: {},
      });
    }

    const salt = bcrypt.genSaltSync(10);

    const nuevo_usuario = {
      user_name,
      password: bcrypt.hashSync(password, salt),
    };

    const new_user = await User(nuevo_usuario).save();

    const token = await generarJWT(new_user.id);

    return res.json({
      ok: true,
      msg: "Usuario registrado",
      data: new_user,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error en el servidor",
      data: {},
    });
  }
};

// Inicio de Sesion una vez registrado
const iniciarSesion = async (req, res) => {
  const { user_name, password } = req.body;

  const user = await User.findOne({ user_name: user_name });

  if (!user) {
    return res.status(400).json({
      ok: false,
      msg: "Usuario o password incorrectos",
      data: {},
    });
  }

  const validPassword = bcrypt.compareSync(password, user.password);

  if (!validPassword) {
    return res.status(400).json({
      ok: false,
      msg: "Usuario o password incorrectos",
      data: {},
    });
  }

  const token = await generarJWT(user.id);

  return res.json({
    ok: true,
    msg: "Acceso correcto",
    data: user,
    token,
  });
};
// renew Token
const renewToken = async (req, res) => {
  try {
    const { user } = req;

    const token = await generarJWT(user.id);

    return res.json({
      ok: true,
      msg: "New Token Generated",
      data: user,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Internal Server Error",
      data: {},
    });
  }
};

module.exports = {
  registrarUsuario,
  iniciarSesion,
  renewToken,
};
