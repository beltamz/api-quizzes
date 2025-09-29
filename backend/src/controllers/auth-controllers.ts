//--------------------------Controladores para el registro y log in del usuario---------------------------------
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/user'

//Me salia un error de tipo al querer usar .user mas abajo, asi que le extiendo la propiedad user a Request de tipo any
interface AuthRequest extends Request {
    user?: any
}

const SECRET_KEY = process.env.SECRET_KEY
//TS se asegura que SECRET_KEY no va a ser undefined
if (!SECRET_KEY) throw new Error("SECRET_KEY no está definido en .env");


//---Controlador de registro de usuario
export const registerUser = async (req: Request, res: Response) => {
    //Separamos el cuerpo de la solicitud http en nombre, apellido, email y password. Chequeamos que no esten vacios los campos
    const { nombre, apellido ,email, password } = req.body

    if (!nombre|| !apellido || !email || !password) {
        res.status(400).json({ error: 'Complete the missing field(s)' })
        return
    }
    //chequeamos si ya existia tal usuario
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'The email is already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ nombre, apellido, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}

//--- Controlador de ingreso de usuario
export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body

    if (!email || !password) {
        res.status(400).json({ error: 'The user didnt complete one or both field(s)' })
        return
    }
    //Si al leer ntra base de datos, no encuentra al user pasado, indica usuario no encontrado
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'User not found' });

        //Verificamos si el usuario está bloqueado por multiples intentos de inicio de sesion
        if (user.lockUntil && user.lockUntil > new Date()) {
            const remaining = Math.ceil((user.lockUntil.getTime() - Date.now()) / 1000);
            return res.status(429).json({ error: `Cuenta bloqueada. Intenta de nuevo en ${remaining} segundos` });
        }
        //Si no esta bloqueado el usuario, compara las contraseñas hasheadas
        const isPasswordValid = await bcrypt.compare(password, user.password);

        //Si la contraseña no es valida, empieza el conteo de intentos
        if (!isPasswordValid) {
            user.loginAttempts = (user.loginAttempts || 0) + 1;

            // Bloqueo del usuario después de 5 intentos fallidos
            if (user.loginAttempts >= 5) {
                user.lockUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos de bloqueo
                user.loginAttempts = 0; // reseteamos el contador
            }

            await user.save();
            return res.status(401).json({ error: 'Incorrect password' });
        }

        // Si el login es exitoso reseteo intentos y lockUntil
        user.loginAttempts = 0;
        user.lockUntil = null;
        await user.save();


        //Genero el token
        const token = jwt.sign(
            { id: user._id, email: user.email, nombre: user.nombre, apellido: user.apellido },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.json({ message: 'Login successful', token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}

//---Controlador que devuelve datos del usuario que inició sesion
export const getProfile = (req: AuthRequest, res: Response) => {
    res.json({ message: `Welcome ${req.user.nombre}`, user: req.user })//uso la propiedad user que extendi de req
}