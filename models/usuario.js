import mongoose, {Schema} from 'mongoose';

const usuarioSchema = new Schema({
    rol:{ type:String, maxLength:30, required:true},
    nombre:{ type:String, maxLength:50, unique:true,required:true},
    tipo_documento:{ type:String, maxLength:20},
    num_documento:{ type:String, maxLength:20},
    direccion:{ type:String, maxLength:70},
    telefono:{ type:String, maxLength:20},
    email:{ type:String, maxLength:50, unique:true , required:true},
    password:{ type:String, maxLength:64,required:true},
    estado:{ type:Number,default:1},
    createAt:{ type:Date,default:Date.now}
});

const Usuario = mongoose.model('usuario',usuarioSchema);
export default Usuario;