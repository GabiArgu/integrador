import axios from 'axios'
import {GET_PROYECTOS,PROYECTO_ERROR, GET_PROYECTO}from './types'
//importamos los tipos de las acciones

export const getProyectos = () => async dispatch => {

    try {
        const res = await axios.get('/back/api/proyectos')
        //Realizamos la peticion get al back de proyectos  con axios(realiza peticiones http)
        console.log(res)
        dispatch({
            type: GET_PROYECTOS,
            payload: res.data.encontrados
        })
        //despachamos la accion que nos traera todos los proyecto encontrados
        
    } catch (err) {
        dispatch({
            type: PROYECTO_ERROR,
            payload: { 
                msg: err,
            }
        })
    }
}//En caso de error nos respondera especificando el mismo

export const getProyecto = id => async dispatch => {


    try {
        const res = await axios.get(`/back/api/proyectos/${id}`)
        //Para realizar peticion get de un solo proyecto especificamos el id del proyecto
        dispatch({
            type: GET_PROYECTO,
            payload: res.data
        })
        
    } catch (err) {
        dispatch({
            type: PROYECTO_ERROR,
            payload: { 
                msg: err,
            }
        })
        
    }
}