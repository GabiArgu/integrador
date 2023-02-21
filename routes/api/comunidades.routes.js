const express = require('express')

const router = express.Router()
//USamos el metodo para crear las rutas ROuter()

const {
    getComunidades,
    postComunidades,
    putComunidades,
    deleteComunidades,
    getComunidad
} = require('../../controllers/comunidades.controllers')




router.get('/', getComunidades)
router.post('/',  postComunidades)
router.put('/:id', putComunidades)
router.delete('/:id', deleteComunidades)
router.get('/:id', getComunidad)


module.exports = router;