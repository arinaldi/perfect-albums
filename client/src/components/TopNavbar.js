import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

const AuthLinks = (props) => (
  <Nav pullRight>
    <LinkContainer to="/admin">
      <NavItem eventKey={7}><i className="fa fa-unlock-alt" aria-hidden="true" /></NavItem>
    </LinkContainer>
    <NavItem onClick={props.onSignOut}>
      <i className="fa fa-hand-peace-o" aria-hidden="true" />
    </NavItem>
  </Nav>
);

const MobileAdminLink = () => (
  <li>
    <Link to="/admin">
      <i className="fa fa-unlock-alt" aria-hidden="true" />
    </Link>
  </li>
);

const MobileSignOutLink = (props) => (
  <li onClick={props.onSignOut}>
    <Link to="#">
      <i className="fa fa-hand-peace-o" aria-hidden="true" />
    </Link>
  </li>
);

const SignInLink = () => (
  <LinkContainer to="/signin">
    <NavItem eventKey={6}>
      <i className="fa fa-sign-in" aria-hidden="true" />
    </NavItem>
  </LinkContainer>
);

const MobileSignInLink = () => (
  <li>
    <Link to="/signin">
      <i className="fa fa-sign-in" aria-hidden="true" />
    </Link>
  </li>
);

const TopNavbar = (props) => (
  <div>
    <Navbar inverse id="navigation">
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">
            <i className="fa fa-home" aria-hidden="true" />
            &nbsp;&nbsp;Perfect Albums&nbsp;&nbsp;
          </Link>
        </Navbar.Brand>
      </Navbar.Header>
      { props.showAuthItems && <AuthLinks {...props} /> }
      <Nav pullRight>
        <LinkContainer to="/albums">
          <NavItem eventKey={2}>Top Albums</NavItem>
        </LinkContainer>
        <LinkContainer to="/songs">
          <NavItem eventKey={3}>Perfect Songs</NavItem>
        </LinkContainer>
        <LinkContainer to="/aotd">
          <NavItem eventKey={4}>Album of the Day</NavItem>
        </LinkContainer>
        <LinkContainer to="/collection">
          <NavItem eventKey={5}>My Collection</NavItem>
        </LinkContainer>
        { !props.showAuthItems && <SignInLink /> }
      </Nav>
    </Navbar>
    <nav id="mobile-nav" className="navbar navbar-default navbar-static-top" >
      <div id="mobile-container" className="container" style={{marginBottom: '10px'}}>
        <ul className="nav navbar-nav navbar-right">
          <li>
            <Link to="/">
              <i className="fa fa-home" aria-hidden="true" />
            </Link>
          </li>
          <li>
            <Link to="/albums">
              <i className="fa fa-headphones" aria-hidden="true" />
            </Link>
          </li>
          <li>
            <Link to="/songs">
              <i className="fa fa-music" aria-hidden="true" />
            </Link>
          </li>
          <li>
            <Link to="/aotd">
              <i className="fa fa-instagram" aria-hidden="true" />
            </Link>
          </li>
          <li>
            <Link to="/collection">
              <i className="fa fa-database" aria-hidden="true" />
            </Link>
          </li>
          { !props.showAuthItems && <MobileSignInLink /> }
          { props.showAuthItems && <MobileAdminLink {...props} /> }
          { props.showAuthItems && <MobileSignOutLink {...props} /> }
        </ul>
      </div>
    </nav>
  </div>
);

export default TopNavbar;
