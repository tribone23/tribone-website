/** @format */

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../styles/Jumbotron.css";
import gambarHome from "../assets/gambarhome.png";

export default function Jumbotron() {
  return (
    <>
      <section id='/'>
        <Container className='mt-5 mb-5'>
          <Row>
            <Col
              sm={10}
              md={6}
            >
              <h1 className='mt-5 typing-effect gradient-text'>Hola! We are Tribone</h1>
              <p className='mt-4 fade-effect lead gradient-text'>
                Selamat datang di Portal Mahasiswa Teknologi Rekayasa Internet Politeknik Elektronika Negeri Surabaya. Website ini merupakan portal
                khusus mahasiswa TRI yang dikembangkan oleh mahasiswa Teknologi Rekayasa Internet B 2023. Bersama-sama kita membangun Teknologi
                Rekayasa Internet menjadi lebih baik
              </p>

              <a
                className='btn btn-outline-warning m-2 fade-effect'
                href='/register'
              >
                Register
              </a>
              <a
                className='btn btn-outline-primary m-2 fade-effect'
                href='#About'
              >
                About us
              </a>
              <a
                className='btn btn-outline-success m-2 fade-effect'
                href='#Schedule'
              >
                Schedule
              </a>
              <a
                className='btn btn-outline-info m-2 fade-effect'
                href='#Picket'
              >
                Picket
              </a>
              <a
                className='btn btn-outline-danger m-2 fade-effect'
                href='/shortlinks'
              >
                SHORTLINK
              </a>
            </Col>

            <Col
              style={{display: "flex", justifyContent: "flex-end"}}
              md={5}
              className='text-center mt-5 fade-effect'
            >
              <img
                id='img-home'
                style={{width: "500px", height: "500px"}}
                src={gambarHome}
                alt=''
              />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
