// desestructura de express
const { Router } = require("express");

//import controladores
const { createProduct } = require("../controllers/product.ctrl");
const { validarJWT } = require("../middleware/jwt.middleware");

//instanciar rotuer()
const router = Router();

//crud routes
router.post("/", validarJWT, createProduct);

module.exports = router;
