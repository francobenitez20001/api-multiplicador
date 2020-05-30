const ArchivosModel = require('../database/Archivos');

class ArchivosService{
    constructor(){
        this.ArchivosModel = new ArchivosModel();
        this.collection = 'archivos';
    }

    async getArchivos(){
        const datos = await this.ArchivosModel.getAll(this.collection).then(res=>{
            console.log(res);
            return res;
        })
        return datos;
    };

    async getArchivo(id){
        const datos = await this.ArchivosModel.get(this.collection,id).then(res=>{
            console.log(res);
            return res;
        })
        return datos;
    };

    async createArchivo(body){
        const datos = await this.ArchivosModel.create(this.collection,body).then(res=>{
            console.log(res);
            return res;
        })
        return datos;
    }

    async updateArchivo(body,id){
        const datos = await this.ArchivosModel.update(this.collection,body,id).then(res=>{
            console.log(res);
            return res;
        });
        return datos;
    }

    async deleteArchivo(id){
        const datos = await this.ArchivosModel.delete(this.collection,id).then(res=>{
            console.log(res);
            return res;
        })
        return datos;
    }

}

module.exports = ArchivosService;