/** @format */

import { BrowserRouter as Router } from 'react-router-dom';
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';
import './App.css';

import AllRoute from './routes/AllRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <TawkMessengerReact propertyId="61854e406bb0760a49414ea8" widgetId="1fjobjbkg" />

        <AllRoute />
      </div>
    </Router>
  );
}

export default App;
