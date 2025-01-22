import { User } from "../models/userSchema";
import { IUsers } from "../helpers/interface/IUsers";
import bcryptjs from "bcryptjs";
export class UserService {

    //logica para crear un usuario
    public async createUser(data: IUsers): Promise<IUsers> {

        //encriptar la contraseña
        const hashedPassword = await bcryptjs.hash(data.password, 10)
        data.password = hashedPassword;
        const newUser = new User(data);
        return await newUser.save();
    }
    //logica para obtener todos los usuarios
    public async getAllUsers(): Promise<IUsers[]> {
        const users = await User.find({});
        return users;
    }
    //logica para obtener un usuario por id
    public async getUserById(id: string): Promise<IUsers | null> {
        return await User.findById(id);
    }
    //logica para actualizar un usuario
    public async updateUser(id: string, data: Partial<IUsers>): Promise<IUsers | null> {
        return await User.findByIdAndUpdate(id, data, { new: true });
    }
    //logica para eliminar un usuario
    public async deleteUser(id: string): Promise<IUsers | null> {
        return await User.findByIdAndDelete(id);
    }
    //logica para buscar un usuario por email
    public async findUserByEmail(email: string): Promise<IUsers | null> {
        return await User.findOne({ email });
    }
}