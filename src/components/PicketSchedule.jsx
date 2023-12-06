/** @format */
import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
export default function kasHome() {
  const [resultArray, setResultArray] = useState([]);

  useEffect(() => {
    if (resultArray.length == 0) {
      const List = async () => {
        await axios
          .get("/getPiket.php")
          .then((response) => setResultArray(response.data));
      };
      List();
    }
  }, [resultArray]);

  const { status, ...filteredData } = resultArray;
  const hasil = Object.values(filteredData);
  // console.log(hasil);

  return (
    <>
      <section style={{ marginTop: "150px" }} id="piket">
        <Container className="text-center typing-effect">
          <h1 className="mt-5   animate-character">JADWAL PIKET KELAS</h1>
          <table className="table table-striped table-dark">
            <thead>
              <tr>
                <th scope="col">HARI</th>
                <th scope="col">RUANG</th>
                <th scope="col">NAMA</th>
              </tr>
            </thead>
            <tbody>
              {hasil.map((item, anu) => (
                <tr key={anu}>
                  <td>{item.hari}</td>
                  <td>{item.ruangan}</td>
                  <td>{item.nama}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Container>
      </section>
    </>
  );
}
