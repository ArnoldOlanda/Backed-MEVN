import tokenService from '../services/token';


const tokenExist = (req,res)=>{
    if(!req.headers.token){
        return res.status(404).send({ message:'No se ha enviado el token de autenticacion...' });     
   } 
}
export default {
    verifyUsuario: async (req,res,next) => {
       tokenExist(req,res);
       const response = await tokenService.decode(req.headers.token);     
       if(response.rol == 'Administrador' || response.rol == 'Vendedor' || response.rol == 'Almacenero'){
           next();
       }else return res.status(403).send({message:'Usuario no autorizado'});
    },
    verifyAdministrador: async (req,res,next) =>{
        tokenExist(req,res);
        const response = await tokenService.decode(req.headers.token);
        if(response.rol == 'Administrador'){
            next();
        }else return res.status(403).send({message:'Usuario no autorizado'});
    },
    verifyAlmacenero: async (req,res,next) =>{
        tokenExist(req,res);
        const response = await tokenService.decode(req.headers.token);
        if(response.rol == 'Administrador' || response.rol=='Almacenero'){
           next();
        }else return res.status(403).send({message:'Usuario no autorizado'});
    },
    verifyVendedor: async (req, res, next)=>{
        tokenExist(req,res);
        const response = await tokenService.decode(req.headers.token);
        if(response.rol == 'Administrador' || response.rol == 'Vendedor'){
           next();
        }else return res.status(403).send({message:'Usuario no autorizado'});
    }
}