import {Router} from "express";
import * as productosController from "../controllers/productos.controller.js"

const productosRoutes = Router();

productosRoutes.post ("/", productosController.actualizarProductos);

export default productosRoutes;