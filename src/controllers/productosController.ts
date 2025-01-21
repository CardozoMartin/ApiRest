import { Producto } from "../models/productoSchema";
import { Request, Response } from "express";
import { ProductoService } from "../services/productoService";

const productoService = new ProductoService();
export class ProductoController {
    public async postProductos(req: Request, res: Response) {
        try {
            const nuevoProducto = await productoService.createProducto(req.body);
            return res.status(201).json(nuevoProducto);
        } catch (error) {
            console.error("Error al crear producto:", error);
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    }

    public async getProductos(req: Request, res: Response) {
        try {
            const productos = await productoService.getAllProductos();
            return res.json({ data: productos, message: "Productos encontrados" });
        } catch (error) {
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    }

    public async putProductos(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const productoActualizado = await productoService.updateProducto(id, req.body);
            if (!productoActualizado) {
                return res.status(404).json({ message: "Producto no encontrado" });
            }
            return res.json({ message: "Producto actualizado", data: productoActualizado });
        } catch (error) {
            return res.status(500).json({ message: "Error al actualizar el producto" });
        }
    }

    public async deleteProductos(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const productoEliminado = await productoService.deleteProducto(id);
            if (!productoEliminado) {
                return res.status(404).json({ message: "Producto no encontrado" });
            }
            return res.json({ message: "Producto eliminado" });
        } catch (error) {
            return res.status(500).json({ message: "Error al eliminar el producto" });
        }
    }

}
