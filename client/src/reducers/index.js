import { combineReducers } from "redux";
import alert from './alert'
import auth from './auth'
import profile from './profile'
import post from './post'
import proyecto from './proyecto'
import anuncio from './anuncio'


export default combineReducers({
    alert,
    auth,
    profile,
    post,
    proyecto,
    anuncio
})
//En este archivo unimos en una sola funcion reductora todos mis reducers creados mediante combineReducers