const express = require("express");
const router = express.Router();

const Products = require("../Model/productsModel");

router.get("/", async (req, res) => {
  try {
    const data = await Products.find();
    res.status(200).json({ status: "succeeded", data, error: null });
  } catch (error) {
    res
      .status(404)
      .json({ status: "Failed", data: null, error: error.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Products.findById(id);
    res.status(200).json({ status: "succeeded", data, error: null });
  } catch (error) {
    res
      .status(404)
      .json({ status: "Failed", data: null, error: error.message });
  }
});

//crear un usuario
router.post("/", async (req, res) => {
  try {
    const data = new Products({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      size: req.body.size,
      color: req.body.color,
      brand: req.body.brand,
    });
    await data.save();
    res.status(200).json({ status: "succeeded", data, error: null });
  } catch (error) {
    res
      .status(404)
      .json({ status: "Failed", data: null, error: error.message });
  }
});

//actualizar un usuario
router.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    //new: true -> devuelve el documento modificado
    const data = await Products.findByIdAndUpdate(id, body, { new: true });
    res.status(200).json({ status: "succeeded", data, error: null });
  } catch (error) {
    res
      .status(404)
      .json({ status: "Failed", data: null, error: error.message });
  }
});

//eliminar un usuario
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Products.findByIdAndDelete(id);
    res.status(200).json({ status: "succeeded", data, error: null });
  } catch (error) {
    res
      .status(404)
      .json({ status: "Failed", data: null, error: error.message });
  }
});

module.exports = router;
