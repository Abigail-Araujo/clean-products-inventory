const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, "El nombre de la categoría es obligatorio."],
    unique: true,
  },
});

// Función para capitalizar la primera letra
function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

categorySchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    if (returnedObject.category)
      returnedObject.category = capitalize(returnedObject.category);
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;