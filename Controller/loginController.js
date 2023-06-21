const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { generateToken, verifyToken } = require("../lib/utils");

const Login = require("../Model/loginModel");

router.post("/signup", async (req, res) => {
  try {
    const data = new Login({
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
      role: req.body.role,
    });

    const user = await data.save();
    res.status(201).json({ status: "succeeded", user, error: null });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        status: "Failed",
        user: null,
        error: "correo duplicado",
      });
    }
    res
      .status(404)
      .json({ status: "Failed", user: null, error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    //buscar en la base de datos si el usuario esta registrado y coincide con el valor email
    const user = await Login.findOne({ email: req.body.email }).exec();
    if (user) {
      //comparamos la contraseña del usuario con la contraseña de la base de datos para obtener el true o false
      const validatePassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (validatePassword) {
        const data = { email: user.email, role: user.role };
        const token = generateToken(data, false);
        const tokenRefresh = generateToken(data, true);

        res.status(200).json({
          status: "succeeded",
          user: {
            id: user._id,
            email: user.email,
            role: user.role,
            token: token,
            token_refresh: tokenRefresh,
          },
          error: null,
        });
      } else {
        res.status(401).json({
          status: "Failed",
          user: null,
          error: "email y contraseña no coinciden",
        });
      }
    } else {
      res.status(401).json({
        status: "Failed",
        user: null,
        error: "email y contraseña no coinciden",
      });
    }
  } catch (error) {
    res
      .status(404)
      .json({ status: "Failed", user: null, error: error.message });
  }
});

router.get("/refresh", verifyToken, async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Acceso denegado" });
  }
  const data = { email: req.user.email, role: req.user.role };
  const token = generateToken(data, false);
  const tokenRefresh = generateToken(data, true);

  res.status(200).json({
    status: "succeeded",
    data: {
      token: token,
      token_refresh: tokenRefresh,
    },
    error: null,
  });
});

module.exports = router;
