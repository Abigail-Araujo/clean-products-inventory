const movementReasonRouter = require("express").Router();
const MovementReason = require("../models/movementReason");

// Obtener todas las razones de movimiento
movementReasonRouter.get("/", async (req, res) => {
  try {
    const reasons = await MovementReason.find();
    res.status(200).json(reasons);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las razones de movimiento", error });
  }
});

// Obtener una razón por ID
movementReasonRouter.get("/:id", async (req, res) => {
  try {
    const reason = await MovementReason.findById(req.params.id);
    if (!reason) {
      return res.status(404).json({ message: "Razón de movimiento no encontrada" });
    }
    res.status(200).json(reason);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la razón de movimiento", error });
  }
});

module.exports = movementReasonRouter;