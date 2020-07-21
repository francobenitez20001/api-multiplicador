const express = require('express');
const CategoriasService = require('../services/Categorias');
const CloudStorage = require('../lib/CloudStorage');
const upload = require('../lib/multer');

function categoriasApi(app) {
    const router  = express.Router();
    app.use('/api/categorias',router);
    const categorias = new CategoriasService();
    const cs = new CloudStorage();

    router.get('/',async(req,res,next)=>{
        try{
            const data = await categorias.getCategorias();
            console.log('la data es: '+ data);
        
            res.status(200).json({
                data:data || [],
                message:'Categorias listadas'
            });
        }catch(error){
            next(error);
        }
    });

    router.get('/:id',async(req,res,next)=>{
        const {id} = req.params;
        try {
            const data = await categorias.getCategoria(id);
            console.log('la data es: '+data);
            res.status(200).json({
                data:data || [],
                message:'Categoria listada'
            });
        } catch (error) {
            next(error);
        }
    });

    router.post('/',upload.single('icono'),async(req,res,next)=>{
        try {
            if(!req.file){
                res.status(400).json({
                    error:'Icono no recibido'
                });
                return;
            }
            const {body:categoria} = req;
            const {file:icono} = req;
            cs.upload(icono).then(async link=>{
                const data = await categorias.createCategoria(categoria,link);
                //console.log(data);
                res.status(201).json({
                    data:data,
                    message:'Categoria agregada'
                });
            }).catch(error=>{
                res.status(500).json({
                    error
                })
            })
        } catch (error) {
            res.status(500).json({
                error
            })
        }
    })

    router.put('/:id',upload.single('icono'),async(req,res,next)=>{
        try {
            const {body:categoria} = req;
            const {id} = req.params;
            if(!req.file){
                const data = await categorias.updateCategoria(categoria,id);
                res.status(200).json({
                    data:data,
                    message:'Categoria modificada'
                });
                return; 
            }
            const {file:icono} = req;
            cs.upload(icono).then(async link=>{
                const data = await categorias.updateCategoria(categoria,id,link);
                res.status(200).json({
                    data:data,
                    message:'Categoria modificada'
                });
            }).catch(err=>(
                res.status(400).json({
                    error:err
                })
            ));
        } catch (error) {
            res.status(500).json({
                error
            })
        }
    });

    router.delete('/:id',async(req,res,next)=>{
        const {id} = req.params;
        try {
            const data = await categorias.deleteCategoria(id);
            res.status(200).json({
                data:data,
                message:'Categoria eliminada'
            });
        } catch (error) {
            next(error);
        }
    })
}

module.exports = categoriasApi;