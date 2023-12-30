import Alert from './alert';

function AlertBox()
{
	return (
		<div className="bg-gray-900 mt-1 px-2" style={{ maxHeight:'20vw', overflowY:'auto'}}>
			<h2 className="mb-2 text-orange-600" style={{ fontSize:'1.5rem'}}> Alerts </h2>
			<Alert/>
			<Alert/>
			<Alert/>
			<Alert/>
			<Alert/>
			<Alert/>
			<Alert/>
			<Alert/>
			<Alert/>
			<Alert/>
		</div>
	);
}

export default AlertBox;