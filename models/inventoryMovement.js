const mongoose = require("mongoose");

const inventoryMovementSchema = new mongoose.Schema(
  {
    id_product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // Referencia al modelo Product
    },
    id_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Referencia al modelo User
    },
    id_reason: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MovementReason", // Referencia al nuevo modelo MovementReason
      required: [true, "El motivo del movimiento es obligatorio."],
    },
    quantity: {
      type: Number,
      required: [true, "La cantidad del movimiento es obligatoria."],
      min: [0, "La cantidad del movimiento no puede ser negativa."],
    },
    description: {
      type: String,
    },
    // La fecha ya viene por defecto con 'timestamps' (createdAt)
  },
  {
    timestamps: true, // Añade createdAt y updatedAt para la fecha del movimiento
  }
);

inventoryMovementSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// Índices para mejorar el rendimiento de las búsquedas
inventoryMovementSchema.index({ id_product: 1 });
inventoryMovementSchema.index({ id_user: 1 });
inventoryMovementSchema.index({ id_reason: 1 });
inventoryMovementSchema.index({ createdAt: -1 }); // Índice para ordenar movimientos por fecha (el más reciente primero)

const InventoryMovement = mongoose.model(
  "InventoryMovement",
  inventoryMovementSchema
);

module.exports = InventoryMovement;
