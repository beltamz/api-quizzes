import{ registerUser, loginUser, getProfile } from '../controllers/auth-controllers';
import {autenticacionToken}  from '../middlewares/auth-middleware'
import {Router} from 'express';
import rateLimit from 'express-rate-limit';

const router: Router = Router()

//Crear usuario
router.post("/register", registerUser);

//Mostrar usuario
router.get('/profile', autenticacionToken, getProfile);

//Maximo intentos
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5, // máximo 5 intentos
    message: "Demasiados intentos de inicio de sesión. Intente más tarde.",
    standardHeaders: true,
    legacyHeaders: false
});

// Login con rate limiting
router.post("/login", loginLimiter, loginUser);

export default router;