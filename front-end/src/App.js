import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() 
{
  return (
    <Router>
      <Routes>
        <Route exact path="/dashboard" element={<Dashboard/>} />
        <Route path="/" element={<Login/>} />
      </Routes>
    </Router>
    
  );
}

export default App;
