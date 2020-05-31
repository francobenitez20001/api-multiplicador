const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();


const {config} = require('./config/index');
//necesario agregar este middleware para que pueda entender datos en formato json.
app.use(express.json());

//importacion de rutas
const autoresApi = require('./routes/autores.js');
const categoriasApi = require('./routes/categorias');
const notasApi = require('./routes/notas');
const archivosApi = require('./routes/archivos');


//definicion de rutas
autoresApi(app);
categoriasApi(app);
notasApi(app);
archivosApi(app);

//static routes
app.use(express.static(path.join(__dirname,'public')))

app.listen(config.port,()=>{
    console.log(`listening http://localhost:${config.port}`);
})