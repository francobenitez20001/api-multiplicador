const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const {config} = require('./config/index');
//necesario agregar este middleware para que pueda entender datos en formato json.
app.use(express.json());

//importacion de rutas
const autoresApi = require('./routes/autores.js');
const categoriasApi = require('./routes/categorias');

//definicion de rutas
// app.get('/',(req,res)=>{
//     res.send('hola')
// })
autoresApi(app);
categoriasApi(app);

app.listen(config.port,()=>{
    console.log(`listening http://localhost:${config.port}`);
})