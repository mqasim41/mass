import Login from "./pages/loginForm";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/registerForm";
import Dashboard from "./pages/dashboard";
import './styles/tailwind.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      	<Route path='/register' element={<Register/>}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
