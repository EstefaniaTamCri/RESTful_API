//configuracion inical de la aplicacion
const express = require("express");
const mongoose = require("mongoose");
const PORT = 8000;

//creamos la aplicacion de express
const app = express();

//analizar los archivos JSON
app.use(express.json());

//damos permiso a la aplicacion para que pueda acceder a la base de datos
require("dotenv").config();

//obtenemos la cadena de conexion de la base de datos desde las variables de entorno (fichero.env)
const mongoUrl = process.env.DATABASE_URL_DEV;

//Configuracion con mongodb
//useNewUrlParser: true -> le indica a monoose que utilice el nuevo analizador de URL de la cadena de conexcion
mongoose.connect(mongoUrl, { useNewUrlParser: true });

//guardamos la conexion con mongoose
const db = mongoose.connection;

//verificamos que la conexion se ha realizado correctamente
db.on("error", () => {
  console.error("Error:", error);
});

//nos indica que se establecido la conexion correctamente
db.once("connected", () => {
  console.log("Success connect");
});

//nos indica que la conexion se ha desconectado
db.on("disconnected", () => {
  console.log("Mongoose conecction is disconnected");
});

const users = require("./Controller/userController");
const { type } = require("os");
app.use("/users", users);

app.listen(PORT, () => {
  console.log(`Server running http://localhost:${PORT}`);
});
