import Login from "./pages/loginForm";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/registerForm";
import Dashboard from "./pages/dashboard";
import './styles/tailwind.css';

// const PrivateRoute = ({ element: Element, ...rest }) => 
// {
//   const isAuthenticated = !!localStorage.getItem('accessToken');
//   return isAuthenticated ? <Element {...rest} /> : <Navigate to="/login" />;
// };

function App() {
  return (
    <BrowserRouter>
      <Routes>
      	<Route path='/register' element={<Register/>}/>
        <Route path="/login" element={<Login />}/>
      
        <Route path="/dashboard" element={<Dashboard />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
