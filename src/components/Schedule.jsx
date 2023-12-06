/** @format */
import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Schedule() {
  const [resultArray, setResultArray] = useState([]);

  useEffect(() => {
    if (resultArray.length == 0) {
      const List = async () => {
        await axios
          .get("/getJadwal.php")
          .then((response) => setResultArray(response.data));
      };
      List();
    }
  }, [resultArray]);

  const { status, ...filteredData } = resultArray;
  const hasil = Object.values(filteredData);

  return (
    <>
      <section style={{ marginTop: "150px", color: "white" }} id="Schedule">
        <Container className="text-center typing-effect">
          <h1 className="mt-5 animate-character">JADWAL MATKUL</h1>
          <table className="table table-striped table-dark">
            <thead>
              <tr>
                <th scope="col">HARI</th>
                <th scope="col">MATA KULIAH</th>
                <th scope="col">DOSEN PENGAJAR</th>
                <th scope="col">RUANG KELAS</th>
                <th scope="col">WAKTU JAM</th>
                <th scope="col">SEMESTER</th>
              </tr>
            </thead>
            <tbody>
              {hasil.map((item, anu) => (
                <tr key={anu}>
                  <td>{item.hari}</td>
                  <td>{item.matkul}</td>
                  <td>{item.dosen}</td>
                  <td>{item.ruang}</td>
                  <td>{item.jam}</td>
                  <td>{item.semester}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Container>
      </section>
    </>
  );
}
