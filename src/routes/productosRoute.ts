import { Router, Request, Response } from "express";


const routerProductos = Router();


routerProductos.get("/productos", (req: Request, res: Response) => {
    res.json({
        name: "Api Rest Task"
    })
})


export { routerProductos };