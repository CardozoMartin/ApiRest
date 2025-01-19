import mongoose, { Schema } from "mongoose";
import { IProducto } from "../helpers/interface/IProducto";


const ProductoSchema: Schema<IProducto> = new Schema({
    nombre: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    imagen: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    }

});

const Producto = mongoose.model<IProducto>("Prodcuto",ProductoSchema);

export { Producto };