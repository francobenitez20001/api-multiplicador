const express = require('express');
const AutoresService = require('../services/autores.js');
const NotasService = require('../services/Notas');
const upload = require('../lib/multer');
const path = require('path');
const {Storage} = require('@google-cloud/storage');
const {format} = require('util');

const googleCloud = new Storage({
    keyFilename:path.join(__dirname,'../sitios-trabajo-679d5ad729ed.json'),
    projectId:'sitios-trabajo'
})

const bucket = googleCloud.bucket('multiplicador');


function autoresApi(app) {
    const router = express.Router();
    //a partir de esta url, todo lo que pase voy a manejarlo desde este archivo
    app.use("/api/autores",router);
    const autores = new AutoresService();
    const notas = new NotasService();

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
            // Create a new blob in the bucket and upload the file data.
            const blob = bucket.file(req.file.originalname);
            const blobStream = blob.createWriteStream();
            
            blobStream.on('error', (err) => {
            next(err);
            });
            
            blobStream.on('finish', async() => {
                // The public URL can be used to directly access the file via HTTP.
                const avatar = format(
                  `https://storage.googleapis.com/${bucket.name}/${blob.name}`
                );
                const data = await autores.create(autor,avatar);
                res.status(200).json({
                    info:data,
                    message:'Se ha creado el autor'
                });
            });
            blobStream.end(req.file.buffer);
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