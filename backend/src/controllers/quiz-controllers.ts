//--------------------------Controladores de los quizzes------------------------------------------
import { Request, Response } from 'express'
import Quiz from '../models/quiz'

//---Controlador para crear el quiz
export const createQuiz = async (req: Request, res: Response) => {
    const { titulo, descripcion, preguntas } = req.body;

    if (!titulo || !preguntas) {
        res.status(400).json({ error: 'Complete the missing field(s)' });
        return;
    }

    try {
        const creadorId = req.user.id;

        //Valido cada pregunta
        for (const pregunta of preguntas) {
            if (!pregunta.pregunta || !pregunta.opciones || pregunta.opciones.length < 2) {
                const error = new Error("Each question needs text and at least two options");
                error.name = "ValidationError";
                throw error;
            }

            if (!pregunta.opciones.includes(pregunta.rtaCorrecta)) {
                const error = new Error(
                    `The correct answer "${pregunta.rtaCorrecta}" is not among the options for question "${pregunta.pregunta}"`
                );
                error.name = "ValidationError";
                throw error;
            }
        }

        const newQuiz = new Quiz({ titulo, descripcion, preguntas, creador: creadorId });
        await newQuiz.save();

        res.status(201).json({ message: 'Quiz created successfully' });

    } catch (error: any) {
        console.error(error);
        if (error.name === "ValidationError") {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Unexpected error creating the quiz" });
        }
    }
};


//---Controlador para mostrar todos los quizzes
export const getQuizzes = async (req: Request, res: Response)=>{
    try {
        //Solo muestro aquellos quizzes que sean creados por el usuario solicitante
        const creadorId= req.user.id;
        const quizzes = await Quiz.find({creador: creadorId});

        if(!quizzes || quizzes.length===0){
            return res.status(404).json({message: 'No quizzes found'})
        }

        res.status(200).json(quizzes);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Couldn't get the quizzes"})
    }
}

//---Controlador para cuando un usuario abra un quiz
export const getQuizById = async (req: Request, res: Response)=>{
    try {
        const creadorId= req.user.id;
        const quizId = req.params.id;
        //Busco el quiz que coincida con el id del quiz y con el creador
        const quiz= await Quiz.findOne({_id: quizId, creador: creadorId});

        if(!quiz){
            return res.status(404).json({message: 'Quiz not found'})
        }

        res.status(200).json(quiz);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Couldn't get the quiz"})
    }
}

//---Controlador para editar los quizzes
export const updateQuiz= async (req: Request, res: Response)=>{
    try {
        const creadorId= req.user.id;
        const quizId = req.params.id;
        const updates = req.body;

        const updatedQuiz = await Quiz.findOneAndUpdate(
            { _id: quizId, creador: creadorId }, //Busca el id del quiz que coincida, pero que a la vez el creador sea el usuario logueado
            { $set: updates },                    //campos que voy a actualizar
            { new: true, runValidators: true }    //devuelve el documento actualizado y valida el esquema
        );

        if (!updatedQuiz) {
        return res.status(404).json({ message: 'Quiz not found or not authorized' });
        }

        res.status(200).json({ message: 'Quiz updated successfully', quiz: updatedQuiz });

    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Couldn't save the changes"})
    }
}

//---Controlador para eliminar un quiz
export const deleteQuiz= async (req:Request, res: Response)=>{
    try {
        const creadorId= req.user.id;
        const quizId = req.params.id;
        //Busco que coincida el id del quiz y del usuario creador
        const deletedQuiz= await Quiz.findOneAndDelete(
            { _id: quizId, creador: creadorId }
        )
        if (!deletedQuiz) {
            return res.status(404).json({ message: 'Quiz not found or not authorized' });
        }

        res.status(200).json({ message: 'Quiz deleted successfully'});

    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Couldn't delete the quiz"})
    }
}