import { Router, Request, Response } from "express";
import { getProductos, postProductos } from "../controllers/productosController";


const routerProductos = Router();


routerProductos.get("/productos", getProductos)

routerProductos.post("/productos",postProductos)


export { routerProductos };