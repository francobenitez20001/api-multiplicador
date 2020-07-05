const express = require('express');
const ArchivosService = require('../services/Archivos');
const upload = require('../lib/multer');

function archivosApi(app) {
    const router = express.Router();
    //a partir de esta url, todo lo que pase voy a manejarlo desde este archivo
    app.use("/api/archivos",router);
    const archivos = new ArchivosService();

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

    router.post('/',upload.array('files'),async(req,res,next)=>{
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

    router.post('/storage',async(req,res,next)=>{
        const {body:imagenes} = req;
        console.log(req);
        
        res.status(200).json({
            info:imagenes,
            message:'Se ha creado el archivo'
        });
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