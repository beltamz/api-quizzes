import mongoose, {Schema, Document} from "mongoose";
//Elementos de mi array pregunta 
const QuestionSchema= new mongoose.Schema({
    pregunta: {
        type: String,
        required: true
    },
    imagen: {
        type: String,
        required: false
    },
    opciones:[{
        type: String,
        required: true
    }],
    rtaCorrecta:{
        type: String,
        required: true
    }

})

export interface IntQuiz extends Document {
  title: string;
  description?: string;
  preguntas: typeof QuestionSchema[];
}

//Elementos de cada quiz
const QuizSchema= new mongoose.Schema({
    titulo:{
        type: String,
        required: true
    },
    descripcion:{
        type: String,
        required: false
    },
    preguntas: [QuestionSchema],
    creador: {
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    }
})

export default mongoose.model<IntQuiz>('Quiz', QuizSchema);
export { QuestionSchema };