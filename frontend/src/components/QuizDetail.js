import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Box, Alert } from "@mui/material";

export default function QuizDetail() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [current, setCurrent] = useState(0); // índice de la pregunta actual
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null); // opción seleccionada
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `https://api-quizzes.onrender.com/api/quizzes/show/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setQuiz(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchQuiz();
  }, [id]);

  const handleAnswer = (opcion) => {
    setSelected(opcion);
    const question = quiz.preguntas[current];

    if (opcion === question.rtaCorrecta) {
      setScore(score + 1);
    }

    // Pasar a la siguiente pregunta después de 1.5 segundos
    setTimeout(() => {
      if (current + 1 < quiz.preguntas.length) {
        setCurrent(current + 1);
        setSelected(null); // reiniciamos la selección
      } else {
        setFinished(true);
      }
    }, 1500);
  };

  if (!quiz) return <Typography>Cargando...</Typography>;

  if (finished) {
    return (
      <Box sx={{ maxWidth: 600, mx: "auto", mt: 4, textAlign: "center" }}>
        <Typography variant="h4">¡Quiz terminado!</Typography>
        <Alert severity="info" sx={{ mt: 3 }}>
          Tu puntaje final: {score} de {quiz.preguntas.length}
        </Alert>
      </Box>
    );
  }

  const question = quiz.preguntas[current];

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Pregunta {current + 1} de {quiz.preguntas.length}
      </Typography>

      <Card>
        <CardContent>
          <Typography variant="h6">{question.pregunta}</Typography>

          {/* Imagen opcional */}
          {question.imagen && (
            <Box
              component="img"
              src={question.imagen}
              alt="Pregunta"
              sx={{
                width: "100%",
                maxHeight: 300,
                objectFit: "contain",
                my: 2,
                borderRadius: 2,
              }}
            />
          )}

          {/* Opciones como cajas clickeables */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 2 }}>
            {question.opciones.map((op, j) => {
              const isSelected = selected === op;
              const isCorrect = op === question.rtaCorrecta;

              let bgColor = "white";
              let borderColor = "grey.400";
              let icon = null;

              if (selected) {
                if (isSelected && !isCorrect) {
                  bgColor = "error.light";
                  borderColor = "error.main";
                  icon = "❌";
                } else if (isCorrect) {
                  bgColor = "success.light";
                  borderColor = "success.main";
                  icon = "✅";
                }
              }

              return (
                <Box
                  key={j}
                  onClick={() => !selected && handleAnswer(op)}
                  sx={{
                    p: 2,
                    border: "2px solid",
                    borderColor,
                    borderRadius: 2,
                    cursor: selected ? "default" : "pointer",
                    backgroundColor: bgColor,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    transition: "0.3s",
                  }}
                >
                  <Typography>{op}</Typography>
                  {icon && <Typography>{icon}</Typography>}
                </Box>
              );
            })}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}