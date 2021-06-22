import mongoose, {Schema} from 'mongoose';

const personaSchema = new Schema({
    tipo_persona:{ type:String, maxLength:20, required:true},
    nombre:{ type:String, maxLength:50, unique:true,required:true},
    tipo_documento:{ type:String, maxLength:20},
    num_documento:{ type:String, maxLength:20},
    direccion:{ type:String, maxLength:70},
    telefono:{ type:String, maxLength:20},
    email:{ type:String, maxLength:50, unique:true },
    estado:{ type:Number,default:1},
    createAt:{ type:Date,default:Date.now}
});

const Persona = mongoose.model('persona',personaSchema);
export default Persona;