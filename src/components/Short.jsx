import {Row, Col, Container} from "react-bootstrap";
import {useState, useEffect} from "react";
import {refid, db} from "../firebase";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validator from "validator";
export default function Short() {
  const [input, setInput] = useState();
  const [short, setShort] = useState();
  const [custom, setCustom] = useState(false);
  const [linkcustom, setLinkCustom] = useState();

  const showToastMessage = () => {
    toast.success("Copied Successfully", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const UrlSalah = () => {
    toast.error("enter valid url", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const handleCustom = () => {
    setCustom((custom) => !custom);
    setLinkCustom("");
  };

  const handleDb = async () => {
    let valid = input;
    const id = refid(7);
    console.log(linkcustom);
    if (!linkcustom) {
      if (!valid == "" && !valid.match(/^https?:\/\//i)) {
        valid = "https://" + valid;
      }
      if (validator.isURL(valid)) {
        await db.collection("urls").add({
          url: valid,
          id: id,
        });

        setShort(`${window.location.origin}/${id}`);
      } else {
        UrlSalah();
      }
    } else if (linkcustom) {
      if (!valid == "" && !valid.match(/^https?:\/\//i)) {
        valid = "https://" + valid;
      }
      if (validator.isURL(valid)) {
        await db.collection("urls").add({
          url: valid,
          id: linkcustom,
        });

        setShort(`${window.location.origin}/${linkcustom}`);
      } else {
        UrlSalah();
      }
    }
  };

  return (
    <>
      <Container className='mt-5 text-center fade-effect'>
        <h2
          style={{color: "white"}}
          className='animate-character'
        >
          URL SHORTEN
        </h2>
        {short && (
          <Row className='mb-5'>
            <Col className='col-12'>
              <input
                className='form-control'
                type='url'
                value={short}
                readOnly
                onClick={async () => {
                  await navigator.clipboard.writeText(short), showToastMessage();
                }}
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
              onChange={(e) => setInput(e.target.value.trim())}
            />
            <button
              className='btn btn-primary m-5'
              onClick={handleDb}
              disabled={!input}
            >
              GENERATE URL
            </button>

            <button
              className='btn btn-primary m-5'
              onClick={handleCustom}
            >
              {!custom ? "CUSTOM LINK" : "CLOSE"}
            </button>

            {custom && (
              <>
                <h5 style={{color: "white"}}>MASUKAN CUSTOM LINK</h5>
                <input
                  className='col-2 rounded'
                  type='url'
                  // value={input}
                  placeholder='MASUKAN URL'
                  onChange={(e) => setLinkCustom(e.target.value.trim())}
                />
              </>
            )}
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </>
  );
}
