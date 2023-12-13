import React from 'react';
import Header from '../components/Header';
import Feed from '../components/Feed'; // Import the Feed component
import Map from '../components/Map';

const Dashboard = () => {
  return (
    <div>
      <Header />
      <h1 className="mt-5 display-5 text-center"> Dashboard </h1>
      <div className="row mt-3">
        <div className="col-9 p-4" style={{ border: '1px solid black', minHeight: '750px' }}>
          {/* Include the Feed component */}
          <Feed />
        </div>

        <div className="col-3" style={{ border: '1px solid black' }}>
          <Map />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
