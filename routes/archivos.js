const express = require('express');
const ArchivosService = require('../services/Archivos');
const path = require('path');
const multer = require('multer');

function archivosApi(app) {
    const router = express.Router();
    //a partir de esta url, todo lo que pase voy a manejarlo desde este archivo
    app.use("/api/archivos",router);
    const archivos = new ArchivosService();

    //como quiero almacenar las imagenes
    const storage = multer.diskStorage({
        destination:'./public/img',
        filename:(req,file,cb)=>{
            cb(null,file.originalname);
        }
    })

    const upload = app.use(multer({
        storage:storage,
        dest:'./public/img',
        limits:{fieldSize:10000000000},
        fileFilter:(req,file,cb)=>{
            //validando extensiones.
            const fileTypes = /jpeg|jpg|png|pptx|xlsx|xls|gif/;//extensiones aceptadas
            const mimetype = fileTypes.test(file.mimetype);
            const extname = fileTypes.test(path.extname(file.originalname));
            if (mimetype && extname) {
                return cb(null,true);
            }
            cb(JSON.stringify({status:400,message:"Archivo no soportado"}));
        }
    }).array('files'));

    router.get('/',async (req,res,next)=>{
        try {
            const data = await archivos.getArchivos();
            console.log('la data es: '+ data);
        
            res.status(200).json({
                data:data || [],
                message:'Archivos listados'
            });
        } catch (error) {
            next(error)
        }
    });

    router.get('/:id',async(req,res,next)=>{
        try {
            const {id} = req.params;
            const data = await archivos.getArchivo(id);
            console.log(data);
            res.status(200).json({
                data:data || [],
                message: 'Archivo Listado'
            });
        } catch (error) {
            next(error);
        }
    });

    router.post('/',upload,async(req,res,next)=>{
        const {body:archivo} = req;
        const {files:imagenes} = req;
        try {
            const data = await archivos.createArchivo(archivo,imagenes);
            res.status(200).json({
                info:data,
                message:'Se ha creado el archivo'
            });
        } catch (error) {
            next(error)
        }
    });

    router.put('/:id',async(req,res,next)=>{
        const {id} = req.params;
        const {body:archivo} = req;
        try {
            const data = await archivos.updateArchivo(archivo,id);
            res.status(200).json({
                data:id,
                message:'Archivo modificado'
            });
        } catch (error) {
            next(error);
        }
    })

    router.delete('/:id',async(req,res,next)=>{
        const {id} = req.params;
        try {
            const data = await archivos.deleteArchivo(id);
            res.status(200).json({
                data:data,
                message:'Archivo Eliminado'
            });
        } catch (error) {
            next(error);
        }
    });
}

module.exports = archivosApi;