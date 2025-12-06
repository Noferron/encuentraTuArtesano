import pool from '../config/db.js';


export async function actualizarProductos({nombre, descripcion, imagen_url, categoria,precio,stock,comprar_url,activo}) {
  const [productos] = await pool.query(
    "INSERT INTO productos (nombre, descripcion, imagen_url, categoria, precio, stock, comprar_url, activo) VALUES (?, ?, ?, ?, ?, ?, ?, ?) ",
    [nombre, descripcion, imagen_url, categoria, precio, stock, comprar_url, activo]
  )
  return [productos];
}