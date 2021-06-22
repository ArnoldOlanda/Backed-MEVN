import mongoose,{ Schema } from 'mongoose';


const categoriaSchema = new Schema({
    nombre:{ type: String, maxLength: 50, unique: true, required: true},
    descripcion:{type: String, maxLength: 255},
    estado:{ type: Number, default: 1 },
    createdAt:{type: Date, default: Date.now}    
});

const Categoria = mongoose.model('categoria',categoriaSchema);

export default Categoria;