const express = require('express')
const router = express.Router()
//USamos el metodo para crear las rutas ROuter()
const {
  getAnuncios,
  postAnuncios,
  putAnuncios,
  deleteAnuncios,
  getAnuncio,
} = require("../../controllers/anuncios.controller");
const auth = require('../../middlewares/auth')



router.get('/', getAnuncios)
router.post('/',auth,  postAnuncios)
router.put('/:id',auth, putAnuncios)
router.delete('/:id',auth, deleteAnuncios)
router.get('/:id',auth, getAnuncio)


module.exports = router;