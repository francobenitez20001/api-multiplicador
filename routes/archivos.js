const express = require('express');
const ArchivosService = require('../services/Archivos');
const upload = require('../lib/multer');
const CloudStorage = require('../lib/CloudStorage');

function archivosApi(app) {
    const router = express.Router();
    //a partir de esta url, todo lo que pase voy a manejarlo desde este archivo
    app.use("/api/archivos",router);
    const archivos = new ArchivosService();
    const cs = new CloudStorage();

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
        const {idNota} = req.body;
        try {
            if(!req.files){
                res.status(500).send({
                    info:'Files not found'
                });
                return;
            };
            const {files:imagenes} = req;
            await archivos.subirArchivosVarios(imagenes,idNota);
            res.status(200).json({
                info:'Archivos subidos'
            });
        } catch (error) {
            next(error)
        }
    });

    router.put('/:id',upload.single('archivo'),async(req,res,next)=>{
        const {id} = req.params;
        try {
            if(!req.file){
                return res.status(400).json({
                    info:'File not foud'
                });
            }
            const {file:archivo} = req;
            cs.upload(archivo).then(async link=>{
                const data = await archivos.updateArchivo(link,id);
                res.status(200).json({
                    data:data,
                    message:'Archivo modificado'
                });
            }).catch(err=>{
                next(err);
            })
        } catch (error) {
            next(error);
        }
    })

    router.delete('/:id',async(req,res,next)=>{
        const {id} = req.params;
        const {name} = req.query;
        try {
            cs.delete(name).then(async ()=>{
                const data = await archivos.deleteArchivo(id);
                res.status(200).json({
                    data:data,
                    message:'Archivo Eliminado'
                });
            }).catch(err=>{
                next(err);
            })
        } catch (error) {
            next(error);
        }
    });
}

module.exports = archivosApi;