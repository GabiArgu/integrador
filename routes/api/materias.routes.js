const express = require('express')

const router = express.Router()
//USamos el metodo para crear las rutas ROuter()

const {
    getMaterias,
    postMaterias,
    putMaterias,
    deleteMaterias,
    getMateria
} = require('../../controllers/materias.coontroller')




router.get('/', getMaterias)
router.post('/',  postMaterias)
router.put('/:id', putMaterias)
router.delete('/:id', deleteMaterias)
router.get('/:id', getMateria)


module.exports = router;