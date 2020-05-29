const express = require('express');
const CategoriasService = require('../services/Categorias');

function categoriasApi(app) {
    const router  = express.Router();
    app.use('/api/categorias',router);
    const categorias = new CategoriasService();

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

    router.post('/',async(req,res,next)=>{
        const {body:categoria} = req;
        try {
            const data = await categorias.createCategoria(categoria);
            console.log(data);
            res.status(200).json({
                data:data,
                message:'Categoria agregada'
            });
        } catch (error) {
            next(error);
        }
    })

    router.put('/:id',async(req,res,next)=>{
        const {body:categoria} = req;
        const {id} = req.params;
        try {
            const data = await categorias.updateCategoria(categoria,id);
            res.status(200).json({
                data:data,
                message:'Categoria modificada'
            });
        } catch (error) {
            next(error);
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