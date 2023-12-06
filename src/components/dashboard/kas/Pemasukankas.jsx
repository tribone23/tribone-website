import { Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

export const Pemasukankas = () => {
  const [total_agustus, setTotalagustus] = useState();
  const [total_september, setTotalseptember] = useState();
  const [total_oktober, setTotaloktober] = useState();
  const [total_november, setTotalnovember] = useState();
  const [total_desember, setTotaldesember] = useState();

  useEffect(() => {
    setTimeout(
      () => {
        const Total = async () => {
          await axios
            .get("/totalKas.php")
            .then((response) => {
              // console.log(response.data);
              setTotalagustus(response.data.total_agustus);
              setTotalseptember(response.data.total_september);
              setTotaloktober(response.data.total_oktober);
              setTotalnovember(response.data.total_november);
              setTotaldesember(response.data.total_desember);
            });
        };
        Total();
      },

      200,
    );
  }, []);

  return (
    <>
      <Row>
        <h1 className="mt-3 text-center text-light">
          Pemasukan Uang Kas Tiap Bulan
        </h1>
        <Col>
          <table className="table table-custom" id="products">
            <thead>
              <tr>
                <th>BULAN AGUSTUS</th>
                <th>BULAN SEPTEMBER</th>
                <th>BULAN OKTOBER</th>
                <th>BULAN NOVEMBER</th>
                <th>BULAN DESEMBER</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{total_agustus}</td>
                <td>{total_september}</td>
                <td>{total_oktober}</td>
                <td>{total_november}</td>
                <td>{total_desember}</td>
              </tr>
            </tbody>
          </table>
        </Col>
      </Row>
    </>
  );
};
