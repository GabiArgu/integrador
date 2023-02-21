
const {
    model,
    Schema,
} = require('mongoose');


const ProyectoSchema = new Schema({
    Nombre: {
        type: String,
        
    },
    Anio: {
        type: String,
        

    },
    Lenguajes: [{
        nombre: {
            type: String
        },
    }],
    Empresa: {
        type: String
    },
    Usuario: {
        type: String,
        
    }

})

module.exports = model('proyecto', ProyectoSchema);
