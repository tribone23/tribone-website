/** @format */

import { Button, Navbar, Container } from "react-bootstrap";

export default function Navbarback() {
  return (
    <>
      <Navbar
        bg="transparent"
        data-bs-theme="dark"
        key="lg"
        expand="lg"
        className="navbar mx-5"
      >
        <Container fluid>
          <Navbar.Brand
            href="/"
            className="text-end 
          navTitle text-end"
          >
            Tribone.
          </Navbar.Brand>
        </Container>
        <Button as="a" href="/" variant="outline-success">
          Home
        </Button>
      </Navbar>
    </>
  );
}
