const productsRouter = require("express").Router();
const Product = require("../models/product");
const { sortAscending, sortDescending } = require("../utils/utils");

productsRouter.get("/", async (req, res) => {
  try {
    // Construye el filtro dinámicamente
    const filter = { active: true }; // Solo productos activos
    if (req.query.category) filter.id_category = req.query.category;
    if (req.query.stock) filter.stock = req.query.stock;

    // Busca con filtro y populate
    let products = await Product.find(filter)
      .populate("id_category")
      .populate("id_presentation");

    // Ordena según el parámetro order
    if (!req.query.order || req.query.order === "stock-asc") {
      products = sortAscending(products, "stock");
    } else if (req.query.order === "stock-desc") {
      products = sortDescending(products, "stock");
    } else if (req.query.order === "name-asc") {
      products = sortAscending(products, "name");
    } else if (req.query.order === "name-desc") {
      products = sortDescending(products, "name");
    } else if (req.query.order === "category-asc") {
      products = sortAscending(products, "category");
    } else if (req.query.order === "category-desc") {
      products = sortDescending(products, "category");
    } else if (req.query.order === "price-asc") {
      products = sortAscending(products, "price");
    } else if (req.query.order === "price-desc") {
      products = sortDescending(products, "price");
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los productos", error });
  }
});

// Get a product by id
productsRouter.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("id_category")
      .populate("id_presentation");
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el producto", error });
  }
});

// Create a new product
productsRouter.post("/", async (req, res) => {
  try {
    const { quantity, quantityAlert } = req.body;
    let stock = "Alto";
    if (Number(quantity) <= Number(quantityAlert)) {
      stock = "Bajo";
    } else if (
      Number(quantity) <=
      Number(quantityAlert) + Number(quantityAlert) * 0.5
    ) {
      stock = "Medio";
    }
    const newProduct = new Product({
      ...req.body,
      stock,
    });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Ya existe un producto con ese nombre y presentación.",
      });
    }
    res.status(500).json({ message: "Error al crear el producto", error });
  }
});

// Update a product by id
productsRouter.patch("/:id", async (req, res) => {
  try {
    // Normaliza los campos a minúsculas
    if (req.body.name) req.body.name = req.body.name.toLowerCase();
    if (req.body.description) req.body.description = req.body.description.toLowerCase();
    if (req.body.stock) req.body.stock = req.body.stock.toLowerCase();

    const { quantity, quantityAlert } = req.body;
    let stock = "Alto";
    if (Number(quantity) <= Number(quantityAlert)) {
      stock = "Bajo";
    } else if (
      Number(quantity) <= Number(quantityAlert) + Number(quantityAlert) * 0.5
    ) {
      stock = "Medio";
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: { ...req.body, stock } },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    console.log("Producto actualizado:", updatedProduct);
    res.status(200).json(updatedProduct);
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({
          message: "Ya existe un producto con ese nombre y presentación.",
        });
    }
    res
      .status(500)
      .json({ message: "Error al actualizar parcialmente el producto", error });
  }
});

// Delete a product by id
productsRouter.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: { active: false } },
      { new: true }
    );
    if (!deletedProduct) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json({ message: "Producto eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el producto", error });
  }
});

module.exports = productsRouter;
