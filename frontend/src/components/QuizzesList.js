import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Button, Stack, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

function QuizzesList({ token }) {
  const [quizzes, setQuizzes] = useState([]);
  const navigate= useNavigate();

  useEffect(() => { 
    const fetchQuizzes = async () => {
      try {
        const res = await axios.get("https://api-quizzes.onrender.com/api/quizzes/list", { headers: { Authorization: `Bearer ${token}` } });
        setQuizzes(res.data);
      } catch (err) {
        console.error(err);
      }
    }; 

    fetchQuizzes();
  }, [token]);

   const handleDelete = async (quizId) => {
    if (!window.confirm("¿Estás segura de que quieres eliminar este quiz?")) return;

    try {
      await axios.delete(`https://api-quizzes.onrender.com/api/quizzes/delete/${quizId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Actualizamos la lista localmente
      setQuizzes((prev) => prev.filter((q) => q._id !== quizId));
      alert("Quiz eliminado correctamente");
    } catch (err) {
      console.error(err);
      alert("No se pudo eliminar el quiz");
    }
  };

  return (
    <Stack spacing={3} sx={{ mt: 5, mx: "auto", maxWidth: 700 }}>
  {quizzes.map((q) => (
    <Card 
      key={q._id} 
      sx={{ 
        backgroundColor: "#fff",
        borderRadius: 3, 
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)", 
        transition: "transform 0.2s",
        "&:hover": { transform: "scale(1.03)" } 
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
          {q.titulo}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 } }>
          {q.descripcion}
        </Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          {/*Boton para abrir un quiz*/}
          <Button 
            component={Link} 
            to={`/quizzes/${q._id}`} 
            variant="contained" 
            sx={{ 
              backgroundColor: "#F9C74F", 
              color: "#fff",
              "&:hover": { backgroundColor: "#F9844A" }
            }}
          >
            Abrir Quiz
          </Button>

          {/*Boton para editar un quiz*/}
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate(`/edit/${q._id}`)}
          >
            Editar
          </Button>

          {/*Boton para eliminar un quiz*/}
          <Button 
            onClick={() => handleDelete(q._id)} 
            variant="outlined" 
            sx={{ 
              color: "#F94144", 
              borderColor: "#F94144",
              "&:hover": { backgroundColor: "#F94144", color: "#fff" } 
            }}
          >
            Eliminar
          </Button>
        </Box>
      </CardContent>
    </Card>
  ))}
</Stack>
  );
}

export default QuizzesList;