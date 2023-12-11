/* eslint-disable jsx-a11y/anchor-is-valid */
const Header = () => 
{
  return (
    <div className="header row justify-content-between border-bottom p-4">
        <h1 className="display-2 mb-3"> M A S S</h1>
        <div className="col">
          <h3> Massively Available Surveillance System </h3>
        </div>
          <div className="col-4 col-align-self-end">
            <div className="navbar navbar-expand-md">
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse text-center" id="navbarNav">
                <ul className="navbar-nav text-center">
                  <a className="nav-link" href="#">Dashboard</a>
                  <a className="nav-link" href="#">Features</a>
                  <a className="nav-link" href="#">Settings</a>
                  <a className="nav-link" href="#">Logout</a>
                </ul>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Header