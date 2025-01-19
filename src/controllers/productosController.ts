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

//Controlador para obtener los productos ya creados
export const getProductos = async (req: Request, res: Response) => {
    try {
        const data = await Producto.find({});

        const dataProductos = data.map((item) => ({
            id: item._id,
            nombre: item.nombre,
            precio: item.precio,
            imagen: item.imagen,
            descripcion: item.descripcion,

        }));
        res.json({ data: dataProductos, message: 'Productos Encontrados' })
    } catch (error) {
        res.status(500).json({
            data: null,
            menssage: "ocurrio un error"
        })
    }
}

export const putProductos = async (req: Request, res: Response) => {

    const {
        body,
        params: { id },
    } = req;
    try {
        const actions = await Producto.updateOne({_id:id},body);
    
        if(actions.matchedCount === 0){
            res.status(400).json({
                data:null,
                message:"No se encontro el id"
            });
            return;
        }
    
        res.json({
            data:null,
            message:"Producto actualizado exitosamente"
        })
        
    } catch (error) {
        res.status(500).json({
            data:null,
            message:"Ocurrio un error al actualzar un producto"
        })
    }
}