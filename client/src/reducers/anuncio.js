
import {
    GET_ANUNCIOS,
    GET_ANUNCIO,
    CLEAR_ANUNCIOS,
    ANUNCIOS_ERROR,
    DELETE_ANUNCIO,
    ADD_ANUNCIO,
   
} from '../actions/types'

const initialState = {
    anuncios: [],
    anuncio: null,
    loading: true,
    error: {}
}

export default function(state = initialState, action){
    const {type, payload} = action

    switch(type){
        case GET_ANUNCIOS:
            return {
                ...state,
                anuncios: payload,
                loading: false
            }   
        case GET_ANUNCIO:
            return {
                ...state,
                anuncio: payload,
                loading: false
            }  
        case CLEAR_ANUNCIOS:
            return {
                ...state,
                anuncio: null,
                loading: false
            } 
        case ANUNCIOS_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case DELETE_ANUNCIO:
            return {
                ...state,
                anuncios: state.anuncios.filter
                (
                    item => item._id != payload
                ),
                loading: false
            }     
      
        case ADD_ANUNCIO:
            return {
                ...state,
                anuncios: [payload, ...state.anuncios],
                loading: false
            }  
        default:
            return state         
    }

}