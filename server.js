import {faker} from '@faker-js/faker';
import express from 'express';
import { Server as HttpServer } from 'http';
import { Server } from 'socket.io';
import Contenedor from './manejadorarchivos.js';
import CRUD from './db/conf.js';
import { authors } from './models/author.js';
import { mensajes } from './models/mensaje.js';
faker.locale = 'es';

//const { Socket } = require('dgram');

const contenedor = new Contenedor();

const app=express();
const httpServer= HttpServer(app);
const io= new Server(httpServer);

//para poder utilizar los archivos de html en la carpeta public
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true})); //PERMITE PASAR DATOS PORLA URL, BODY

app.set('views', './views');
app.set('view engine', 'pug');

const PORT = 8080;
httpServer.listen(PORT, ()=>{
    console.log(`servidor escuchando en el puerto ${PORT}`);
});

//generar laconexión por websocket -- servidor de websocketque tenemos en la variable io
 io.on('connection',async socket=>{
    console.log('conexión al socket');
    try{
        await CRUD();
        let mensajesDB = await mensajes.find();
        console.log('Un cliente se ha conectado'); 
        //cuando ya se ha conectado emitir los mensajes que hayan habido 
        socket.emit('messages',mensajesDB);//backend al fronend
        socket.on('new-message', async data=>{ //recibiendo el mensaje que le envian del fronend
            try{
                await CRUD();
                await mensajes.create(data);//guardando el mensaje
                mensajesDB = await mensajes.find();
                io.sockets.emit('messages', mensajesDB)
            }catch(exception){
                console.log(exception);
            }
        })
    }catch(exception){
        console.log(exception);
    }
})

//pinta los productos 
app.get('/productos',async (req, res)=>{
    const productos = await contenedor.getAll();
    res.render('productos', { productos });
});

app.get('/productos/:id',async(req, res)=>{
    const productoId = Number(req.params.id);
    const producto  = await contenedor.getById(productoId);
    res.json({producto});
})

app.get('/', async(req, res)=>{
    const productos = await contenedor.getAll(); //trae todos los productos
    res.render('formulario', { productos }); //le paso la vista que quiero que muestre 
});

//GUARDAR PRODUCTOS
app.post('/productos',async (req, res)=>{
    const producto = await req.body; //recibo el producto
    console.log(producto);
    //contenedor.save(producto); 
    res.redirect('/');  //redireccionar a la ruta principal
});

app.put('/productos/:id', async(req, res)=>{
    const productoID = Number(req.params.id);
    const producto = req.body;
    producto.id = productoID;
    console.log(req.body);
    contenedor.update(producto);
    res.json({});
})

app.get('/api/productos-test', (req, res)=>{
    const productos = [];
    for(let i = 0; i < 5; i++){
        productos.push({
            nombre: faker.commerce.product(),
            precio: faker.commerce.price(),
            foto: faker.image.imageUrl(64, 64, 'products')
        });
    }
    res.render('productos-test', { productos });
})


