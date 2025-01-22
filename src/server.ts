// Importamos las librerías necesarias para inicializar el servidor.
import express, { Express } from "express"; // Framework para manejar solicitudes HTTP.
import morgan from "morgan"; // Middleware para registrar las solicitudes en la consola.
import cors from "cors"; // Middleware para manejar CORS (intercambio de recursos entre diferentes dominios).
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

// Importamos las rutas que vamos a usar
import { routerProductos } from "./routes/productosRoute";
import { routerUsers } from "./routes/userRoute";
import { routerAuth } from "./routes/authRoute";

// Creamos una clase llamada Server que encapsula toda la lógica del servidor.
export class Server {
  // Declaramos una variable privada 'app' de tipo 'Express' que contendrá la instancia del servidor.
  private app: Express;

  // Constructor de la clase Server.
  // Aquí inicializamos la variable 'app' con una instancia de Express y configuramos el servidor.
  constructor() {
    this.app = express(); // Creamos una nueva instancia de Express.
    this.configuration(); // Configuramos el servidor.
    this.routes(); // Ahora llamamos a routes() después de configurar 'app'
  }

  // Método privado para configurar el servidor.
  // Aquí definimos el puerto donde correrá el servidor.
  private configuration() {
    this.app.set("port", 5000); // Establecemos el puerto en 5000.
    this.app.use(morgan("dev")); // Usamos morgan para registrar las solicitudes.
    this.app.use(cors()); // Usamos CORS para permitir solicitudes desde diferentes dominios.
    this.app.use(express.json()); // Usamos express.json para poder manejar cuerpos de solicitudes en formato JSON.

    const swaggerDocument = YAML.load("./swagger.yaml");
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }

  // Método privado para manejar las rutas.
  // En este caso, se configura el enrutador para productos.
  private routes() {
    this.app.use("/api", routerProductos); // Definimos que las rutas bajo "/api" usarán 'routerProductos'.
    this.app.use("/api", routerUsers); // Definimos que las rutas bajo "/api" usarán 'routerUsers'.
    this.app.use("/api", routerAuth);
  }

  // Método para iniciar el servidor y hacerlo escuchar en el puerto configurado.
  public listen() {
    this.app.listen(this.app.get("port"), () => {
      // Iniciamos el servidor en el puerto definido y mostramos un mensaje en la consola.
      console.log(`Servidor corriendo en el puerto ${this.app.get("port")}`);
    });
  }
}
