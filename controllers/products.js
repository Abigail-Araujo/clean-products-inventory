const productsRouter = require("express").Router();
const Product = require("../models/product");
const Category = require("../models/category");
const { sortAscending, sortDescending } = require("../utils/utils");

// Get all products
productsRouter.get("/", async (req, res) => {
  try {
    const products = await Product.find().populate("id_category");
    if (!req.query.order || req.query.order === "stock-asc") {
      return res.status(200).json(sortAscending(products, "stock"));
    }
    if (req.query.order === "stock-desc") {
      return res.status(200).json(sortDescending(products, "stock"));
    }
    if (req.query.order === "name-asc") {
      return res.status(200).json(sortAscending(products, "name"));
    }
    if (req.query.order === "name-desc") {
      return res.status(200).json(sortDescending(products, "name"));
    }
    if (req.query.order === "category-asc") {
      return res.status(200).json(sortAscending(products, "category"));
    }
    if (req.query.order === "category-desc") {
      return res.status(200).json(sortDescending(products, "category"));
    }
    if (req.query.order === "price-asc") {
      return res.status(200).json(sortAscending(products, "price"));
    }
    if (req.query.order === "price-desc") {
      return res.status(200).json(sortDescending(products, "price"));
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los productos", error });
  }
});

// Create a new product
productsRouter.post("/", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el producto", error });
  }
});

// Update a product by id
productsRouter.patch("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar parcialmente el producto", error });
  }
});

// Delete a product by id
productsRouter.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json({ message: "Producto eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el producto", error });
  }
});

// Get products by category
productsRouter.get("/category/:categoryId", async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    if (!category) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }
    const products = await Product.find({ id_category: category._id }).populate("id_category");
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los productos por categoría", error });
  }
});

// Get products by stock status
productsRouter.get("/stock/:stock", async (req, res) => {
  try {
    const products = await Product.find({ stock: req.params.stock }).populate("id_category");
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al obtener los productos por estado de stock",
        error,
      });
  }
});

// Get products by category and stock status
productsRouter.get("/category/:categoryId/stock/:stock", async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    if (!category) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }
    const products = await Product.find({
      id_category: category._id,
      stock: req.params.stock,
    }).populate("id_category");
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({
        message:
          "Error al obtener los productos por categoría y estado de stock",
        error,
      });
  }
});

module.exports = productsRouter;
