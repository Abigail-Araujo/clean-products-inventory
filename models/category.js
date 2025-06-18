const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, "El nombre de la categoría es obligatorio."],
    unique: true, // Asegura que no haya categorías duplicadas por nombre
  },
});

categorySchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// Índice para mejorar el rendimiento de las búsquedas por nombre de categoría
categorySchema.index({ category: 1 });

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
