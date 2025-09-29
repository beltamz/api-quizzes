import { Box, Typography, Button, Stack } from "@mui/material";
import landingImage from "../assets/plant.gif"; 

export default function Landing() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 5,
        background: "linear-gradient(135deg, #F94144, #F3722C, #F8961E)",
        color: "#fff",
        fontFamily: "Comic Sans MS, cursive",
      }}
    >
      {/* Lado izquierdo: texto */}
      <Box sx={{ maxWidth: 500 }}>
        <Typography variant="h2" sx={{ fontWeight: "bold", mb: 3 }}>
          ¡Bienvenid@ a tu plataforma de quizzes!
        </Typography>
        <Typography variant="h5" sx={{ mb: 4 }}>
          Crea, juega y comparte tus quizzes favoritos.
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#F9844A",
              "&:hover": { backgroundColor: "#F9C74F" },
              color: "#fff",
              fontWeight: "bold",
              px: 4,
              py: 1.5,
            }}
            href="/login"
          >
            Iniciar sesión
          </Button>
          <Button
            variant="outlined"
            sx={{
              borderColor: "#90BE6D",
              color: "#fff",
              fontWeight: "bold",
              px: 4,
              py: 1.5,
              "&:hover": { borderColor: "#43AA8B", backgroundColor: "#43AA8B20" },
            }}
            href="/register"
          >
            Registrarse
          </Button>
        </Stack>
      </Box>

      {/* Lado derecho: imagen */}
      <Box sx={{ display: { xs: "none", md: "block" }, maxWidth: 500 }}>
        <img
          src={landingImage}
          alt="Quizzes"
          style={{ width: "100%", borderRadius: 20, boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}
        />
      </Box>
    </Box>
  );
}
