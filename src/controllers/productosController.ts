import { Producto } from "../models/productoSchema";
import { Request, Response } from "express";

// Controlador para crear un nuevo producto
export const postProductos = async (req: Request, res: Response) => {
    const { nombre, precio, imagen, descripcion } = req.body;

    // Validación de los datos de entrada
    if (!nombre || !precio || !imagen || !descripcion) {
        return res.status(400).json({
            message: "Todos los campos (nombre, precio, imagen, descripcion) son requeridos.",
        });
    }

    try {
        // Creación del nuevo producto en la base de datos
        const nuevoProducto = new Producto({
            nombre,
            precio,
            imagen, // Notar que el nombre del campo en la base de datos es 'imange', asegúrate de que esté bien
            descripcion,
        });

        // Guardamos el producto
        await nuevoProducto.save();

        // Devolvemos la respuesta con el nuevo producto creado
        return res.status(201).json(nuevoProducto);
    } catch (error) {
        // Manejo de errores
        console.error("Error al crear el producto:", error);
        return res.status(500).json({
            message: "Error interno del servidor al crear el producto.",
        });
    }
};
