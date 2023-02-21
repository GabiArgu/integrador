const comunidadesModelo = require('../models/Comunidades')
//Aqui importamos el modelo

//Ruta get para todos las comunidades
const getComunidades = async (req, res) => {
   //Creamos una funcion asincrona la cual va a esperar a que la bd nos traiga todos los datos del modelo
   const datos = await comunidadesModelo.find({})
   //Aqui retornamos un mensaje en formato json el cual nos traera todos los datos encontrados
   return res.json({
      mensaje: "comunidades enontradas",
      encontrados: datos
   })
}

//Ruta post para comunidades
const postComunidades = async (req, res) => {

   const {
      nameComunidad,
      categoria,
      descripcion,
      nameCreador
   } = req.body
//Traemos el cuerpo de nuestro modelo


   const newComunidad = new comunidadesModelo({
      nameComunidad,
      categoria,
      descripcion,
      nameCreador
   })
   //Creamos un nuevo modelo

   const VerificaNombre= await comunidadesModelo.findOne({
      nameComunidad: nameComunidad
   })
   if (VerificaNombre) {
      return res.json({
         message: "Esa comunidad ya fue registrada , agrega otro nombre :/"
      })
   }
   //Aqui estamos comparando los datos ingresados con los ya existentes
   //En caso de que exista arroja un mensaje

   try {
      const comunidad = await newComunidad.save()
      //Guardamos los datos ingresados 
      return res.status(201).json({
         message: "Comunidad guardada correctamente :D",
         comunidad
      })
      //Mostramos este mensaje

   } catch (error) {
      return res.status(401).json({
         message: "La comunidad no se ha podido crear :C",
         error: error
      })
   }
   //EN caso de error retorna el error

}

//Ruta put para proyecto
const putComunidades = async (req, res) => {
   //Tomamos el id de la comunidad a actualizar
   const {
      id
   } = req.params
   //Tomamos los datos del cuerpo del modelo
   const {
      nameComunidad,
      categoria,
      descripcion,
      nameCreador
   } = req.body
   //Constante update donde se guardas los datos actulizados
   const update = {}

   //Si existe este campo lo actualizaremos 
   if (nameComunidad) {
      update.nameComunidad = nameComunidad
   }
   if (categoria) {
      update.categoria = categoria
   }
   if (descripcion) {
      update.descripcion = descripcion
   }
   if (nameCreador) {
      update.nameCreador = nameCreador
   }
   
   //Si se cambiaron algunos de estos datos usaremos el metodo para realizar el put
   if (update.nameComunidad || update.categoria ||update.descripcion || update.nameCreador) {
      try {
         const comunidad = await comunidadesModelo.findByIdAndUpdate(id, update, {
            new: true
         })
         return res.json({
            mensaje: "comunidad actualizada",
            comunidad
         })

         //En caso de error arroja un json con el mensaje 
      } catch (error) {
         res.json({
            mensaje: "Error al actualizar comunidad"
         })
      }
   }

}

//Ruta delete para eliminar proyecto
const deleteComunidades = async (req, res) => {
   //Tomamos el id de la comunidad que queremos eliminar
   const {
      id
   } = req.params
   try {
      //ELiminamos la comunidad con dicho id
      await comunidadesModelo.findByIdAndDelete(id, {
         new: true
      })
      //REspondemos con un mensaje json
      res.json({
         mensaje: "Se elimino la comunidad"
      })
   }
   //En caso de error nos tira el mensaje de error
   catch (error) {
      res.json({
         mensaje: "Error al eliminar"

      })
   }
}

//Ruta para traer 1 comunidad
const getComunidad = async (req, res) => {
   //Tomamos el id de la comunidad que queremos traer y lo asignamos a una constante
   const {
      id
   } = req.params
console.log(id)
   try {
      //Traemos la comunidad la cual tenga dicho id que trajimos antes
      const comunidad1 = await comunidadesModelo.findOne({
         _id: id
      })
      //Respondemos con un mensaje json que nos muestra la comunidad
      res.json(comunidad1)
   } catch (error) {
      //En caso de error nos manda este mensaje en formato json
      console.log(error)
      res.json({
         mensaje: "Error al encontrar la comunidad"
      })

   }

}

//Exportamos los controladores
module.exports = {
   getComunidades,
   postComunidades,
   putComunidades,
   deleteComunidades,
   getComunidad
}
