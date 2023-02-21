const jwt = require('jsonwebtoken')
const defualt = require('../config/default.json');
//Exportamos todo el contenido de nuestro default.json

module.exports = function(req, res, next)  {
    //get token f. header obtenemos el header de nuestro token 
    const token = req.header('x-auth-token')
    //check token validacion de la existencia del token
    if(!token){
        return res.status(401).json({msg: 'no token, unauthorized' })
    }

    try {
        const decoded = jwt.verify(token,defualt.jwtSecret)
        //verificamos el token obtenido del front con mi frase secreta de mi back
        //Para validar token necesitamos esa clave por que es con la que se genera

        //agregamos usuario al req y pasamos al siguiente  mware.
        req.user = decoded.user 

        next()

    } catch (error) {
        res.status(401).json({msg: 'unvalid token'})
    }
    //En caso de erro retornamos mensaje 


}