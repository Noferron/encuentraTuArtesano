import pool from '../config/db.js';

export async function obtenerTodos() {
    // Crea un array de filas (rows) que generará una fila por cada una de las consultas realizadas
  const [rows] = await pool.query( 
    `SELECT id, nombre, descripcion, localizacion, categoria, instagram_url, tienda_url, facebook_url, comentarios_url,logo_url, activo, creado_en
     FROM presentacion
     WHERE activo = 1
     ORDER BY nombre ASC`
  );
  return rows;  // Aquí le decimos que nos devuelva el array con los datos de la consulta
}
 

