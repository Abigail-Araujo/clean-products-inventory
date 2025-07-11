const presentationsRouter = require("express").Router();
const Presentation = require("../models/presentation");

presentationsRouter.get("/", async (req, res) => {
  try {
    const presentations = await Presentation.find();
    res.json(presentations);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las presentaciones", error });
  }
});

module.exports = presentationsRouter;