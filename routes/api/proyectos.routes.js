const express = require('express')

const router = express.Router()
//USamos el metodo para crear las rutas ROuter()

const {
    getProyectos,
    postProyectos,
    putProyectos,
    deleteProyectos,
    getProyecto,
} = require('../../controllers/Proyectos.controller')




router.get('/', getProyectos)
router.post('/',  postProyectos)
router.put('/:id', putProyectos)
router.delete('/:id', deleteProyectos)
router.get('/:id', getProyecto)


module.exports = router;