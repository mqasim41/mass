import React, { useState, useEffect  } from 'react';
import Header from '../components/header';
import '../styles/styles.css';

function Configure()
{
	 useEffect(() => 
	 {
    // Set the title when the component mounts
    document.title = 'Add Configuration';

    // Optionally, clear the title when the component unmounts
    return () => 
    {
      document.title = 'Original Page Title';
    };
  }, []);

	  const [cameraName, setCameraName] = useState('');
	  const [cameraLocation, setCameraLocation] = useState('');
	  const [error, setError] = useState(null);
	  const handleSubmit = async (e) => 
  {
    e.preventDefault();
   try 
    {
      const response = await fetch('http://localhost:3003/configure', 
      {
        method: 'POST',
        headers: 
        {
          	'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cameraName, cameraLocation }),
        credentials: 'include', // Include credentials if needed
      });

      if (!response.ok) 
      {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Registration failed');
      }

      const data = await response.json();
      console.log(cameraName);
    } 
    catch (error)
    {
      setError(error.message);
      console.error('Error:', error);
    }
  };

	return(
	    <div className="bg-gray-400 text-white" style={{ minHeight: "100vh" }}>
		  <Header />
		  <h1 className="my-5 display-3 text-center">Add Configuration</h1>
		  <form onSubmit={handleSubmit} className="mt-5">
		    <div className="row justify-content-center">
		      <div className="col-3">
		        <div className="form-group">
		          <label htmlFor="cameraName" className="p-2">Camera Name</label>
		          <input type="text" className="form-control" id="cameraName" onChange={(e) => setCameraName(e.target.value)} required />
		        </div>
		      </div>
		    </div>

		    <div className="row justify-content-center">
		      <div className="col-3">
		        <div className="form-group">
		          <label htmlFor="cameraLocation" className="p-2">Camera Location</label>
		          <input type="text" className="form-control" id="cameraLocation" onChange={(e) => setCameraLocation(e.target.value)}
                required/>
		        </div>
		      </div>
		    </div>
		    <div className="row justify-content-center">
		      <div className="col-auto">
		        <button className="mt-5 btn btn-secondary bg-orange-400 px-4" type="submit">Add</button>
		      </div>
		    </div>
		  </form>
		</div>
	);
}

export default Configure;