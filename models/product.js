const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  id_category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category", // Referencia a la colección 'Category'
  },
  presentation: String,
  quantity: Number,
  stock: String,
  price: Number,
  quantityAlert: Number,
  description: String,
  active: {
    type: Boolean,
    default: true,
  },
});

productSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// Índices para mejorar el rendimiento de las búsquedas
productSchema.index({ name: 1 }); // Índice en el campo 'name'
productSchema.index({ id_category: 1 }); // Índice en el campo 'id_category'

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
