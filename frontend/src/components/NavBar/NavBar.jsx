import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { getToken, getUsername } from '../../utils/LocalStorageService.jsx';

const NavBar = () => {
  const history = useHistory();

  const linkOnClick = (e, link) => {
    e.preventDefault();
    history.push(link);
  };
  const handleLogOut = (e) => {
    e.preventDefault();
    window.localStorage.clear();
    history.push('/');
  };
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Brand>Memehub</Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {getToken() && (
              <Nav.Link href="/test" onClick={(e) => linkOnClick(e, '/test')}>
                Test
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            {getToken() && (
              <Nav.Link href="/images" onClick={handleLogOut}>
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
