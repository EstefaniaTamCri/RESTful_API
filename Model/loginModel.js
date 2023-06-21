const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const loginSchema = new Schema({
  email: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
    trim: true,
    minLength: 6,
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
    trim: true,
    minLength: 60,
    maxLength: 60,
  },
  role: {
    type: String,
    required: [true, "El rol es obligatorio"],
    enum: ["user", "admin"],
    default: "user",
  },
});

const Login = mongoose.model("Login", loginSchema, "login");

module.exports = Login;
