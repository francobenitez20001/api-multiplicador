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

    create(collection,idNota,imagen){
        return new Promise((resolve,reject)=>{
            connection.query(`CALL SP_ARCHIVOS_ADD_UPDATE(0,${idNota},'${imagen}')`,(error,results,fields)=>{
                if(!error){
                    resolve(results);
                }else{
                    reject(error);
                }
            })
        })
    };

    update(collection,archivo,id){
        return new Promise((resolve,reject)=>{
            let query = `CALL SP_ARCHIVOS_ADD_UPDATE(${id},0,'${archivo}')`;
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