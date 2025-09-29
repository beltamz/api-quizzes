// App.js
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate , useLocation} from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

// Componentes
import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import CreateQuiz from "./components/CreateQuiz";
import QuizzesList from "./components/QuizzesList";
import QuizDetail from "./components/QuizDetail";
import EditQuiz from "./components/EditQuiz";

// ---------------- Navbar ----------------
function Navbar({ token, user, setToken, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
    navigate("/"); // Redirige a Landing
  };

  return (
  <AppBar position="static" sx={{ 
    background: "linear-gradient(90deg, #F9844A, #F8961E)", 
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
}}>
  <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
    {/* Izquierda */}
    <Typography variant="h6" sx={{ 
        color: "#FFF", fontFamily: "Comic Sans MS, cursive", fontWeight: "bold" 
    }}>
      {user ? `Bienvenida/o, ${user.nombre} 👋`  : "Bienvenida"}
    </Typography>

    {/* Derecha */}
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {!token ? (
        <>
          <Button component={Link} to="/login" sx={{ 
              color: "#FFF9C74F", fontWeight: "bold", ml: 2,
              backgroundColor: "#F9C74F",
              "&:hover": { backgroundColor: "#F9844A", color: "#FFF" } 
          }}>
            Login
          </Button>
          <Button component={Link} to="/register" sx={{ 
              color: "#FFF9C74F", fontWeight: "bold", ml: 2,
              backgroundColor: "#F9C74F",
              "&:hover": { backgroundColor: "#F9844A", color: "#FFF" } 
          }}>
            Register
          </Button>
        </>
      ) : (
        <>
          <Button component={Link} to="/create" sx={{ 
              color: "#FFF", fontWeight: "bold", ml: 2,
              backgroundColor: "#F9C74F",
              "&:hover": { backgroundColor: "#F9844A" } 
          }}>
            Crear Quiz
          </Button>
          <Button component={Link} to="/quizzes" sx={{ 
              color: "#FFF", fontWeight: "bold", ml: 2,
              backgroundColor: "#F9C74F",
              "&:hover": { backgroundColor: "#F9844A" } 
          }}>
            Mis Quizzes
          </Button>
          <Button onClick={handleLogout} sx={{ 
              color: "#FFF", fontWeight: "bold", ml: 2,
              backgroundColor: "#F9C74F",
              "&:hover": { backgroundColor: "#F9844A" } 
          }}>
            Cerrar sesión
          </Button>
        </>
      )}
    </Box>
  </Toolbar>
</AppBar>
  );
}

// ---------------- App ----------------
function App() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      // Decodificar el token para obtener el nombre del usuario
      const payload = JSON.parse(atob(savedToken.split(".")[1]));
      setUser({ nombre: payload.nombre, apellido: payload.apellido });
    }
  }, []);

  return (
    <Router>
      <MainApp token={token} user={user} setToken={setToken} setUser={setUser} />
    </Router>
  );
}


// ---Main App
function MainApp({ token, user, setToken, setUser }) {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" && token && user &&(
        <Navbar token={token} user={user} setToken={setToken} setUser={setUser} />
      )}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login setToken={setToken} setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<CreateQuiz token={token} />} />
        <Route path="/quizzes" element={<QuizzesList token={token} />} />
        <Route path="/quizzes/:id" element={<QuizDetail token={token} />} />
        <Route path="/edit/:id" element={<EditQuiz token={token} />} />
        <Route path="*" element={<p>Página no encontrada</p>} />
      </Routes>
    </>
  );
}

export default App;