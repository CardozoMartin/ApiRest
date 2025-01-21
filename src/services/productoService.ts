import { Producto } from "../models/productoSchema";
import { IProducto } from "../helpers/interface/IProducto";


export class ProductoService {

    //logica para crear un producto
    public async createProducto(data: IProducto): Promise<IProducto> {
        const nuevoProducto = new Producto(data);
        return await nuevoProducto.save();
    }
    //logica para obtener todos los productos
    public async getAllProductos(): Promise<IProducto[]> {
        const producto = await Producto.find({});
        return producto;
    }
    //logica para obtener un producto por id
    public async getProductoById(id: string): Promise<IProducto | null> {
        return await Producto.findById(id);
    }
    //logica para actualizar un producto
    public async updateProducto(id: string, data: Partial<IProducto>): Promise<IProducto | null> {
        return await Producto.findByIdAndUpdate(id, data, { new: true });
    }
    //logica para eliminar un producto
    public async deleteProducto(id: string): Promise<IProducto | null> {
        return await Producto.findByIdAndDelete(id);
    }

}
