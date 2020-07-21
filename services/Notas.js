const NotasModel = require('../database/Notas');

class NotasService{
    constructor(){
        this.notasModel = new NotasModel();
        this.collection = 'notas';
    }

    async getNotas(limit){
        const datos = await this.notasModel.getWithRelations(limit,null).then(res=>{
            console.log(res);
            return res;
        })
        return datos;
    };

    async getNota(id){
        const datos = await this.notasModel.getWithRelations(false,id).then(res=>{
            console.log(res);
            return res;
        })
        return datos;
    };

    async getNotasByAutor(idAutor){
        const datos = await this.notasModel.getNotasByAutor(idAutor).then(res=>{
            console.log(res);
            return res;
        });
        return datos;
    }

    async createNota(body,imagen){
        const datos = await this.notasModel.create(this.collection,body,imagen).then(res=>{
            console.log(res);
            return res;
        })
        return datos;
    }

    async updateNota(body,id,header=null){
        const datos = await this.notasModel.update(this.collection,body,id,header).then(res=>{
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