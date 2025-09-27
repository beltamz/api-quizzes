import {Request, Response, NextFunction} from 'express'

//Validamos cada valor pasado de cada quiz
export const validateQuiz=(req:Request, res: Response, next:NextFunction): void=>{
    const {titulo, descripcion, preguntas}= req.body

    //valido el titulo
    if(!titulo || typeof titulo !=='string'){
        res.status(400).json({error: "Field 'titulo' is required. It must be a string type"})
        return
    }

    //valido la descripcion
    if(!descripcion || typeof descripcion !=='string'){
        res.status(400).json({error: "Field 'descripcion' is required. It must be a string type"})
        return
    }

    //valido las preguntas
    if(!Array.isArray(preguntas)|| preguntas.length===0){
        res.status(400).json({error: "Field 'preguntas' is required."})
        return
    }

    //Mira cada objeto(pregunta, opciones,rtaCorrecta) que tengo en el array preguntas
    for (let i = 0; i < preguntas.length; i++) {
        const pregunta = preguntas[i];
        //Valido que haya un texto en pregunta, y que sea de tipo string
        if (!pregunta.texto || typeof pregunta.texto !== 'string') {
            res.status(400).json({ error: `Pregunta ${i + 1}: 'texto' is required and must be a string` });
            return;
        }
        //Valido el campo imagen
        if (!pregunta.imagen || typeof pregunta.imagen !== 'string') {
            res.status(400).json({ error: `Pregunta ${i + 1}: 'Imagen' is required and must be a string(link)` });
            return;
        }

        //Valido que las opciones sea un array, y que la cantidad minima de elementos sean 2
        if (!Array.isArray(pregunta.opciones) || pregunta.opciones.length < 2) {
            res.status(400).json({ error: `Pregunta ${i + 1}: 'opciones' must be an array with at least 2 options` });
            return;
        }
        //Valido que haya una rtaCorrecta, que sea de tipo string y que este dentro de las opciones
        if ( !pregunta.respuestaCorrecta || typeof pregunta.respuestaCorrecta !== 'string' ||
        !pregunta.opciones.includes(pregunta.respuestaCorrecta)) {
            res.status(400).json({ error: `Pregunta ${i + 1}: 'respuestaCorrecta' must be one of the provided options` });
            return;
        }
    }
    next()
}
