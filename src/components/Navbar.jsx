/** @format */

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useState } from "react";
import "../styles/Navbar.css";

export default function NavBar() {
  const [navcolor, setNavcolor] = useState(false);

  const changeNavcolor = () => {
    if (window.scrollY >= 80) {
      setNavcolor(true);
    } else {
      setNavcolor(false);
    }
  };
  window.addEventListener("scroll", changeNavcolor);

  return (
    <>
      <Navbar
        bg={navcolor ? "black nav-color" : "transparent"}
        data-bs-theme="dark"
        key="lg"
        expand="lg"
        className="fixed-top navbar mx-5 "
      >
        <Container fluid>
          <Navbar.Brand href="/" className="navTitle">
            Tribone.
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={"offcanvasNavbar-expand-lg"} />
          <Navbar.Offcanvas
            id={"offcanvasNavbar-expand-lg"}
            aria-labelledby={"offcanvasNavbarLabel-expand-lg"}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={"offcanvasNavbarLabel-expand-lg"}>
                Tribone
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3 m-2 nav-sub">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="#About">About</Nav.Link>
                <Nav.Link href="#Schedule">Schedule</Nav.Link>
                <Nav.Link href="#piket">Picket</Nav.Link>
              </Nav>
              <Button
                className="m-1"
                as="a"
                href="/login"
                variant="outline-success"
              >
                Login
              </Button>
              <Button
                className="m-1"
                as="a"
                href="/register"
                variant="outline-info"
              >
                Register
              </Button>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}
