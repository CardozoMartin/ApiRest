import { Request, Response } from "express";
import { User } from "../models/userSchema";
import { UserService } from "../services/userService";

const userService = new UserService();
export class UserController {
    public async postUser(req: Request, res: Response) {
        try {
            const existinUser = await userService.findUserByEmail(req.body.email);
            if (existinUser) {
                return res.status(400).json({ message: "El email ya esta en uso" });
            }
            const newUser = await userService.createUser({ ...req.body, isActive: true });
            return res.status(201).json(newUser);
        } catch (error) {
            console.error("Error al crear usuario:", error);
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    }

    public async getUsers(req: Request, res: Response) {
        try {
            const users = await userService.getAllUsers();
            return res.json({ data: users, message: "Usuarios encontrados" });
        } catch (error) {
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    }

    public async putUser(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const userUpdated = await userService.updateUser(id, req.body);
            if (!userUpdated) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }
            return res.json({ message: "Usuario actualizado", data: userUpdated });
        } catch (error) {
            return res.status(500).json({ message: "Error al actualizar el usuario" });
        }
    }

    public async deleteUser(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const userDeleted = await userService.deleteUser(id);
            if (!userDeleted) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }
            return res.json({ message: "Usuario eliminado" });
        } catch (error) {
            return res.status(500).json({ message: "Error al eliminar el usuario" });
        }
    }
}