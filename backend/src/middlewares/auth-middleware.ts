import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

//Par evitar errores de tipo , agregamos la propiedad user a Request
declare module 'express-serve-static-core' {
    interface Request {
        user?: any
    }
}

const SECRET_KEY = process.env.SECRET_KEY
//TS se asegura que SECRET_KEY no va a ser undefined
if (!SECRET_KEY) throw new Error("SECRET_KEY no está definido en .env");

//Verificamos que el token recibido sea valido
export function autenticacionToken(req: Request, res: Response, next: NextFunction) {
    //Buscamos el token en la cabecera
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    
    //Si el token no esta, avisa el error
    if (!token) {
        res.status(401).json({ error: 'Token not provided' })
        return
    }
    
    //verificamos que el token sea valido
    jwt.verify(token, SECRET_KEY as string, (err, user) => {
        if (err || !user) {
            res.status(403).json({ error: 'Token not valid' })
            return
        }
        
        req.user = user
        next()
    })
}