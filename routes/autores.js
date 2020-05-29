const express = require('express');
const AutoresService = require('../services/autores.js');

function autoresApi(app) {
    const router = express.Router();
    //a partir de esta url, todo lo que pase voy a manejarlo desde este archivo
    app.use("/api/autores",router);
    const autores = new AutoresService();

    router.get('/',async (req,res,next)=>{
        try {
            const data = await autores.getAutores();
            console.log('la data es: '+ data);
        
            res.status(200).json({
                data:data || [],
                message:'Autores listados'
            });
        } catch (error) {
            next(error)
        }
    });

    router.get('/:id',async(req,res,next)=>{
        try {
            const {id} = req.params;
            const data = await autores.getAutor(id);
            console.log(data);
            res.status(200).json({
                data:data || [],
                message: 'Autor Listado'
            });
        } catch (error) {
            next(error);
        }
    });

    router.post('/',async(req,res,next)=>{
        const {body:autor} = req;
        try {
            const data = await autores.create(autor);
            res.status(200).json({
                id:data,
                message:'Se ha creado el autor'
            });
        } catch (error) {
            next(error)
        }
    });

    router.put('/:id',async(req,res,next)=>{
        const {id} = req.params;
        const {body:autor} = req;
        try {
            const data = await autores.update(autor,id);
            res.status(200).json({
                data:id,
                message:'Autor modificado'
            });
        } catch (error) {
            next(error);
        }
    })

    router.delete('/:id',async(req,res,next)=>{
        const {id} = req.params;
        try {
            const data = await autores.delete(id);
            res.status(200).json({
                data:data,
                message:'Autor Eliminado'
            });
        } catch (error) {
            next(error);
        }
    });
}

module.exports = autoresApi;