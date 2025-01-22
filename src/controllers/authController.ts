import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { User } from '../models/userSchema';
import dotenv from 'dotenv';
dotenv.config();
const JWT = process.env.JWT_TOKEN as string;
export class AuthController {

    public async login(req: Request, res: Response) {

        const { email, password } = req.body;

        try {
            const userInDB = await User.findOne({ email, isActive: true });

            if (!userInDB || !bcrypt.compareSync(password, userInDB.password)) {
                return res.status(400).json({ data: null, message: "Credenciales invalidas" });
            }


            //todo sale okey
            const userInfo = {
                id: userInDB._id,
                email: userInDB.email,
                nombre: userInDB.nombre,
                apellido: userInDB.apellido
            }

            const token = jwt.sign(userInfo, JWT, { expiresIn: 60 * 60 * 24 });

            return res.json({ data: token, message: "Usuario autenticado" });
        } catch (error) {
            res.status(500).json({ data: null, message: "Error interno del servidor" });
        }
    }
}