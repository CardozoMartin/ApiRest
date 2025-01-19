import {Server} from "./server";
import { connectDB } from "./config/db";

//Funcion principoal que maneja la conexion de la base de datos y luego inicia el servidor

const iniciarServer = async()=>{
    await connectDB();

    const server = new Server();
    
    server.listen()
}

iniciarServer();