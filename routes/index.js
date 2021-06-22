import routerx from 'express-promise-router';

import categoriaRouter from './categoria';
import articuloRouter from './articulo';
import usuarioRouter from './usuario';
import personaRouter from './persona';
import ingresoRouter from './ingreso';
import ventaRouter from './venta';

const router = routerx();

router.use('/categoria',categoriaRouter); //Hace referencia al controlador de rutas Categoria
router.use('/articulo',articuloRouter); //Hace referencia al controlador de rutas Articulo
router.use('/usuario',usuarioRouter); //Hace referencia al controlador de rutas Usuario
router.use('/persona',personaRouter); //Hace referencia al controladpr de rutas Persona
router.use('/ingreso',ingresoRouter); //Hace referencia al controladpr de rutas Ingreso
router.use('./venta',ventaRouter); //Hace referencia al controlador de rutas Ventas

export default router;