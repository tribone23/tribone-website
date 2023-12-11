import {useParams} from "react-router-dom";
import {Row, Col, Container} from "react-bootstrap";
import {useEffect} from "react";
import {db} from "../firebase";
export default function Linkshort() {
  const {id} = useParams();
  useEffect(() => {
    setTimeout(() => {
      let query = db.collection("urls").where("id", "==", id);
      query.onSnapshot((data) => {
        let linknge = data.docs[0].data();
        window.location.href = linknge.url;
      });
    }, 2000);
  }, []);

  return (
    <>
      <Container className='mt-5'>
        <Row
          style={{marginTop: "100px"}}
          className='d-flex align-items-center justify-content-center h-100 md-5'
        >
          <Col className='col-md-7 col-lg-5 col-xl-5 offset-xl-1'>
            <h2 className='mb-4 typing-effect animate-character login-info'>WAIT THE MINUTE</h2>
          </Col>
        </Row>
      </Container>
    </>
  );
}
