import 'dotenv/config';
import express, {Request, Response} from 'express';
import connectDB from './config/database';
import userRoutes from './routes/userRoutes';
import quizRoutes from './routes/quizRoutes';
import cors from 'cors';
import path from "path";

const app= express()

app.use(cors({
    origin: true, //! frontend local
    credentials: true,
}));

app.use(express.json())

//Rutas
app.use('/api/usuarios', userRoutes)
app.use('/api/quizzes', quizRoutes)

app.use(express.static(path.join(__dirname, '../../frontend/build')));

app.get(/^(?!\/api).*/, (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../frontend/build", "index.html"));
});

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