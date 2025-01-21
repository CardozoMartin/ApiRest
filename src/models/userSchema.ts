import mongoose, {Schema} from "mongoose";
import { IUsers } from "../helpers/interface/IUsers";

const UserSchema: Schema<IUsers> = new Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
})

const User = mongoose.model<IUsers>("User2",UserSchema);

export { User };