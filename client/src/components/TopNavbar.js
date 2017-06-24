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
  <li><Link to="/admin"><i className="fa fa-unlock-alt" aria-hidden="true" /></Link></li>
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
  <li><Link to="/signin"><i className="fa fa-sign-in" aria-hidden="true" /></Link></li>
);

const TopNavbar = (props) => {
  return (
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

        { props.showAuthItems ? <AuthLinks {...props} /> : null }

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

          { props.showAuthItems ? null : <SignInLink /> }
          
        </Nav>
      </Navbar>

      <nav id="mobile-nav" className="navbar navbar-default navbar-static-top" >
        <div id="mobile-container" className="container" style={{marginBottom: '10px'}}>
          <ul className="nav navbar-nav navbar-right">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/albums">Albums</Link></li>
            <li><Link to="/songs">Songs</Link></li>
            <li><Link to="/aotd">Instagram</Link></li>
            <li><Link to="/collection">Collection</Link></li>

            { props.showAuthItems ? null : <MobileSignInLink /> }
            { props.showAuthItems ? <MobileAdminLink {...props} /> : null }
            { props.showAuthItems ? <MobileSignOutLink {...props} /> : null }
          
          </ul>
        </div>
      </nav>

    </div>
  );
};

export default TopNavbar;
