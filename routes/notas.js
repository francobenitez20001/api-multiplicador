const express = require('express');
const NotasService = require('../services/Notas');
const ArchivosService = require('../services/Archivos');
const upload = require('../lib/multer');

function notasApi(app) {
    const router = express.Router();
    app.use('/api/notas',router);
    const notas = new NotasService();
    const archivos = new ArchivosService();

    router.get('/',async(req,res,next)=>{
        try{
            const {limit} = req.query;
            const data = await notas.getNotas(limit);
            console.log('la data es: '+ data);
            res.status(200).json({
                data:data || [],
                message:'Notas listadas'
            });
        }catch(error){
            next(error);
        }
    });

    router.get('/:id',async(req,res,next)=>{
        const {id} = req.params;
        try {
            const data = await notas.getNota(id);
            const resource = await archivos.getArchivosByNota(id);
            console.log('la data es: '+data);
            res.status(200).json({
                data:data || [],
                resource:resource || [],
                message:'Nota listada'
            });
        } catch (error) {
            next(error);
        }
    });

    router.post('/',upload.single('header'),async(req,res,next)=>{
        if(req.file == undefined){
            return res.status(500).json({
                message:'No se encontro la imagen'
            })
        };
        const {body:nota} = req;
        const {file:imagen} = req;
        try {
            const data = await notas.createNota(nota,imagen);
            console.log(req);
            res.status(200).json({
                data:data,
                message:'Nota agregada'
            });
        } catch (error) {
            next(error);
        }
    })

    router.put('/:id',async(req,res,next)=>{
        const {body:nota} = req;
        const {id} = req.params;
        try {
            const data = await notas.updateNota(nota,id);
            res.status(200).json({
                data:data,
                message:'Nota modificada'
            });
        } catch (error) {
            next(error);
        }
    });

    router.delete('/:id',async(req,res,next)=>{
        const {id} = req.params;
        try {
            const data = await notas.deleteNota(id);
            res.status(200).json({
                data:data,
                message:'Nota eliminada'
            });
        } catch (error) {
            next(error);
        }
    })
}

module.exports = notasApi;