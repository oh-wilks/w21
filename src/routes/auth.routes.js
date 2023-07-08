const { Router } = require("express");
const { validarJWT } = require("../middleware/jwt.middleware");

const {
  registrarUsuario,
  iniciarSesion,
  renewToken,
} = require("../controllers/auth.ctrl");

const router = Router();

router.post("/register", registrarUsuario);
router.post("/login", iniciarSesion);
router.get("/renew", validarJWT, renewToken); // validarJWT will validate first the token
//router.get("/renew", renewToken); // it will not protect the route

module.exports = router;
