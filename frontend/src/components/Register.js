import { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Typography, Box, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Register({ token }) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("success"); // "success" o "error"
  const [verificando, setVerificando] = useState(true); // Para mostrar carga inicial
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/quizzes");
    } else {
      setVerificando(false);
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://api-quizzes.onrender.com/api/usuarios/register", {
        nombre,
        apellido,
        email,
        password,
      });

      setMensaje(res.data.message);
      setTipoMensaje("success");

      // Limpiar formulario
      setNombre("");
      setApellido("");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.error) {
        setMensaje(err.response.data.error);
      } else {
        setMensaje("Error al registrar el usuario");
      }
      setTipoMensaje("error");
    }
  };

  if (verificando) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Comic Sans MS, cursive",
        }}
      >
        <Typography variant="h6" sx={{ color: "#D95D39" }}>
          Verificando sesión...
        </Typography>
      </Box>
    );
  }

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
          Registrarse
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nombre"
            fullWidth
            margin="normal"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
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
            label="Apellido"
            fullWidth
            margin="normal"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
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
            sx={{
              mt: 3,
              backgroundColor: "#F94144",
              "&:hover": { backgroundColor: "#F3722C" },
              fontWeight: "bold",
              color: "#fff",
            }}
          >
            Registrarse
          </Button>
        </form>

        {mensaje && (
          <Alert
            severity={tipoMensaje}
            sx={{
              mt: 3,
              backgroundColor: tipoMensaje === "error" ? "#F94144" : "#90BE6D",
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            {mensaje}
          </Alert>
        )}

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
