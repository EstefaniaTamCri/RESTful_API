//cargamos modulo HTTP en el servidor
const http = require("http");
//declaramos el puerto donde lanzamos el servidor
const PORT = 8000;

const server = http
  .createServer(
    //req contiene los detalles de la solicitud
    //res envia la respuesta al cliente
    (req, res) => {
      res.statusCode = 200; //codigo de estado de la respuesta, todo ok

      res.setHeader("Content-Type", "text/html"); //establecemos el tipo de contenido de la respuesta

      res.end("<h1>Hello World</h1> </br> <h2> Estefania Tamayo Criado</h2>"); //respuesta que enviamos al cliente, en este caso tipo html
    }
  )
  .listen(PORT, () => {
    //imprimimos en consola el puerto donde se esta ejecutando el servidor
    console.log(`Server running at http://localhost:${PORT}`);
  });
