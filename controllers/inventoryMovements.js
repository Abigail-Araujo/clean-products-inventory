const inventoryMovementRouter = require("express").Router();
const inventoryMovement = require("../models/inventoryMovement");
const { userExtractor } = require("../middleware/auth");
const MovementReason = require("../models/movementReason");
const Product = require("../models/product");

// Get all inventory movements
inventoryMovementRouter.get("/", async (req, res) => {
  try {
    const movements = await inventoryMovement
      .find()
      .populate("id_product")
      .populate({ path: "id_user", select: "name" })
      .populate("id_reason")
      .sort({ createdAt: -1 }); // Orden descendente (más reciente primero)
    res.json(movements);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al obtener los movimientos de inventario",
        error,
      });
  }
});

inventoryMovementRouter.post("/", userExtractor, async (req, res) => {
  try {
    const { id_product, id_reason, quantity, description } = req.body;

    // Busca el motivo para saber si es entrada o salida
    const reason = await MovementReason.findById(id_reason);
    if (!reason) return res.status(400).json({ message: "Motivo no válido" });

    // Busca el producto
    const product = await Product.findById(id_product);
    if (!product)
      return res.status(400).json({ message: "Producto no válido" });

    // Calcula la nueva cantidad
    let nuevaCantidad = product.quantity;
    if (reason.type === "entrada") {
      nuevaCantidad += Number(quantity);
    } else if (reason.type === "salida") {
      nuevaCantidad -= Number(quantity);
      if (nuevaCantidad < 0) {
        return res
          .status(400)
          .json({
            message: "No hay suficiente stock para realizar la salida.",
          });
      }
    }

    // Actualiza la cantidad del producto
    product.quantity = nuevaCantidad;
    await product.save();

    // Crea el movimiento
    const movement = new inventoryMovement({
      id_product,
      id_reason,
      quantity,
      description,
      id_user: req.user._id
    });
    const savedMovement = await movement.save();

    res.status(201).json(savedMovement);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al registrar el movimiento", error });
  }
});

module.exports = inventoryMovementRouter;
