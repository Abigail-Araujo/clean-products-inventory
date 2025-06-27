const categoriesRouter = require("express").Router();
const Category = require("../models/category");

categoriesRouter.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las categorías", error });
  }
});

module.exports = categoriesRouter;