const Feed = ( props) => 
{
  const css_styles={width:'30%', margin:'0', height:'300px', border:'1px solid black', padding:'0', backgroundColor:'lightgrey'};
  return (
    <div className="container">
        <div className="container-fluid" style={ css_styles }> 
        <b>Feed#</b> { props.ID } <b>Location:</b> {props.location}
        </div>

        <div className="container-fluid text-center">    
        </div>
    </div>
  )
}

export default Feed
