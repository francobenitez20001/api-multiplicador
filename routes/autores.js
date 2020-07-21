const express = require('express');
const AutoresService = require('../services/autores.js');
const NotasService = require('../services/Notas');
const upload = require('../lib/multer');
const CloudStorage = require('../lib/CloudStorage');

function autoresApi(app) {
    const router = express.Router();
    //a partir de esta url, todo lo que pase voy a manejarlo desde este archivo
    app.use("/api/autores",router);
    const autores = new AutoresService();
    const notas = new NotasService();
    const cs = new CloudStorage();

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
            const posteos = await notas.getNotasByAutor(id);
            console.log(data);
            res.status(200).json({
                data:data || [],
                notas:posteos || [],
                message: 'Autor Listado'
            });
        } catch (error) {
            next(error);
        }
    });

    router.post('/',upload.single('avatar'),async(req,res,next)=>{
        const {body:autor} = req;
        try {
            if (!req.file) {
                res.status(400).send('No file uploaded.');
                return;
            }
            cs.upload(req.file).then(async avatar=>{
                const data = await autores.create(autor,avatar);
                res.status(200).json({
                    info:data,
                    message:'Se ha creado el autor'
                });
            }).catch(err=>{
                res.status(500).json({
                    error:err
                })
            })
        } catch (error) {
            res.status(500).json({
                error
            })
        }
    });

    router.put('/:id',upload.single('avatar'),async(req,res,next)=>{
        const {id} = req.params;
        const {body:autor} = req;
        const {file:foto} = req;
        try {
            if (!req.file) {
                const data = await autores.update(autor,id);
                res.status(200).json({
                    info:data,
                    message:'Autor modificado'
                });
                return;
            }
            cs.upload(foto).then(async foto=>{
                const data = await autores.update(autor,id,foto);
                res.status(200).json({
                    info:data,
                    message:'Autor modificado'
                });
            }).catch(err=>{
                res.status(500).json({
                    error:err
                })
            })
        } catch (error) {
            res.status(500).json({
                error
            })
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