import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Header = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">
                    <img
                        src="./images/bg2-fields.png"
                        height="50"
                        className="d-inline-block align-top"
                        alt="your-logo"
                    />
                    {' '}
                    <strong>Your Portfolio Title</strong>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#experiences">Experiences</Nav.Link>
                        <Nav.Link href="#formations">Formations</Nav.Link>
                        <Nav.Link href="#projet">Projet</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
