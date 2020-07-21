const connection = require('../lib/mysql');

class ArchivosModel{
    getAll(collection){
        return new Promise((resolve,reject)=>{
            connection.query(`SELECT * FROM ${collection}`,(err,res,fields)=>{
                if(err) throw reject(err);
                resolve(res);
            })
        })
    };

    get(collection,id){
        return new Promise((resolve,reject)=>{
            connection.query(`SELECT * FROM ${collection} WHERE idArchivo = ${id}`,(err,results,fields)=>{
                if(err) throw console.log(err);
                resolve(results);
            })
        })
    }

    getByNota(collection,idNota){
        return new Promise((resolve,reject)=>{
            connection.query(`SELECT * FROM ${collection} WHERE idNota = ${idNota}`,(err,results,fields)=>{
                if(err) throw reject(err);
                resolve(results);
            })
        })
    }

    create(collection,body,files){
        return new Promise((resolve,reject)=>{
            let logError = [];
            for (let index = 0; index < files.length; index++) {
                connection.query(`
                    CALL SP_ARCHIVOS_ADD_UPDATE(${body.idArchivo},${body.idNota},'${files[index].filename}')`,(error,results,fields)=>{
                    if(error){
                        console.log(error);
                        
                        reject(error)
                    };
                })
            };
            if(logError.length==0){
                resolve('Imagenes subidas')
            }else{
                reject('Problemas al subir los archivos a la db');
            }
        })
    };

    update(collection,body,id){
        return new Promise((resolve,reject)=>{
            let query = `CALL SP_ARCHIVOS_ADD_UPDATE(${id},${body.idNota},'${body.archivo}')`;
            connection.query(query,(error,res,fiels)=>{
                if(error) throw reject(error);
                resolve(res);
            })
        })
    };

    delete(collection,id){
        return new Promise((resolve,reject)=>{
            const query = `CALL SP_ARCHIVOS_DELETE(${id})`;
            connection.query(query,(err,res,fields)=>{
                if(err) throw reject(err);
                resolve(res);
            })
        })
    }
}

module.exports = ArchivosModel;