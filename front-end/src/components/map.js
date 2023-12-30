import map from "../static/map.png"
function Map()
{
	return (
		<div className="bg-gray-600" style={{ height:'20vw'}}>
			<img src={map}/>
		</div>
	);
}

export default Map;