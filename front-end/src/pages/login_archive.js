import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => 
{
  // States
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // function for handling submission
  const handleLogin = (e) => 
  {
    e.preventDefault();

    // checking if username and password are entered
    if (!password && !username)
    {
      setError("Please fill in the details");
      return;
    }

    // TODO: LOGIC HERE
    console.log(username + " " + password);
    // if login was successful, navigate to dashboard
    navigate('/dashboard');
  }

  return (
    <div> 
      <h1 className="mt-5 display-2 text-center border-bottom p-2"> Login </h1>

      <form onSubmit = {handleLogin} className="mt-5">
      <div className="row justify-content-center">
        <div className="col-auto">
          <label className="p-2"> Username </label>
          <input type="text" onChange={(e)=>setUsername(e.target.value)} />  
          </div>
      </div>
        <br/>
      <div className="row justify-content-center">
        <div className="col-auto">
          <label className="p-2"> Password </label>
          <input type="password" onChange={(e)=>setPassword(e.target.value)} /> 
          </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-auto">
          <button className="mt-5 btn btn-secondary" type="submit"> Submit</button>
        </div>
      </div>
      </form>
    </div>
  )
}

export default Login 