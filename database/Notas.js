const MysqlLib = require('../lib/mysql');

class NotasModel{
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
            this.db.query(`SELECT * FROM ${collection} WHERE idNota = ${id}`,(err,results,fields)=>{
                if(err) throw reject(err);
                resolve(results);
            })
        })
    }

    getWithRelations(limit=false,id=null){
        return new Promise((resolve,reject)=>{
            let query = `
                SELECT idNota,a.nombre,a.apellido,a.foto,c.categoria,n.idCategoria,titulo,resumen,contenido,header,estado 
                    FROM notas AS n, autores AS a, categorias AS c
                        WHERE n.idAutor = a.idAutor AND n.idCategoria = c.idCategoria;`;
            if(limit && id!==null){
                query = `
                SELECT idNota,a.nombre,a.apellido,a.foto,c.categoria,n.idCategoria,titulo,resumen,contenido,header,estado 
                    FROM notas AS n, autores AS a, categorias AS c
                        WHERE n.idNota = ${id} AND n.idAutor = a.idAutor AND n.idCategoria = c.idCategoria;`;        
            }
            this.db.query(query,(err,results,fields)=>{
                if(err) throw reject(err);
                resolve(results);
            })
        })
    };

    create(collection,body,imagen){
        return new Promise((resolve,reject)=>{
            const query = `CALL SP_NOTAS_ADD_UPDATE(${body.idNota},${body.idAutor},${body.idCategoria},
                '${body.titulo}','${body.resumen}','${body.contenido}','${imagen.filename}',${body.estado});`;
            this.db.query(query,(error,results,fields)=>{
                if(error) return console.log(error);
                resolve(results);
            })
        })
    };

    update(collection,body,id){
        return new Promise((resolve,reject)=>{
            const query = `CALL SP_NOTAS_ADD_UPDATE(${id},${body.idAutor},${body.idCategoria},
                '${body.titulo}','${body.resumen}','${body.contenido}','${body.header}',${body.estado});`;
            this.db.query(query,(error,res,fiels)=>{
                if(error) throw reject(error);
                resolve(res);
            })
        })
    };

    delete(collection,id){
        return new Promise((resolve,reject)=>{
            this.db.query(`CALL SP_NOTAS_DELETE(${id})`,(err,res,fields)=>{
                if(err) throw reject(err);
                resolve(res);
            })
        })
    }
};

module.exports = NotasModel;