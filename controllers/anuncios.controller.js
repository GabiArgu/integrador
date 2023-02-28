const anunciosModelo = require('../models/Anuncios')
const userModelo = require('../models/User')
//Aqui importamos el modelo
const { validationResult } = require('express-validator')


//Ruta get para todos los anuncios
const getAnuncios = async (req, res) => {
   //Creamos una funcion asincrona la cual va a esperar a que la bd nos traiga todos los datos del modelo
   const datos = await anunciosModelo.find().sort({date:-1})
   res.json(datos)
   //Aqui retornamos un mensaje en formato json el cual nos traera todos los datos encontrados
   return res.json({
      mensaje: "anuncios enontrados",
   
   })
}

//Ruta post para anuncios
const postAnuncios = async (req, res) => {
   const errors = validationResult(req)
   
    
   if(!errors.isEmpty()){
       return res.status(400).json({errors: errors.array})
   }
 
   try {
       const user = await userModelo.findById(req.user.id).select('-password')
       //Buscamos un Id de acuerdo a la contraseña 
 
       const newAnuncio = {
           info: req.body.info,
           materia: req.body.materia,           
           name: user.name,
           avatar: user.avatar,
           user: req.user.id
       }
 
       const anuncio = new anunciosModelo(newAnuncio)
 
       await anuncio.save()
 
       res.json(anuncio)
 
   } catch (err) {
 
       console.error(err.message)
       
       res.status(500).send('Server Error')
   }
 

}

//Ruta put para anuncios
const putAnuncios = async (req, res) => {
   const { id } = req.params;
   const {info} = req.body;
   const actualizar = {};
 
 
   if (info) {
     actualizar.info = info;
   }
 
   if (
     actualizar.info 
   ){
     try {
       const anuncio = await anunciosModelo.findByIdAndUpdate(id, actualizar, {
         new: true,
       });
       return res.json({ msg: "El anuncio ha sido actualizado" });
     } catch (error) {
       return res.status(401).json({ msg: "Error al actualizar el anuncio" });
     }
   } else {
     res.status(401).json({
       msg: "No se enviaron datos",
     });
   }
 

}

//Ruta delete para eliminar anuncio
const deleteAnuncios = async (req, res) => {
   //Tomamos el id del anuncio que queremos eliminar
   const {
      id
   } = req.params
   try {
      //ELiminamos el anuncio con dicho id
      await anunciosModelo.findByIdAndDelete(id, {
         new: true
      })
      //REspondemos con un mensaje json
      res.json({
         mensaje: "Se elimino el anuncio"
      })
   }
   //En caso de error nos tira el mensaje de error
   catch (error) {
      res.json({
         mensaje: "Error al eliminar"

      })
   }
}

//Ruta para traer 1 anuncio
const getAnuncio = async (req, res) => {
   try {
        
      const anuncio = await anunciosModelo.findById(req.params.id)
      
      if(!anuncio) return res.status(404).json({msg: 'La publicación no existe'}) 
  
      res.json(anuncio)
  
  } catch (err) {
      
      console.error(err.message)
      
      if(err.kind === 'ObjectId'){
          return res.status(404).json({msg: 'El anuncio no existe'})
      }
  
      res.status(500).send('Server Error')
  }
  
}

//Exportamos los controladores
module.exports = {
   getAnuncios,
   postAnuncios,
   putAnuncios,
   deleteAnuncios,
   getAnuncio
}
