import { Router, Request, Response } from "express";
import { getProductos, postProductos, putProductos } from "../controllers/productosController";


const routerProductos = Router();


routerProductos.get("/productos", getProductos)

routerProductos.post("/productos",postProductos)

routerProductos.put("/productos/:id",putProductos)
export { routerProductos };