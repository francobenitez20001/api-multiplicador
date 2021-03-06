const connection = require('../lib/mysql');

class CategoriasModel{
    
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
            connection.query(`SELECT * FROM ${collection} WHERE idCategoria = ${id}`,(err,results,fields)=>{
                if(err) throw reject(err);
                resolve(results);
            })
        })
    }

    create(collection,body,icono){
        return new Promise((resolve,reject)=>{
            const query = `CALL SP_CATEGORIA_ADD_UPDATE(0,'${body.categoria}','${icono}');`;
            connection.query(query,(error,results,fields)=>{
                if(error) throw reject(error);
                resolve(results);
            })
        })
    };

    update(collection,body,id,icono){
        return new Promise((resolve,reject)=>{
            const query = `CALL SP_CATEGORIA_ADD_UPDATE(${id},'${body.categoria}','${icono}');`;
            connection.query(query,(error,res,fiels)=>{
                if(error) throw reject(error);
                resolve(res);
            })
        })
    };

    delete(collection,id){
        return new Promise((resolve,reject)=>{
            connection.query(`CALL SP_CATEGORIA_DELETE(${id})`,(err,res,fields)=>{
                if(err) throw reject(err);
                resolve(res);
            })
        })
    }
}

module.exports = CategoriasModel;