import pool from '../config/db.js';


export async function actualizarProductos({nombre, descripcion, imagen_url, categoria,precio,stock,comprar_url,activo,artesanoId}) {
  
  const [result] = await pool.query(
    "INSERT INTO productos (nombre, descripcion, imagen_url, categoria, precio, stock, comprar_url, activo,artesano_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) ",
    [nombre, descripcion, imagen_url, categoria, precio, stock, comprar_url, activo, artesanoId]
  )

  return result;
}