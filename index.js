import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import router from './routes';


//conexion a la DB
mongoose.Promise = global.Promise;
const url = 'mongodb://localhost:27017/sistema';
mongoose.connect(url,{useCreateIndex: true, useNewUrlParser:true, useUnifiedTopology: true})
.then(mongoose => console.log('Conectado a la base de datos'))
.catch(err => console.log(err));

const app = express();
//Settings

//Midlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());//Permite peticiones json
app.use(express.urlencoded({ extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api',router);//Hacemos uso del manejador de rutas
app.set('port',process.env.PORT || 4000)

app.get('/api',(req, res) =>{res.send("Hello world");});

app.listen(app.get('port'),()=>{
    console.log(`listening on port ${app.get('port')}`);
});