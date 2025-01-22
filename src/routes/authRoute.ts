import { Router} from "express";
import { AuthController } from "../controllers/authController";


export class UserRoutes{
    private router: Router;
    private authController : AuthController;

    constructor(){
        this.router = Router();
        this.authController = new AuthController();
        this.initializeRoutes();
    }

    private initializeRoutes(){
        this.router.post("/login",(req,res) => this.authController.login(req,res));
    }

    public getRouter(): Router{
        return this.router;
    }

}

export const routerAuth = new UserRoutes().getRouter();

