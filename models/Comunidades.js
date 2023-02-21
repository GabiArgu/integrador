const  mongoose = require('mongoose')

const ComunidadSchema = new mongoose.Schema({
    nameComunidad : {
        type: String,
        required: true 
    },
    categoria: {
        type: String,
        required: true,
    },
    descripcion:{
        type:String
    },
    nameCreador : {
        type: String,
        required: true
    }
    
    
})

module.exports = Comunidad = mongoose.model('comunidad', ComunidadSchema)