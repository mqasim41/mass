import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormHeader from '../components/form_header';

const Register = () => 
{
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => 
  {
    e.preventDefault();
    const accessToken = localStorage.getItem('accessToken');
    try 
    {
      const response = await fetch('http://localhost:5000/api/register', 
      {
        method: 'POST',
        headers: 
        {
          	'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
        credentials: 'include', // Include credentials if needed
      });

      if (!response.ok) 
      {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Registration failed');
      }

      const data = await response.json();
      console.log(data); 
      // Redirect to another page or update state upon successful registration
      navigate('/login');
    } 
    catch (error)
    {
      setError(error.message);
      console.error('Error:', error);
    }
  };

  return (
  	<>
	  	< FormHeader />
	    <div className="row justify-content-center mt-5 p-5">
	      <div className="col-2 py-2">
	        <h2>Register</h2>
	        <form onSubmit={handleSubmit}>
	          <div className="form-group py-2">
	            <label htmlFor="username">Username:</label>
	            <input
	              className="form-control bg-secondary text-white"
	              type="text"
	              id="username"
	              value={username}
	              onChange={(e) => setUsername(e.target.value)}
	            />
	          </div>
	          <div className="form-group py-2">
	            <label htmlFor="email">Email:</label>
	            <input
	              className="form-control bg-secondary text-white"
	              type="email"
	              id="email"
	              value={email}
	              onChange={(e) => setEmail(e.target.value)}
	            />
	          </div>
	          <div className="form-group py-2">
	            <label htmlFor="password">Password:</label>
	            <input
	              className="form-control bg-secondary text-white"
	              type="password"
	              id="password"
	              value={password}
	              onChange={(e) => setPassword(e.target.value)}
	            />
	          </div>
	          <div className="">
	          	<button className="btn btn-outline-secondary mt-3" type="submit">Register</button>
	          	{error && <p style={{ color: 'red' }}>{error}</p>}
	          	</div>
	          	<div  className=" row mt-3">
	          		<Link to="/login" style={{fontSize:'1vw'}}>Already have an account?</Link>
	          	</div>
	        </form>
	      </div>
	    </div>
	  </>
  );
};

export default Register;
