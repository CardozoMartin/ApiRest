import { Router, Request, Response } from "express";
import { deleteProductos, getProductos, postProductos, putProductos } from "../controllers/productosController";


const routerProductos = Router();


routerProductos.get("/productos", getProductos)

routerProductos.post("/productos",postProductos)

routerProductos.put("/productos/:id",putProductos)

routerProductos.delete("/productos/:id",deleteProductos)
export { routerProductos };