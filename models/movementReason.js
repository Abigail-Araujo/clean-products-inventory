const mongoose = require("mongoose");

const movementReasonSchema = new mongoose.Schema({
  reason: {
    type: String,
    required: [true, "El motivo es obligatorio."],
    unique: true, // Cada motivo debe ser único
  },
  type: {
    type: String,
    required: [true, "El tipo de motivo (entrada/salida) es obligatorio."],
    enum: {
      values: ["entrada", "salida"], // Define si el motivo se aplica a entrada o salida
    },
  },
});

movementReasonSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// Índices para mejorar el rendimiento de las búsquedas
movementReasonSchema.index({ reason: 1 });
movementReasonSchema.index({ type: 1 });

const MovementReason = mongoose.model("MovementReason", movementReasonSchema);

module.exports = MovementReason;
