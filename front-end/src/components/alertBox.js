import React, { useEffect, useState } from 'react'; 
import io from 'socket.io-client';
import Alert from './alert';

function AlertBox()
{

	const [alert, setAlert] = useState([]);

    useEffect(() => 
    {
	    const socket = io('http://localhost:3001', 
	    {
	      withCredentials: true, // You might need to include this based on your setup
	    });

	    socket.on('newAlert', (data) => 
	    {
      		// Update the latest alert data
      		setAlert(data);
        });

	    return () => 
	    {
	      socket.disconnect();
	    };

    }, []);

	return (
		<div className="bg-gray-900 mt-1 px-2" style={{ maxHeight:'20vw', overflowY:'auto'}}>
			<h2 className="mb-2 text-orange-600" style={{ fontSize:'1.5rem'}}> Alerts </h2>
			{alert && <Alert data={alert} />}
		</div>
	);
}

export default AlertBox;