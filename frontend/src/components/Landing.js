// Landing.jsx
/*import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        background: "linear-gradient(135deg, #F9DBBD, #FFA5AB)",
        padding: 3,
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontFamily: "Comic Sans MS, cursive",
          fontWeight: "bold",
          color: "#450920",
          mb: 2,
        }}
      >
        ¡Bienvenid@ a tu plataforma de quizzes!
      </Typography>

      <Typography
        variant="h5"
        sx={{
          fontFamily: "Arial, sans-serif",
          color: "#A53860",
          mb: 4,
        }}
      >
        Crea, juega y comparte tus quizzes favoritos.
      </Typography>

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center" }}>
        <Button
          component={Link}
          to="/login"
          variant="contained"
          sx={{
            backgroundColor: "#DA627D",
            "&:hover": { backgroundColor: "#A53860" },
            color: "#fff",
            px: 4,
            py: 1.5,
            fontWeight: "bold",
          }}
        >
          Iniciar sesión
        </Button>

        <Button
          component={Link}
          to="/register"
          variant="outlined"
          sx={{
            borderColor: "#DA627D",
            color: "#DA627D",
            "&:hover": { backgroundColor: "#DA627D", color: "#fff" },
            px: 4,
            py: 1.5,
            fontWeight: "bold",
          }}
        >
          Registrarse
        </Button>
      </Box>
    </Box>
  );
}*/

import { Box, Typography, Button, Stack } from "@mui/material";
import landingImage from "../assets/plant.gif"; // <-- coloca tu imagen en /src/assets/

export default function Landing() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 5,
        background: "linear-gradient(135deg, #F94144, #F3722C, #F8961E)", // degradado de la paleta
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
