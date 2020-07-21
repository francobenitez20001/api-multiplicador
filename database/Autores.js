const connection = require('../lib/mysql');

class AutoresModel{

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
            connection.query(`SELECT * FROM ${collection} WHERE idAutor = ${id}`,(err,results,fields)=>{
                if(err) throw reject(err);
                resolve(results);
            })
        })
    }

    create(collection,body,avatar){
        return new Promise((resolve,reject)=>{
            let query = `INSERT INTO ${collection} (nombre,apellido,descripcion,foto,twitter) VALUES ('${body.nombre}','${body.apellido}','${body.descripcion}','${avatar}','${avatar.twitter}')`;
            connection.query(query,(error,results,fields)=>{
                if(error) throw reject(error);
                resolve(results);
            })
        })
    };

    update(collection,body,id,foto){
        return new Promise((resolve,reject)=>{
            let query = `UPDATE ${collection} SET nombre = '${body.nombre}',apellido = '${body.apellido}',
                                                  descripcion = '${body.descripcion}', foto = '${foto.filename}',
                                                  twitter = '${body.twitter}'
                        WHERE idAutor = ${id}`;
            connection.query(query,(error,res,fiels)=>{
                if(error) throw reject(error);
                resolve(res);
            })
        })
    };

    delete(collection,id){
        return new Promise((resolve,reject)=>{
            connection.query(`DELETE FROM ${collection} WHERE idAutor = ${id}`,(err,res,fields)=>{
                if(err) throw reject(err);
                resolve(res);
            })
        })
    }
}

module.exports = AutoresModel;