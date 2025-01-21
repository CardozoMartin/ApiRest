import { Router} from "express";
import { UserController } from "../controllers/userController";


export class UserRoutes {
    private router: Router;
    private userController: UserController;

    constructor() {
        this.router = Router();
        this.userController = new UserController();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get("/users", (req, res) => this.userController.getUsers(req, res));
        this.router.post("/users", (req, res) => this.userController.postUser(req, res));
        this.router.put("/users/:id", (req, res) => this.userController.putUser(req, res));
        this.router.delete("/users/:id", (req, res) => this.userController.deleteUser(req, res));
    }

    public getRouter(): Router {
        return this.router;
    }
}

// Exportamos la instancia de la clase para su uso en el servidor
export const routerUsers = new UserRoutes().getRouter();