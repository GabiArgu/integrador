const  mongoose = require('mongoose')

const AnunciosSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    info:{
        type: String,
        required: true
    },
    materia: {
        type:String,
        required:true
    },
    name: {
        type: String
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = Anuncios = mongoose.model('anuncios', AnunciosSchema)