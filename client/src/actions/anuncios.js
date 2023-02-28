import axios from 'axios'
import { setAlert } from './alert'
import { 
    GET_ANUNCIOS,
    GET_ANUNCIO,
    CLEAR_ANUNCIOS,
    ANUNCIOS_ERROR,
    DELETE_ANUNCIO,
    ADD_ANUNCIO,
} from "./types"; 

//Get anuncios
export const getAnuncios = () => async dispatch => {

    dispatch({type: CLEAR_ANUNCIOS})


    try {
        const res = await axios.get('/back/api/anuncios')

        dispatch({
            type: GET_ANUNCIOS,
            payload: res.data
        })
        
    } catch (err) {
        dispatch({
            type:  ANUNCIOS_ERROR,
            payload: { 
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}
//Get post
export const getAnuncio = id => async dispatch => {

    /* dispatch({type: CLEAR_PROFILE})
    dispatch({type: CLEAR_REPOS}) */

    try {
        const res = await axios.get(`/back/api/anuncios/${id}`)

        dispatch({
            type: GET_ANUNCIO,
            payload: res.data
        })
        
    } catch (err) {
        console.log(err)
        /* dispatch({
            type: POST_ERROR,
            payload: { 
                msg: err.response.statusText,
                status: err.response.status
            }
        }) */
    }
}

//Clear selected anuncios
export const clearAnuncios = () => {
    dispatch({
        type: CLEAR_ANUNCIOS,
        payload: null
    })
}

export const deleteAnuncios = (id) => async dispatch => {  

    try {

        await axios.delete(`/back/api/anuncios/${id}`)
    
        dispatch({
            type: DELETE_ANUNCIO,
            payload: id
        })

        dispatch(setAlert('Anuncio eliminado', 'success'))    
        
    } catch (err) {
        
        dispatch({
            type: ANUNCIOS_ERROR,
            payload: { 
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    } 
}

//Add Post
export const addAnuncios = formData => async dispatch => {

    const config = {headers : {'Content-Type':'application/json'}}

    try {
        
        const res = await axios.post(`/back/api/anuncios/`, formData, config)
    
        dispatch(setAlert('Anuncio creado', 'success'))
            
        dispatch({
            type: ADD_ANUNCIO,
            payload: res.data
        })

        
    } catch (err) {

        if(err.response){
            dispatch({
                type: ANUNCIOS_ERROR,
                payload: { 
                    msg: err.response.statusText,
                    status: err.response.status
                }
            })
        }
    }
}

