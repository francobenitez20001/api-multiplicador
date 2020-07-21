const ArchivosModel = require('../database/Archivos');
const CloudStorage = require('../lib/CloudStorage');

class ArchivosService{
    constructor(){
        this.cloudStorage = new CloudStorage();
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

    async getArchivosByNota(idNota){
        const datos = await this.ArchivosModel.getByNota(this.collection,idNota).then(res=>{
            console.log(res);
            return res;
        });
        return datos;
    }

    async createArchivo(idNota,imagen){
        const datos = await this.ArchivosModel.create(this.collection,idNota,imagen).then(res=>{
            console.log(res);
            return res;
        })
        return datos;
    }

    async updateArchivo(archivo,id){
        const datos = await this.ArchivosModel.update(this.collection,archivo,id).then(res=>{
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

    async subirArchivosVarios(archivosArray,idNota){
        for (let index = 0; index < archivosArray.length; index++) {
            await this.cloudStorage.upload(archivosArray[index]).then( async link=>{
                await this.createArchivo(idNota,link).then(res => {
                    console.log('subido');
                }).catch(err => {
                    throw new Error(err);
                });
            });   
        }
        return;
    }

}

module.exports = ArchivosService;