const express = require('express');
const NotasService = require('../services/Notas');
const ArchivosService = require('../services/Archivos');
const upload = require('../lib/multer');
const CloudStorage = require('../lib/CloudStorage');

function notasApi(app) {
    const router = express.Router();
    app.use('/api/notas',router);
    const notas = new NotasService();
    const archivos = new ArchivosService();
    const cs = new CloudStorage();
    router.get('/',async(req,res,next)=>{
        if(!req.query.limit){
            return res.status(400).json({
                info:'Argumentos no encontrados'
            })
        }
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
            });
        };
        const {body:nota} = req;
        const {file:imagen} = req;
        try {
            cs.upload(imagen).then(async link => {
                const data = await notas.createNota(nota,link);
                //console.log(req);
                res.status(200).json({
                    data:data,
                    message:'Nota agregada'
                });
            }).catch(err => {
                res.status(500).json({
                    error:err
                })
            });
        } catch (error) {
            next(error);
        }
    })

    router.put('/:id',upload.single('header'),async(req,res,next)=>{
        const {body:nota} = req;
        const {id} = req.params;
        try {
            if(!req.file){
                const data = await notas.updateNota(nota,id);
                return res.status(200).json({
                    data:data,
                    message:'Nota modificada'
                });
            }
            const {file:imagen} = req;
            cs.upload(imagen).then(async header => {
                const data = await notas.updateNota(nota,id,header);
                res.status(200).json({
                    data:data,
                    message:'Nota modificada'
                });
            }).catch(err => {
                res.status(500).json({
                    error:err
                })
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