import { Route, Routes } from "react-router-dom"
import { RegisterPage } from "./pages/register/registerPage"
import LoginPage from "./pages/login/loginPage"
import HomePage from "./pages/home/homePage"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/" element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  )
}

export default App
