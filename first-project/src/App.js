import React from 'react';
import Dashboard from './Component/Dashboard';
import Navigation from './Component/Navigation';
import "./index.css"


const App = () => {
  return (
    <div className="area" >
      <div className='allcontainer'>
        <div className='container-1'>
          <Navigation />
        </div>
        <div className='container-5'>
          <Dashboard />
        </div>
      </div>
    </div>
  )
}

export default App
