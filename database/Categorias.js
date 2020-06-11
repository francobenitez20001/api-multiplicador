const MysqlLib = require('../lib/mysql');

class CategoriasModel{
    constructor(){
        this.db = new MysqlLib();
    }

    getAll(collection){
        return new Promise((resolve,reject)=>{
            this.db.query(`SELECT * FROM ${collection}`,(err,res,fields)=>{
                if(err) throw reject(err);
                resolve(res);
            })
        })
    };
 
    get(collection,id){
        return new Promise((resolve,reject)=>{
            this.db.query(`SELECT * FROM ${collection} WHERE idCategoria = ${id}`,(err,results,fields)=>{
                if(err) throw reject(err);
                resolve(results);
            })
        })
    }

    create(collection,body){
        return new Promise((resolve,reject)=>{
            const query = `CALL SP_CATEGORIA_ADD_UPDATE(${body.idCategoria},'${body.categoria}','${body.icono}');`;
            this.db.query(query,(error,results,fields)=>{
                if(error) throw reject(error);
                resolve(results);
            })
        })
    };

    update(collection,body,id){
        return new Promise((resolve,reject)=>{
            const query = `CALL SP_CATEGORIA_ADD_UPDATE(${id},'${body.categoria}','${body.icono}');`;
            this.db.query(query,(error,res,fiels)=>{
                if(error) throw reject(error);
                resolve(res);
            })
        })
    };

    delete(collection,id){
        return new Promise((resolve,reject)=>{
            this.db.query(`CALL SP_CATEGORIA_DELETE(${id})`,(err,res,fields)=>{
                if(err) throw reject(err);
                resolve(res);
            })
        })
    }
}

module.exports = CategoriasModel;