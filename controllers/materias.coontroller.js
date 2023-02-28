const materiasModelo = require('../models/Materia')
//Aqui importamos el modelo

//Ruta get para todos las materias
const getMaterias = async (req, res) => {
   //Creamos una funcion asincrona la cual va a esperar a que la bd nos traiga todos los datos del modelo
   const datos = await materiasModelo.find({})
   //Aqui retornamos un mensaje en formato json el cual nos traera todos los datos encontrados
   return res.json({
      mensaje: "materias enontradas",
      encontrados: datos
   })
}

//Ruta post para materias
const postMaterias = async (req, res) => {

   const {
     nameUser,
     nameMateria
   } = req.body
//Traemos el cuerpo de nuestro modelo


   const newMateria = new materiasModelo({
      nameUser,
      nameMateria
   })
   //Creamos un nuevo modelo

   try {
      const materia = await newMateria.save()
      //Guardamos los datos ingresados 
      return res.status(201).json({
         message: "Materia guardada correctamente :D",
         materia
      })
      //Mostramos este mensaje

   } catch (error) {
      return res.status(401).json({
         message: "La materia no se ha podido crear :C",
         error: error
      })
   }
   //EN caso de error retorna el error

}

//Ruta put para materias
const putMaterias = async (req, res) => {
   //Tomamos el id de la materia a actualizar
   const {
      id
   } = req.params
   //Tomamos los datos del cuerpo del modelo
   const {
      nameUser,
      nameMateria
   } = req.body
   //Constante update donde se guardas los datos actualizados
   const update = {}

   //Si existe este campo lo actualizaremos 
   if (nameUser) {
      update.nameUser = nameUser
   }
   if (nameMateria) {
      update.nameMateria = nameMateria
   }
   

   //Si se cambiaron algunos de estos datos usaremos el metodo para realizar el put
   if (update.nameUser || update.nameMateria) {
      try {
         const materia = await materiasModelo.findByIdAndUpdate(id, update, {
            new: true
         })
         return res.json({
            mensaje: "materia actualizada",
            materia
         })

         //En caso de error arroja un json con el mensaje 
      } catch (error) {
         res.json({
            mensaje: "Error al actualizar materia"
         })
      }
   }

}

//Ruta delete para eliminar materias
const deleteMaterias = async (req, res) => {
   //Tomamos el id de la materia que queremos eliminar
   const {
      id
   } = req.params
   try {
      //ELiminamos la materia con dicho id
      await materiasModelo.findByIdAndDelete(id, {
         new: true
      })
      //REspondemos con un mensaje json
      res.json({
         mensaje: "Se elimino la materia"
      })
   }
   //En caso de error nos tira el mensaje de error
   catch (error) {
      res.json({
         mensaje: "Error al eliminar"

      })
   }
}

//Ruta para traer 1 materia
const getMateria = async (req, res) => {
   //Tomamos el id de la materia que queremos traer y lo asignamos a una constante
   const {
      id
   } = req.params
console.log(id)
   try {
      //Traemos la materia la cual tenga dicho id que trajimos antes
      const materia1 = await materiasModelo.findOne({
         _id: id
      }).populate('user',  ['name'])
      //Respondemos con un mensaje json que nos muestra la materia
      res.json(materia1)
   } catch (error) {
      //En caso de error nos manda este mensaje en formato json
      console.log(error)
      res.json({
         mensaje: "Error al encontrar la materia"
      })

   }

}

//Exportamos los controladores
module.exports = {
   getMaterias,
   postMaterias,
   putMaterias,
   deleteMaterias,
   getMateria
}
