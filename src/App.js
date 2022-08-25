import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes/Routes';

function App() {
  return (
    <BrowserRouter>
      <div className="bg-image">
        {/* <div className="bg-blur"> */}
        <Routes />
        {/* </div> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
