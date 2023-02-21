import axios from 'axios'

const setAuthToken = token => {
    if(token){
        axios.defaults.headers.common['x-auth-token'] = token
        //Si existe token nos trae la cabecera del mismo
    } else {
        delete axios.defaults.headers.common['x-auth-token']
    }
}
//Aqui el usuario se autentica 

export default setAuthToken