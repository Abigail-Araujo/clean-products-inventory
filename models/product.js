const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  id_category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true 
  },
  id_presentation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Presentation",
    required: true
  },
  quantity: { type: Number, required: true },
  stock: String,
  price: { type: Number, required: true },
  quantityAlert: { type: Number, required: true },
  description: String,
  active: {
    type: Boolean,
    default: true,
  },
});

// Middleware para guardar en minúsculas
productSchema.pre("save", function (next) {
  if (this.name) this.name = this.name.toLowerCase();
  if (this.description) this.description = this.description.toLowerCase();
  if (this.stock) this.stock = this.stock.toLowerCase();
  next();
});

// Función para capitalizar la primera letra
function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Capitaliza los campos al serializar a JSON
productSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    if (returnedObject.name)
      returnedObject.name = capitalize(returnedObject.name);
    if (returnedObject.description)
      returnedObject.description = capitalize(returnedObject.description);
    if (returnedObject.stock)
      returnedObject.stock = capitalize(returnedObject.stock);
    // Si la categoría viene poblada, capitaliza también
    if (returnedObject.id_category && returnedObject.id_category.category) {
      returnedObject.id_category.category = capitalize(
        returnedObject.id_category.category
      );
    }
    // Si la presentación viene populada, capitaliza también
    if (
      returnedObject.id_presentation &&
      typeof returnedObject.id_presentation === "object" &&
      returnedObject.id_presentation.presentation
    ) {
      returnedObject.id_presentation.presentation = capitalize(
        returnedObject.id_presentation.presentation
      );
    }
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// Índices para mejorar el rendimiento de las búsquedas
productSchema.index({ name: 1, id_presentation: 1 }, { unique: true });
productSchema.index({ id_category: 1 });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;