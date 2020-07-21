const CategoriasModel = require('../database/Categorias');

class CategoriasService{
    constructor(){
        this.categoriasModel = new CategoriasModel();
        this.collection = 'categorias';
    }

    async getCategorias(){
        const datos = await this.categoriasModel.getAll(this.collection).then(res=>{
            console.log(res);
            return res;
        })
        return datos;
    };

    async getCategoria(id){
        const datos = await this.categoriasModel.get(this.collection,id).then(res=>{
            console.log(res);
            return res;
        })
        return datos;
    };

    async createCategoria(body,icono){
        const datos = await this.categoriasModel.create(this.collection,body,icono).then(res=>{
            console.log(res);
            return res;
        })
        return datos;
    }

    async updateCategoria(body,id,icono=null){
        const datos = await this.categoriasModel.update(this.collection,body,id,icono).then(res=>{
            console.log(res);
            return res;
        });
        return datos;
    }

    async deleteCategoria(id){
        const datos = await this.categoriasModel.delete(this.collection,id).then(res=>{
            console.log(res);
            return res;
        })
        return datos;
    }

}

module.exports = CategoriasService;