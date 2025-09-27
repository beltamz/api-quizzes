import 'dotenv/config';
import express, {Request, Response} from 'express';
import connectDB from './config/database';
import userRoutes from './routes/userRoutes';
import quizRoutes from './routes/quizRoutes'
import cors from 'cors';

const app= express()

app.use(cors({
    origin: 'http://localhost:3001', //puerto en donde corre React
    credentials: true
}));

app.use(express.json())
app.use('/api/usuarios', userRoutes)
app.use('/api/quizzes', quizRoutes)


const PORT = process.env.PORT || 3000

connectDB()

//ruta que lee formato json
app.get("/", (req: Request,res: Response)=>{
    res.send("API funcionando");
})

//Inicio de servidor
app.listen(PORT, ()=>{
    console.log(`Servidor en http://localhost:${PORT}`);
})