//importar controladores de los quizzes
import{ createQuiz, getQuizzes, getQuizById,updateQuiz, deleteQuiz } from '../controllers/quiz-controllers';
import {autenticacionToken}  from '../middlewares/auth-middleware'
import {Router} from 'express';

const router: Router= Router();

//Crear un quiz
router.post("/create", autenticacionToken, createQuiz)

//Listar todos los quizzes del usuario
router.get("/list", autenticacionToken,getQuizzes)

//Abrir un solo quiz
router.get("/show/:id", autenticacionToken,getQuizById )

//Editar un quiz
router.put("/edit/:id", autenticacionToken,updateQuiz )

//Eliminar un quiz
router.delete("/delete/:id", autenticacionToken, deleteQuiz )

export default router