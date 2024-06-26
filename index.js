
require('dotenv').config()
const routerTodos = require('./routes')
const bodyparser = require ('body-parser');

//Crear el servidor
const express = require('express')



const app = express() 
app.set('views','./src/views')
app.set('view engine', 'ejs')

app.use(express.json())

// middleware para parsear los datos del formulario 
app.use(bodyparser.urlencoded({extended:true}))

const PORT = process.env.port || 4000
routerTodos(app)

//Levantando el servidor para escuchar por el puerto 3000
app.listen(PORT, ()=> {
    console.log('Listening on port ' + PORT);
})