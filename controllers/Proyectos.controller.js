const proyectoModelo = require('../models/Proyectos')
//Aqui importamos el modelo

//Ruta get para todos los proyectos
const getProyectos = async (req, res) => {
   //Creamos una funcion asincrona la cual va a esperar a que la bd nos traiga todos los datos del modelo
   const datos = await proyectoModelo.find({})
   //Aqui retornamos un mensaje en formato json el cual nos traera todos los datos encontrados
   return res.json({
      mensaje: "proyectos enontrados",
      encontrados: datos
   })
}

//Ruta post para proyectos
const postProyectos = async (req, res) => {

   const {
      Nombre,
      Anio,
      Lenguajes,
      Empresa,
      Usuario,
   } = req.body
//Traemos el cuerpo de nuestro modelo


   const newProyecto = new proyectoModelo({
    Nombre,
    Anio,
    Lenguajes,
    Empresa,
    Usuario,
   })
   //Creamos un nuevo modelo

   const VerificaNombre= await proyectoModelo.findOne({
      Nombre: Nombre
   })
   if (VerificaNombre) {
      return res.json({
         message: "Ese proyecto ya fue registrado , agrega uno nuevo :/"
      })
   }
   //Aqui estamos comparando los datos ingresados con los ya existentes
   //En caso de que exista arroja un mensaje

   try {
      const proyecto = await newProyecto.save()
      //Guardamos los datos ingresados 
      return res.status(201).json({
         message: "Proyecto guardado correctamente :D",
         proyecto
      })
      //Mostramos este mensaje

   } catch (error) {
      return res.status(401).json({
         message: "El proyecto no se ha podido crear :C",
         error: error
      })
   }
   //EN caso de error retorna el error

}

//Ruta put para proyecto
const putProyectos = async (req, res) => {
   //Tomamos el id del proyecto a actualizar
   const {
      id
   } = req.params
   //Tomamos los datos del cuerpo del modelo
   const {
    Nombre,
    Anio,
    Lenguajes,
    Empresa,
    Usuario,
   } = req.body
   //Constante update donde se guardas los datos actualizados
   const update = {}

   //Si existe este campo lo actualizaremos 
   if (Nombre) {
      update.Nombre = Nombre
   }
   if (Anio) {
      update.Anio = Anio
   }
   if (Lenguajes) {
      update.Lenguajes = Lenguajes
   }
   if (Empresa) {
      update.Empresa = Empresa
   }
   if (Usuario) {
    update.Usuario = Usuario
 }
   //Si se cambiaron algunos de estos datos usaremos el metodo para realizar el put
   if (update.Nombre || update.Anio || update.Lenguajes || update.Empresa || update.Usuario) {
      try {
         const proyecto = await proyectoModelo.findByIdAndUpdate(id, update, {
            new: true
         })
         return res.json({
            mensaje: "proyecto actualizado",
            proyecto
         })

         //En caso de error arroja un json con el mensaje 
      } catch (error) {
         res.json({
            mensaje: "Error al actualizar proyecto"
         })
      }
   }

}

//Ruta delete para eliminar proyecto
const deleteProyectos = async (req, res) => {
   //Tomamos el id del proyecto que queremos eliminar
   const {
      id
   } = req.params
   try {
      //ELiminamos el proyecto con dicho id
      await proyectoModelo.findByIdAndDelete(id, {
         new: true
      })
      //REspondemos con un mensaje json
      res.json({
         mensaje: "Se elimino el proyecto"
      })
   }
   //En caso de error nos tira el mensaje de error
   catch (error) {
      res.json({
         mensaje: "Error al eliminar"

      })
   }
}

//Ruta para traer 1 proyecto
const getProyecto = async (req, res) => {
   //Tomamos el id del proyecto que queremos traer y lo asignamos a una constante
   const {
      id
   } = req.params
console.log(id)
   try {
      //Traemos el proyecto el cual tenga dicho id que trajimos antes
      const proyecto1 = await proyectoModelo.findOne({
         _id: id
      })
      //Respondemos con un mensaje json que nos muestra el proyecto
      res.json(proyecto1)
   } catch (error) {
      //En caso de error nos manda este mensaje en formato json
      console.log(error)
      res.json({
         mensaje: "Error al encontrar el proyecto"
      })

   }

}

//Exportamos los controladores
module.exports = {
   getProyectos,
   postProyectos,
   putProyectos,
   deleteProyectos,
   getProyecto
}
