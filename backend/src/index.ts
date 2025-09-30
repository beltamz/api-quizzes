import 'dotenv/config';
import express, {Request, Response} from 'express';
import connectDB from './config/database';
import userRoutes from './routes/userRoutes';
import quizRoutes from './routes/quizRoutes';
import cors from 'cors';

const app= express()

app.use(cors({
    origin: 'http://localhost:3001', // frontend local
    credentials: true,
}));

app.use(express.json())

//Rutas
app.use('/api/usuarios', userRoutes)
app.use('/api/quizzes', quizRoutes)

connectDB()

//ruta que lee formato json
app.get("/", (req: Request,res: Response)=>{
    res.send("API funcionando");
})

//Inicio de servidor
const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`Servidor en http://localhost:${PORT}`);
})