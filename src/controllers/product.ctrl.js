const User = require("../models/product");

const createProduct = async (req, res) => {
  try {
    const { name, description, price, image } = req.body;

    const nuevo_producto = {
      name,
      description,
      price,
      image,
    };

    const new_product = await User(nuevo_producto).save();

    return res.json({
      ok: true,
      msg: "Producto creado",
      data: new_product,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error en el servidor",
      data: {},
    });
  }
};

module.exports = {
  createProduct,
};
