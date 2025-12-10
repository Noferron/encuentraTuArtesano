import * as productosModel from "../models/productos.model.js";

export async function actualizarProductos(req, res) {
    try{
        console.log("📦 Creando productos...");

        const{nombre, descripcion, imagen_url, categoria, precio, stock, comprar_url, activo, artesanoId}= req.body;

        const result = await productosModel.actualizarProductos(req.body);

        res.status(201).json ({
            message: "Producto creado correctamente",
            productoId: result.insertId
        });

    }
    catch(error){
        console.error(error);
        res.status(500).json({message: "Error al crear el producto"});
    }
    
}