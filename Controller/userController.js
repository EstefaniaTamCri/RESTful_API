const express = require("express");
const router = express.Router();

//importamos el modelo de UserModel
const User = require("../Model/userModel");

//Get, obtener todos los usuarios
router.get("/", async (req, res) => {
  try {
    const data = await User.find();
    res.status(200).json({ status: "succeeded", data, error: null });
  } catch (error) {
    res
      .status(404)
      .json({ status: "Failed", data: null, error: error.message });
  }
});

//Get, obtener un único usuario por su id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await User.findById(id);
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
    const data = new User({
      name: req.body.name,
      lastname: req.body.lastname,
      email: req.body.email,
      role: req.body.role,
      skills: req.body.skills,
      personality: req.body.personality,
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
    const data = await User.findByIdAndUpdate(id, body, { new: true });
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
    const data = await User.findByIdAndDelete(id);
    res.status(200).json({ status: "succeeded", data, error: null });
  } catch (error) {
    res
      .status(404)
      .json({ status: "Failed", data: null, error: error.message });
  }
});
module.exports = router;
