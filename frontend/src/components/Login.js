import { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Typography, Box, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Login({ setToken, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  // Si la sesion ya estaba iniciada, redirige a mis quizzes
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/quizzes");
  }, [navigate]);

  //Cuenta regresiva del bloqueo
  useEffect(() => {
    if (timeLeft === 0) {
      setIsDisabled(false);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isDisabled) return;

    try {
      const res = await axios.post("http://localhost:3000/api/usuarios/login", { email, password });
      
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);

      const payload = JSON.parse(atob(res.data.token.split(".")[1]));
      setUser({ nombre: payload.nombre, apellido: payload.apellido });

      navigate("/quizzes");
    } catch (err) {
      console.error(err);

      if (err.response?.status === 429) { // demasiados intentos
        setIsDisabled(true);
        setTimeLeft(15 * 60); // 15 minutos en segundos
        setMensaje("Demasiados intentos. Intente más tarde.");
      } else {
        setMensaje("Error al iniciar sesión");
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #F3722C, #F8961E, #F9844A)",
        fontFamily: "Comic Sans MS, cursive",
      }}
    >
      <Box
        sx={{
          width: 400,
          p: 5,
          borderRadius: 3,
          backgroundColor: "#F9C74F",
          boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", color: "#D95D39" }}>
          Iniciar sesión
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{
              "& label": { color: "#D95D39" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#F9844A" },
                "&:hover fieldset": { borderColor: "#F3722C" },
                "&.Mui-focused fieldset": { borderColor: "#F94144" },
              },
            }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{
              "& label": { color: "#D95D39" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#F9844A" },
                "&:hover fieldset": { borderColor: "#F3722C" },
                "&.Mui-focused fieldset": { borderColor: "#F94144" },
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isDisabled}
            sx={{
              mt: 3,
              backgroundColor: "#F94144",
              "&:hover": { backgroundColor: isDisabled ? "#F94144" : "#F3722C" },
              fontWeight: "bold",
              color: "#fff",
            }}
          >
            {isDisabled ? `Intenta de nuevo en ${timeLeft} segundos` : "Iniciar sesión"}
          </Button>
        </form>

        {mensaje && (
          <Alert
            severity={mensaje.startsWith("Error") ? "error" : "success"}
            sx={{
              mt: 3,
              backgroundColor: mensaje.startsWith("Error") ? "#F94144" : "#90BE6D",
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            {mensaje}
          </Alert>
        )}

      {/*Boton para ir a la pagina de inicio */}
      <Button
        variant="outlined"
        fullWidth
        sx={{ mt: 2 }}
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/")}
      >
        Volver a inicio
      </Button>

      </Box>
    </Box>
  );
}