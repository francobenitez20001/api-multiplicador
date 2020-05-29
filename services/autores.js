const AutoresModel = require('../database/Autores');

class AutoresService {
    constructor() {
        this.AutoresModel = new AutoresModel();
        this.collection = 'autores';
    }
    
    async getAutores(){
        const datos = await this.AutoresModel.getAll(this.collection).then(res=>{
            console.log(res); 
            return res;
        }); 
        return datos;
    }

    async getAutor(id){
        const datos = await this.AutoresModel.get(this.collection,id).then(res=>{
            return res;
        })
        return datos;
    }

    async create(body){
        const datos = await this.AutoresModel.create(this.collection,body).then(res=>{
            return res.insertId;
        })
        return datos;
    }

    async update(body,id){
        const datos = await this.AutoresModel.update(this.collection,body,id).then(res=>{
            return res;
        })
        return datos;
    }

    async delete(id){
        const datos = await this.AutoresModel.delete(this.collection,id).then(res=>{
            return res;
        })
        return datos;
    }
}

module.exports = AutoresService;