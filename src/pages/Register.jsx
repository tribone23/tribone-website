/** @format */
import { useState, useEffect } from "react";
import "../styles/Register.css";
import { Col, Row, Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import { Dna } from "react-loader-spinner";
import regVector from "../assets/register-vector.svg";
import regVector2 from "../assets/registervector2.png";
import loginVector from "../assets/login-vector.svg";
import Navbarback from "../components/Navbarback";

const Login = () => {
  const [step, setStep] = useState(1);
  const [imageSlide, setImageSlide] = useState(1);
  const [nama, setNama] = useState("");
  const [nrp, setNrp] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [tri, setTri] = useState();
  const [register, setRegister] = useState(null);
  const [boxcek, setBoxcek] = useState("password");
  const handleChangeBox = () => {
    if (boxcek == "password") setBoxcek("text");
    else if (boxcek == "text") {
      setBoxcek("password");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setMsg("");
    }, 5000);
  }, [msg]);

  const handleChange = (e) => {
    e.preventDefault();
    setError("");
    setNrp(e.target.value);
    if (e.target.value === "") {
      setError("NRP/NIM TIDAK BOLEH KOSONG");
    }
  };
  const handleChangeRegister = (e, type) => {
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
        setPassword(e.target.value);
        if (e.target.value === "") {
          setError("PASSWORD TIDAK BOLEH KOSONG");
        }
        break;
    }
  };

  const cekNrp = (event) => {
    event.preventDefault();

    const triOnly = false;

    if (!triOnly) {
      setTri(true);
      handleNRPSubmit();
    } else {
      if (nrp >= 2423600031 && nrp <= 2423600060) {
        setTri(true);
        handleNRPSubmit();
      } else {
        setTri(false);
        setStep(2);
      }
    }
  };
  const handleNRPSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1/tribone-api/getDikti.php",
        { data: nrp },
      );
      let nama;

      const data = response.data.mahasiswa[0].text.split(",");
      nama = data[0].replace(/\s*\(.*?\)\s*/g, "");

      // console.log(nama, pt, prodi);
      setNama(nama);
      setLoading(false);
      setImageSlide(2);
    } catch (error) {
      console.log("Error", error);
      setLoading(false);
    } finally {
      setStep(2);
    }
  };

  const handleConfirmation = (confirmation) => {
    if (confirmation === "IYA") {
      setImageSlide(3);
      setStep(3);
    } else {
      setLoading(false);
      setImageSlide(1);
      setStep(1);
    }
  };

  async function handleRegister(e) {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await axios.post(
        "/register.php",
        {
          nrp: nrp,
          nama: nama,
          email: email,
          password: password,
        },
      );

      if (response.data.status == 200) {
        setRegister(response.data.message);
      }
      setLoading(false);
    } catch (error) {
      console.log(error.response.data.message);
      setError(error.response.data.message);
      setLoading(false);
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
            {imageSlide === 1 && (
              <img
                className="img-fluid fade-effect"
                id="animate-img"
                src={loginVector}
                alt=""
              />
            )}
            {imageSlide === 2 && (
              <img
                className="img-fluid effect-img fade-effect"
                id="effect-img"
                src={regVector}
                alt=""
              />
            )}
            {imageSlide === 3 && (
              <img
                className="img-fluid effect-img fade-effect"
                id="effect-img"
                src={regVector2}
                alt=""
              />
            )}
          </Col>
          <Col className="col-md-8 col-lg-7 col-xl-6">
            {step === 1 && (
              <Form>
                <h1 className="mb-4 typing-effect animate-character nrp-info">
                  Enter your NRP
                </h1>
                {error !== "" ? (
                  <div className="text-danger">{error}</div>
                ) : (
                  <h2 className="lead mb-3 nrp-info">{""}</h2>
                )}

                <div className="form-outline mb-4 fade-effect">
                  <Form.Control
                    type="number"
                    placeholder="Your NRP (e.g. 24236000xx)"
                    name="NRP"
                    onChange={(e) => handleChange(e, "NRP")}
                    value={nrp}
                  />
                </div>
                <div className="d-grid gap-2 fade-effect">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    onClick={cekNrp}
                  >
                    {loading ? (
                      <>
                        <Dna
                          visible={true}
                          height="40"
                          width="40"
                          ariaLabel="dna-loading"
                          wrapperStyle={{}}
                          wrapperClass="dna-wrapper"
                        />
                      </>
                    ) : (
                      <>Submit</>
                    )}
                  </Button>
                </div>
              </Form>
            )}
            {step === 2 && (
              <div className="fade-effect">
                <h2 className="mb-4" style={{ color: "white" }}>
                  {tri ? (
                    <>
                      Apakah nama anda<br></br>{" "}
                      <span className="mt-3 animate-character typing-effect register-info">
                        {nama}
                      </span>
                    </>
                  ) : (
                    <>Maaf, anda bukan mahasiswa TRI</>
                  )}
                </h2>
                <div className="d-grid gap-2">
                  {tri ? (
                    <>
                      <Button
                        variant="primary"
                        size="lg"
                        onClick={() => handleConfirmation("IYA")}
                      >
                        Continue Registration
                      </Button>
                      <Button
                        variant="primary"
                        size="lg"
                        onClick={() => handleConfirmation("TIDAK")}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="primary"
                        size="lg"
                        onClick={() => handleConfirmation("TIDAK")}
                      >
                        Back
                      </Button>
                    </>
                  )}
                </div>
              </div>
            )}
            {step === 3 && (
              <Form>
                <div className="form-outline mb-4 fade-effect">
                  <h2
                    className="mb-4 animate-character"
                    style={{ color: "white" }}
                  >
                    Satu langkah lagi..
                  </h2>
                  {error !== "" ? (
                    <h5 className="text-danger">{error}</h5>
                  ) : (
                    <h5 className="mb-4" style={{ color: "white" }}>
                      Masukkan Email dan buat Password
                    </h5>
                  )}

                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    onChange={(e) => handleChangeRegister(e, "email")}
                    value={email}
                    className="mt-3"
                  />
                  <Form.Control
                    type={boxcek}
                    placeholder="password"
                    name="password"
                    id="password"
                    onChange={(e) => handleChangeRegister(e, "password")}
                    value={password}
                    className="mt-3"
                    // Tambahkan fungsi onChange jika diperlukan
                  />
                  <Form.Check // prettier-ignore
                    type="checkbox"
                    id="ShowPassword"
                    label="Show Password"
                    onClick={handleChangeBox}
                    className="mt-3"
                  />
                </div>
                <div className="d-grid gap-2 fade-effect">
                  <Button variant="primary" size="lg" onClick={handleRegister}>
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
                      <>Register</>
                    )}
                  </Button>
                </div>
                {register && (
                  <Navigate to="/login" state={register} replace={true} />
                )}
              </Form>
            )}
            {step === 4 && (
              <div>
                <h2 style={{ color: "white" }}>APAKAH INI data kamu {nrp} ?</h2>
                <div className="d-grid gap-2">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => handleConfirmation("IYA")}
                  >
                    IYA
                  </Button>
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => handleConfirmation("TIDAK")}
                  >
                    TIDAK
                  </Button>
                </div>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Login;
