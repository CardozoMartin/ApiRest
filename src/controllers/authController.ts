import { Request, Response } from 'express';
import { AuthService } from '../services/authService';

const authService = new AuthService();

export class AuthController {
    public async login(req: Request, res: Response) {
        const { email, password } = req.body;

        try {
            const { token, userInfo } = await authService.authenticateUser(email, password);
            return res.json({ data: { token, user: userInfo }, message: "Usuario autenticado" });
        } catch (error) {
            if (error.message === "Credenciales inválidas") {
                return res.status(400).json({ data: null, message: error.message });
            }
            return res.status(500).json({ data: null, message: "Error interno del servidor" });
        }
    }
}
