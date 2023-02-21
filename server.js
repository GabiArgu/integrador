//// "NOSEPORQUENOANDA "¯\_(ツ)_/¯" LOL   
const express = require('express')



const cors = require('cors')
//Requerimos Cors que es necesario para compartir recursos en distintos dominios
//Sirve para laseguridad de mis rutas


const defualt = require('./config/default.json');
//Exportamos todo el contenido de nuestro default.json


const app = express()



const PORT = defualt.PORT || 4000



app.use(cors())
//middleware funcion que se ejecuta antes o despues del majnejo de ruta
//tiene acceso al objeto req,res y la funcion next()



const usersRoutes = require('./routes/api/users')
const authRoutes = require('./routes/api/auth')
const profileRoutes = require('./routes/api/profile')
const postsRoutes = require('./routes/api/posts')
const proyectosRoutes = require('./routes/api/proyectos.routes')
const comunidadesRoutes = require('./routes/api/comunidades.routes')
//Importamos las diversas rutas 


const connectDB = require('./config/db')

//iniciamos el mware
app.use(express.json({extended : false}))
//Esto permite que express soporte formato json 

//conectamos a db
connectDB()
//test
app.get('/test', (req, res) => res.send('BEnd api rest activo') )

//routes

app.use('/api/users', usersRoutes)
app.use('/api/posts', postsRoutes)
app.use('/api/auth',  authRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/proyectos',proyectosRoutes)
app.use('/api/comunidades',comunidadesRoutes)


//asignamos el puerto en donde se iniciara el servidor
app.listen(PORT , () => {
   console.log(`servidor iniciado en el puerto: ${PORT}`)
})