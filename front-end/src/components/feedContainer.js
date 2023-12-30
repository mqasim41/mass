import Feed from '../components/feed';

function FeedContainer()
{
	return(
		<>
			<div className="row g-0">
				<div className="col-3">
					<Feed/>
				</div>
				<div className="col-3">
					<Feed/>
				</div>
				<div className="col-3">
					<Feed/>
				</div>
				<div className="col-3">
					<Feed/>
				</div>
			</div>
			<div className="row g-0">
				<div className="col-3">
					<Feed/>
				</div>
				<div className="col-3">
					<Feed/>
				</div>
				<div className="col-3">
					<Feed/>
				</div>
				<div className="col-3">
					<Feed/>
				</div>
			</div>
		</>
	);
}

export default FeedContainer;