import { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Box, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


export default function Register() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/usuarios/register", {
        nombre, apellido, email, password
      });
      setMensaje(res.data.message);
    } catch (err) {
      setMensaje("Error al registrarse");
      console.error(err);
    }
  };


  return (
  <Box
    sx={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #F3722C, #F8961E, #F9844A)", // mismo degradado que login
      fontFamily: "Comic Sans MS, cursive",
    }}
  >
    <Box
      sx={{
        width: 400,
        p: 5,
        borderRadius: 3,
        backgroundColor: "#F9C74F", // formulario más claro para resaltar
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
