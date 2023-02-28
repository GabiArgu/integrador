import {
   GET_PROYECTOS,
   GET_PROYECTO
} from '../actions/types'

const initialState = {
    proyectos:[],
    proyectoId:null,
    loading: true,
    error: {}
}
//Aqui asignamos el estado inicial donde vamos a pasar como datos secundarios
export default function(state = initialState, action){
    
    const {type, payload} = action
    //Definimos los atrivutos de action a utilizar
    
    switch(type){
        case GET_PROYECTOS:
            return {
                ...state,
                //Usamos operador spread(...) para que el contenido del state se esparza dentro  
                proyectos: payload,
                //Asignamos el contenido de nuestro payload a proyectos
                loading: false
                //una vez obtenidos los datos la carga termina
            }   
            case GET_PROYECTO:
                return {
                    ...state,
                    proyectoId: payload,
                    loading: false
                }  
        default:
            return state         
    }

}
