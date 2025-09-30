import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Box, Typography, TextField, Button, Grid } from "@mui/material";

export default function EditQuiz({ token }) {
  const { id } = useParams(); // id del quiz a editar
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [preguntas, setPreguntas] = useState([]);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(`/api/quizzes/show/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const quiz = res.data;
        setTitulo(quiz.titulo);
        setDescripcion(quiz.descripcion);
        setPreguntas(quiz.preguntas || []);
      } catch (err) {
        console.error(err);
        setMensaje("No se pudo cargar el quiz");
      }
    };

    fetchQuiz();
  }, [id, token]);

  const handlePreguntaChange = (index, campo, valor) => {
    const newPreguntas = [...preguntas];
    newPreguntas[index][campo] = valor;
    setPreguntas(newPreguntas);
  };

  const handleOpcionChange = (pIndex, oIndex, valor) => {
    const newPreguntas = [...preguntas];
    newPreguntas[pIndex].opciones[oIndex] = valor;
    setPreguntas(newPreguntas);
  };

  const addPregunta = () => {
    setPreguntas([...preguntas, { pregunta: "", imagen: "", opciones: ["", "", ""], rtaCorrecta: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `/api/quizzes/edit/${id}`,
        { titulo, descripcion, preguntas },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMensaje("Quiz actualizado correctamente!");
      // opcional: redirigir al listado de quizzes
      setTimeout(() => navigate("/quizzes"), 1000);
    } catch (err) {
      console.error(err);
      setMensaje("Error al actualizar el quiz");
    }
  };

  return (
    <Container maxWidth="md">
      <Box mt={5} p={3} boxShadow={3} borderRadius={2}>
        <Typography variant="h4" mb={3} align="center">Editar Quiz</Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Título"
            fullWidth
            margin="normal"
            value={titulo}
            onChange={e => setTitulo(e.target.value)}
            required
          />
          <TextField
            label="Descripción"
            fullWidth
            margin="normal"
            value={descripcion}
            onChange={e => setDescripcion(e.target.value)}
          />

          {preguntas.map((p, i) => (
            <Box key={i} mt={2} mb={2} p={2} border={1} borderRadius={2} borderColor="grey.300">
              <Typography variant="h6">Pregunta {i + 1}</Typography>

              <TextField
                label="Pregunta"
                fullWidth
                margin="normal"
                value={p.pregunta}
                onChange={e => handlePreguntaChange(i, "pregunta", e.target.value)}
                required
              />

              <TextField
                label="Link de imagen (opcional)"
                fullWidth
                margin="normal"
                value={p.imagen || ""}
                onChange={e => handlePreguntaChange(i, "imagen", e.target.value)}
              />

              <Grid container spacing={1}>
                {p.opciones.map((op, j) => (
                  <Grid item xs={12} sm={4} key={j}>
                    <TextField
                      label={`Opción ${j + 1}`}
                      fullWidth
                      value={op}
                      onChange={e => handleOpcionChange(i, j, e.target.value)}
                      required
                    />
                  </Grid>
                ))}
              </Grid>

              <TextField
                label="Respuesta correcta"
                fullWidth
                margin="normal"
                value={p.rtaCorrecta}
                onChange={e => handlePreguntaChange(i, "rtaCorrecta", e.target.value)}
                required
              />
            </Box>
          ))}

          <Button variant="outlined" color="secondary" onClick={addPregunta} sx={{ mr: 2 }}>
            Agregar Pregunta
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Guardar Cambios
          </Button>
        </form>

        {mensaje && <Typography color="success.main" mt={2}>{mensaje}</Typography>}
      </Box>
    </Container>
  );
}