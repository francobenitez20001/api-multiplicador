const NotasModel = require('../database/Notas');

class NotasService{
    constructor(){
        this.notasModel = new NotasModel();
        this.collection = 'notas';
    }

    async getNotas(){
        const datos = await this.notasModel.getWithRelations().then(res=>{
            console.log(res);
            return res;
        })
        return datos;
    };

    async getNota(id){
        const datos = await this.notasModel.getWithRelations(true,id).then(res=>{
            console.log(res);
            return res;
        })
        return datos;
    };

    async createNota(body,imagen){
        const datos = await this.notasModel.create(this.collection,body,imagen).then(res=>{
            console.log(res);
            return res;
        })
        return datos;
    }

    async updateNota(body,id){
        const datos = await this.notasModel.update(this.collection,body,id).then(res=>{
            console.log(res);
            return res;
        });
        return datos;
    }

    async deleteNota(id){
        const datos = await this.notasModel.delete(this.collection,id).then(res=>{
            console.log(res);
            return res;
        })
        return datos;
    }
}

module.exports = NotasService;