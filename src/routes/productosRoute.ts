import { Router, Request, Response } from "express";
import { postProductos } from "../controllers/productosController";


const routerProductos = Router();


routerProductos.get("/productos", (req: Request, res: Response) => {
    res.json({
        name: "Api Rest Task"
    })
})

routerProductos.post("/productos",postProductos)


export { routerProductos };