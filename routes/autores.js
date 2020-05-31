const express = require('express');
const AutoresService = require('../services/autores.js');
const upload = require('../lib/multer');

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

    router.post('/',upload.single('foto'),async(req,res,next)=>{
        const {body:autor} = req;
        const {file:avatar} = req;
        try {
            const data = await autores.create(autor,avatar);
            res.status(200).json({
                info:data,
                message:'Se ha creado el autor'
            });
        } catch (error) {
            next(error)
        }
    });

    router.put('/:id',upload.single('foto'),async(req,res,next)=>{
        const {id} = req.params;
        const {body:autor} = req;
        const {file:foto} = req;
        try {
            const data = await autores.update(autor,id,foto);
            res.status(200).json({
                info:data,
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