import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="bg-light text-center text-lg-start">
            <Container className="p-4">
                <div className="text-center">
                    © {new Date().getFullYear()} Your Name. All rights reserved.
                </div>
            </Container>
        </footer>
    );
}

export default Footer;
