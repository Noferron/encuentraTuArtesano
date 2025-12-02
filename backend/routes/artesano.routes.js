import {Router} from "express";
import * as artesanosController from "../controllers/artesanos.controller.js"

const artesanosRoutes = Router();

artesanosRoutes.get ("/", artesanosController.getArtesanos);

export default artesanosRoutes;