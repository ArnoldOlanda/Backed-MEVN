import models from '../models';

const aumentarStock = async (idArticulo,cantidad)=>{
    let {stock} = await models.Articulo.findOne({_id:idArticulo});
    let newStock = parseInt(stock) + parseInt(cantidad);
    const reg = await models.Articulo.findByIdAndUpdate({_id:idArticulo},{stock:newStock});
}
const disminuirStock = async (idArticulo,cantidad)=>{
    let {stock} = await models.Articulo.findOne({_id:idArticulo});
    let newStock = parseInt(stock) - parseInt(cantidad);
    const reg = await models.Articulo.findByIdAndUpdate({_id:idArticulo},{stock:newStock});
}

export default {
    add: async (req, res, next) =>{
        try {
            const reg = await models.Ingreso.create(req.body);
            let detalles = req.body.detalles;
            detalles.map((x)=>{
                aumentarStock(x._id,x.cantidad);
            });
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({ message: 'Error creating' });
            next(e);
        }
    },
    query: async (req, res, next) =>{
        try {
            const reg = await models.Ingreso.findOne({ _id:req.query._id })
            .populate('usuario',{ nombre:1})
            .populate('persona',{nombre:1});
            if(!reg){
                res.status(404).send({
                    message:'El registro no existe'
                }) 
            }else{
                res.status(200).json(reg);
            }
        } catch (e) {
            res.status(500).send({
                message: 'The register does not exist'
            });
            next(e);
        }
    },
    list: async (req, res, next) =>{
        try {
            let valor = req.query.valor;
            //Buscar coincidencias por numero de comprobante o serie del comprobante
            const reg = await models.Ingreso.find({
                $or:[{'num_comprobante':new RegExp(valor,'i')},{'serie_comprobante':new RegExp(valor,'i')}]})
            .populate('usuario',{ nombre:1})
            .populate('persona',{ nombre:1})
            .sort({'createdAt':-1});
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'Error'
            });
            next(e);
        }
    },
    /*update: async (req, res, next) =>{
        try {
            const reg = await models.Categoria.findByIdAndUpdate({
                _id: req.body._id
            },
            { nombre:req.body.nombre,
              descripcion:req.body.descripcion
            });
            
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'Error'
            });
            next(e);
        }
    },
    remove: async (req, res, next)=>{
        try {
            const reg = await models.Categoria.findByIdAndDelete({_id:req.body._id});
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'Error'
            });
            next(e);
        }
    },*/
    activate: async (req, res, next) =>{
        try {
            const reg = await models.Ingreso.findByIdAndUpdate({_id: req.body._id},{estado:1});
            res.status(200).json(reg);
            let detalles = reg.detalles;
            detalles.map((x)=>{
                aumentarStock(x._id,x.cantidad);
            });
        } catch (e) {
            res.status(500).send({
                message: 'Error creating'
            });
            next(e);
        }
    },
    deactivate: async (req, res, next) =>{
        try {
            const reg = await models.Ingreso.findByIdAndUpdate({_id: req.body._id},{estado:0});
            let detalles = reg.detalles;
            detalles.map((x)=>{
                disminuirStock(x._id,x.cantidad);
            });
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'Error creating'
            });
            next(e);
        }
    },
    grafico12Meses:async (req, res, next) =>{
        try {
            const reg = await models.Ingreso.aggregate(
                [{
                    $group:{
                        _id:{
                            mes:{$month:"$createdAt"},
                            year:{$year:"$createdAt"}
                        }, 
                        total:{$sum:"$total"},
                        numero:{$sum:1}
                    }
                },{
                    $sort:{"_id.year":-1,"_id.mes":-1}
                }]
            ).limit(12);
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'Error'
            });
        }
    },
    consultaFechas: async (req, res, next) =>{
        try {
            let start = req.query.start;
            let end = req.query.end;
            //Buscar coincidencias por numero de comprobante o serie del comprobante
            const reg = await models.Ingreso.find({"createdAt":{$gte:start,$lte:end}})
            .populate('usuario',{ nombre:1})
            .populate('persona',{ nombre:1})
            .sort({'createdAt':-1});
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'Error'
            });
            next(e);
        }
    }
}