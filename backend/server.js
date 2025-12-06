import 'dotenv/config';
import express from 'express';
import cors from 'cors';
//import pool from './config/db.js';

import artesanosRoutes from './routes/artesano.routes.js';
import productosRoutes from './routes/producto.routes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta raíz de prueba
app.get('/', (req, res) => {
  res.send('API Node + MySQL - Bloque 3');
});

//Rutas
app.use("/api/artesanos",artesanosRoutes);
app.use("/api/productos", productosRoutes );

// Arrancar el servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});