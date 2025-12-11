
import * as artesanosModel from "../models/artesanos.model.js"; 

//-------GET-----------------------

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

// Traer datos identificados con una id concreta


//----------POST----------------------------
export async function crearPresentacion(req,res) {
  try{
          console.log("📋 Creando presentación...");
  
          const{nombre,descripcion,localizacion,categoria,instagram_url,tienda_url,facebook_url,comentarios_url,logo_url, activo,artesanoId}= req.body;
  
          const result = await artesanosModel.subirPresentacion(req.body);
  
          res.status(201).json ({
              message: "Presentación creada correctamente",
              artesanoId: result.insertId
          });
  
      }
      catch(error){
          console.error(error);
          res.status(500).json({message: "Error al crear la presentación"});
      }
}

//--------PUT----------------------------------

export async function actualizarPresentacion(req, res) {
  try {
    const id = req.params.id; // viene de /artesanos/:id
    const datos = req.body;

    console.log("✏️ Actualizando presentación:", id, datos);

    const result = await artesanosModel.actualizarPresentacion(id, datos);

    if (!result.ok) {
      return res.status(404).json({ message: "Presentación no encontrada" });
    }

    res.status(200).json({
      message: "Presentación actualizada correctamente"
    });

  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ message: "Error al actualizar la presentación" });
  }
}
