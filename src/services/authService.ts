import { User } from "../models/userSchema";
import { IUsers } from "../helpers/interface/IUsers";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config/dotenvConfig';

export class AuthService {
    public async authenticateUser(email: string, password: string) {
        const userInDB = await User.findOne({ email, isActive: true });

        if (!userInDB || !bcrypt.compareSync(password, userInDB.password)) {
            throw new Error("Credenciales inválidas");
        }

        // Datos públicos del usuario
        const userInfo = {
            id: userInDB._id,
            email: userInDB.email,
            nombre: userInDB.nombre,
            apellido: userInDB.apellido
        };

        // Generar token
        const token = jwt.sign(userInfo, config.jwtSecret, { expiresIn: '1d' });

        return { token, userInfo };
    }
}
