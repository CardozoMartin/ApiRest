import { Router } from "express";
import { ProductoController } from "../controllers/productosController";

export class ProductoRoutes {
    private router: Router;
    private productoController: ProductoController;

    constructor() {
        this.router = Router();
        this.productoController = new ProductoController();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get("/productos", (req, res) => this.productoController.getProductos(req, res));
        this.router.post("/productos", (req, res) => this.productoController.postProductos(req, res));
        this.router.put("/productos/:id", (req, res) => this.productoController.putProductos(req, res));
        this.router.delete("/productos/:id", (req, res) => this.productoController.deleteProductos(req, res));
    }

    public getRouter(): Router {
        return this.router;
    }
}


export const routerProductos = new ProductoRoutes().getRouter();
