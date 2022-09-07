import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  Navigate,
} from "react-router-dom";
import Login from './Login.jsx';
import { Navbar } from 'react-bootstrap';

function App() {
  return (
    <Router>
      <div>
      <Navbar bg="light" expand="lg" className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
          <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
        </Navbar>

        <Routes>
          <Route path="/login" element={<Login />}>
          </Route>
          <Route path="/" element={<Navigate to="/login" />}>
          </Route>
          <Route path="*" element={<NoMatch />}>
          </Route>
        </Routes>
      </div>
    </Router>
  )
}


function NoMatch() {
  let location = useLocation();

  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

export default App;
