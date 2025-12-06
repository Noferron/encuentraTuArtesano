import {Router} from "express";
import * as productosController from "../controllers/productos.controller.js"

const productosRoutes = Router();

productosRoutes.get ("/", productosController.actualizarProductos);

export default productosRoutes;