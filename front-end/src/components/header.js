import { Link, useNavigate } from 'react-router-dom';
import {useEffect} from 'react';

function Header()
{

	const isAuthenticated = !!localStorage.getItem('accessToken');
	//const isAuthenticated = true;
	console.log(isAuthenticated);
	const navigate = useNavigate();
	useEffect(() => 
	{
	  if (!isAuthenticated) 
	    navigate('/login'); 
		}, [isAuthenticated, navigate]);
    const handleLogout = () => 
    {
      // Clear the access token from local storage
      localStorage.removeItem('accessToken');
      console.log('removed token');
    };

	return(
		<div className="">
		  <ul className="d-block nav nav-underline bg-secondary nav-secondary p-3 d-flex justify-content-between">
		    <div className="d-flex align-items-center">
		      <li className="nav-item px-2">
		         <Link className="nav-link text-white" to="../Dashboard" style={{ fontSize: '1rem' }}>Dashboard</Link>
		      </li>
		      <li className="nav-item px-2">
		         <Link className="nav-link text-white" to="../configure" style={{ fontSize: '1rem' }}>Add Configuration</Link>
		      </li>
		    </div>
		    <div className="d-flex align-items-center">
		      <Link className="nav-link" style={{ fontSize: '1.5rem', color:'orange' }} to="/login" onClick={handleLogout}>Logout</Link>
		    </div>
		  </ul>
		</div>

	);
}


export default Header;