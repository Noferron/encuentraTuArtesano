
import * as artesanosModel from "../models/artesanos.model.js"; 

export async function getArtesanos(req, res) {
  try {
    console.log('📦 Obteniendo productos...');
   
    const presentacion = await artesanosModel.obtenerTodos();
   
    res.status(200).json({
      success: true,
      message: `Se encontraron ${presentacion.length} productos`,
      data: presentacion
    });
   
  } catch (error) {
    console.error('❌ Error al obtener productos:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
}


