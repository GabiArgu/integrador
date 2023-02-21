//Archivo store es un objeto el cual va contener el estado de mi aplicacion

//.Permite el acceso al estado con getState();
//.Permite que el estado sea actualizado con dispatch(action);

import { createStore, applyMiddleware } from 'redux' 

import { composeWithDevTools } from 'redux-devtools-extension'
//funciona para administrar y centralizar el estado de una aplicación lo usamos para poder aplicar middlewares

import thunk from 'redux-thunk'
//Nos permite trabajar con logica async al momento de interactuar con el store
//

import rootReducer from './reducers'
//Importamos funcion reductora de mis reducers

const initialState = { }
//Estado inicial de nuestra aplicacion

const middleWare = [thunk]
//Asignamos el middleware thunk a esta constante


//Aqui estamos creando el store
const store = createStore(
    rootReducer, 
    //Aplicamos reducers
    initialState, 
    //Asignamos el estado inicial
    composeWithDevTools(applyMiddleware(...middleWare))
    //Aplicamos thunk en nuesto store 
    //Usamos operador spread(...) para que el contenido del array se esparza dentro  
)

export default store

