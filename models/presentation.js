const mongoose = require("mongoose");

const presentationSchema = new mongoose.Schema({
  presentation: {
    type: String,
    required: [true, "El nombre de la presentación es obligatorio."],
    unique: true,
  },
});

// Middleware para guardar en minúsculas
presentationSchema.pre("save", function (next) {
  if (this.presentation) this.presentation = this.presentation.toLowerCase();
  next();
});

// Función para capitalizar la primera letra
function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Capitaliza al serializar a JSON
presentationSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    if (returnedObject.presentation)
      returnedObject.presentation = capitalize(returnedObject.presentation);
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Presentation = mongoose.model("Presentation", presentationSchema);

module.exports = Presentation;