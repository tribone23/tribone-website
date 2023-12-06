/** @format */
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { Col, Row, Container, Form } from "react-bootstrap";
import redirectLogo from "../assets/redirect.png";

const Redirect = () => {
  const location = useLocation();
  let redirectInfo = location.state || {};

  if (localStorage.getItem("isLogged") == "true") {
    const message = "Anda akan dialihkan...";
    redirectInfo.message = message;
  }

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      if (localStorage.getItem("isLogged") === "true") {
        navigate("/dashboard");
      }
    }, 3000);
  }, []);

  return (
    <>
      <Container className="mt-5">
        <Row
          style={{ marginTop: "100px" }}
          className="d-flex align-items-center justify-content-center h-100 md-5"
        >
          <Col className="col-md-8 col-lg-7 col-xl-6">
            <img
              className="img-fluid animate-img"
              style={{ width: "" }}
              src={redirectLogo}
              alt=""
            />
          </Col>
          <Col className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <Form className="fade-effect">
              <h2 className="mb-4 typing-effect animate-character login-info">
                {redirectInfo.message ? (
                  <>{redirectInfo.message}</>
                ) : (
                  <>Halaman tidak ditemukan</>
                )}
              </h2>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Redirect;
