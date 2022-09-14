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
import AuthProvider from './AuthProvider.jsx';
import { useAuth } from '../contexts/index.js'

// eslint-disable-next-line react/prop-types
const LoginRoute = ({ children }) => {
  const auth = useAuth();

  return (
    auth.user ? <Navigate to="/" /> : children
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
        <Navbar bg="light" expand="lg" className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
          </Navbar>

          <Routes>
            <Route path="/login" element={<LoginRoute><Login /></LoginRoute>}>
            </Route>
            <Route path="/" element={<Navigate to="/login" />}>
            </Route>
            <Route path="*" element={<NoMatch />}>
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
    
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
