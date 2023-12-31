import { Link } from 'react-router-dom';
// import io from 'socket.io-client';

function Alert({data})
{
	return(
		<Link to="{}">
			<div className="container bg-orange-500 mb-1 py-2 link" style={{borderRadius:'1rem'}}>
				  { data.message }
			</div>
		</Link>
	);
}

export default Alert;