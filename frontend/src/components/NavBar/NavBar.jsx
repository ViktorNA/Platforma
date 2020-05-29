import React, { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { getToken, getUsername } from '../../utils/LocalStorageService.jsx';

const NavBar = () => {
  const history = useHistory();
  const [token, setToken] = useState(getToken());

  const linkOnClick = (e, link) => {
    e.preventDefault();
    history.push(link);
  };
  const handleLogOut = (e) => {
    e.preventDefault();
    window.localStorage.clear();
    setToken(null);
    history.push('/');
  };
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Brand>Platforma</Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {token && (
              <>
                <Nav.Link href="/test" onClick={(e) => linkOnClick(e, '/test')}>
                  Aim test
                </Nav.Link>
                <Nav.Link
                  href="/database"
                  onClick={(e) => linkOnClick(e, '/database')}
                >
                  Test results
                </Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            {token && (
              <Nav.Link href="/" onClick={handleLogOut}>
                {`${getUsername()}: LogOut`}
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
