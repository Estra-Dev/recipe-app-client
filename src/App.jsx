import Register from "./pages/Register"
import Login from "./pages/Login"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Nav from "./components/Nav"
import Home from "./pages/Home"
import CreateRecipes from "./pages/CreateRecipes"
import SavedRecipes from "./pages/SavedRecipes"

function App() {

  return (
    <Router>
      <>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-recipe" element={<CreateRecipes />} />
          <Route path="/saved-recipe" element={<SavedRecipes />} />
        </Routes>
      </>
    </Router>
  )
}

export default App
