/** @format */
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Col, Row, Container, Form, Button } from "react-bootstrap";
import Navbarback from "../components/Navbarback";
import { ColorRing } from "react-loader-spinner";
import { checkUserToken } from "../hooks/AuthUser";
import loginVector from "../assets/login-vector.svg";
import axios from "axios";
import "../styles/Login.css";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [error, setError] = useState("");
  const [boxcek, setBoxcek] = useState("password");
  const location = useLocation();
  const locationState = location.state;
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      if (localStorage.getItem("isLogged") === "true") {
        navigate("/dashboard");
      }
    }, 3000);
  }, []);

  const handleChangeBox = () => {
    if (boxcek == "password") setBoxcek("text");
    else if (boxcek == "text") {
      setBoxcek("password");
    }
  };

  const handleChange = (e, type) => {
    switch (type) {
      case "email":
        setError("");
        setEmail(e.target.value);
        if (e.target.value === "") {
          setError("EMAIL TIDAK BOLEH KOSONG");
        }
        break;
      case "password":
        setError("");
        setPass(e.target.value);
        if (e.target.value === "") {
          setError("PASSWORD TIDAK BOLEH KOSONG");
        }
        break;
      default:
    }
  };

  async function submitLogin() {
    setLoading(true);

    if (email !== "" && password !== "") {
      let datapost = {
        email: email,
        password: password,
      };
      await axios
        .post("/login.php", datapost)
        .then(({ data }) => {
          localStorage.setItem("token", data.token);
          checkUserToken();
          setLoading(false);
          navigate("/redirect", {
            state: { message: "Anda akan segera login.." },
          });
        })
        .catch((err) => {
          setError(err.response.data.message);
          setLoading(false);
        });
    } else {
      alert("ISI DULU YANG LENGKAP");
    }
  }
  return (
    <>
      <Navbarback />
      <Container className="mt-5">
        <Row
          style={{ marginTop: "100px" }}
          className="d-flex align-items-center justify-content-center h-100 md-5"
        >
          <Col className="col-md-8 col-lg-7 col-xl-6">
            <img
              className="img-fluid animate-img"
              style={{ width: "" }}
              src={loginVector}
              alt=""
            />
          </Col>
          <Col className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <Form className="fade-effect">
              <h2 className="mb-4 typing-effect animate-character login-info">
                {locationState ? <>{locationState}</> : <>Silahkan login</>}
              </h2>
              {error !== "" ? (
                <h5 className="text-danger">{error}</h5>
              ) : (
                <h5 className="mb-4" style={{ color: "white" }}>
                  Masukkan Email dan Password anda
                </h5>
              )}

              <div className="form-outline mb-4">
                <Form.Control
                  type="email"
                  placeholder="Email (eg. arisu@iet.student.pens.ac.id)"
                  name="email"
                  onChange={(e) => handleChange(e, "email")}
                  value={email}
                />
              </div>
              <div className="form-outline mb-4">
                <Form.Control
                  type={boxcek}
                  placeholder="Password"
                  id="password"
                  name="password"
                  onChange={(e) => handleChange(e, "password")}
                  value={password}
                />
                <Form.Check // prettier-ignore
                  type="checkbox"
                  id="ShowPassword"
                  label="Show Password"
                  onClick={handleChangeBox}
                  className="mt-3"
                />

                {/* <div className='d-flex justify-content-around align-items-center mb-4'>
                <div className='form-check'>
                  <div> */}

                {/* </div> */}
                <div className="d-grid gap-2 mt-3">
                  <Button variant="primary" size="lg" onClick={submitLogin}>
                    {loading ? (
                      <>
                        <ColorRing
                          visible={true}
                          height="40"
                          width="40"
                          ariaLabel="blocks-loading"
                          wrapperStyle={{}}
                          wrapperClass="blocks-wrapper"
                          colors={[
                            "#e15b64",
                            "#f47e60",
                            "#f8b26a",
                            "#abbd81",
                            "#849b87",
                          ]}
                        />
                      </>
                    ) : (
                      <>Sign In</>
                    )}
                  </Button>
                </div>
              </div>
              {/* {login && (
                <Navigate to='/newdash' replace={true} />
              )} */}
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
