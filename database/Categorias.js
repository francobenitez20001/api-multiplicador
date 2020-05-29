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
            const query = `CALL SP_CATEGORIA_ADD_UPDATE(${body.idCategoria},'${body.categoria}');`;
            this.db.query(query,(error,results,fields)=>{
                if(error) throw reject(error);
                resolve(results);
            })
        })
    };

    update(collection,body,id){
        return new Promise((resolve,reject)=>{
            let query = `UPDATE ${collection} SET nombre = '${body.nombre}',apellido = '${body.apellido}',
                                                  descripcion = '${body.descripcion}', foto = '${body.foto}'
                        WHERE idAutor = ${id}`;
            this.db.query(query,(error,res,fiels)=>{
                if(error) throw reject(error);
                resolve(res);
            })
        })
    };

    delete(collection,id){
        return new Promise((resolve,reject)=>{
            this.db.query(`DELETE FROM ${collection} WHERE idAutor = ${id}`,(err,res,fields)=>{
                if(err) throw reject(err);
                resolve(res);
            })
        })
    }
}

module.exports = CategoriasModel;