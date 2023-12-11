import {Row, Col, Container} from "react-bootstrap";
import {useState, useEffect} from "react";
import {refid, db} from "../firebase";
export default function Short() {
  const [input, setInput] = useState();
  const [short, setShort] = useState();
  console.log(input);
  const handleDb = async () => {
    const id = refid(7);
    console.log(id);
    await db.collection("urls").add({
      url: input,
      id: id,
    });
    setShort(`${window.location.origin}/${id}`);
  };

  return (
    <>
      <Container className='mt-5 text-center'>
        <h2 style={{color: "white"}}>URL SHORTEN</h2>
        {short && (
          <Row className='mb-5'>
            <Col className='col-12'>
              <input
                className='form-control'
                type='url'
                value={short}
                readOnly
                onClick={async () => await navigator.clipboard.writeText(short)}
              />
            </Col>
          </Row>
        )}
        <Row>
          <Col className='col-12'>
            <input
              className='form-control'
              type='url'
              // value={input}
              placeholder='MASUKAN URL'
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              className='btn btn-primary m-5'
              onClick={handleDb}
              disabled={!input}
            >
              GENERATE URL
            </button>
          </Col>
        </Row>
      </Container>
    </>
  );
}
