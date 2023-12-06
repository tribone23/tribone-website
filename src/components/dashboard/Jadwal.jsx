/** @format */
import "../../styles/Dashboard.css";
import { Row, Col, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function Jadwal() {
  const [addjadwal, setAddjadwal] = useState(false);
  const [resultArray, setResultArray] = useState([]);
  const [hari, setHari] = useState();
  const [matkul, setMatkul] = useState();
  const [dosen, setDosen] = useState();
  const [ruang, setRuang] = useState();
  const [jam, setJam] = useState();
  const [sems, setSems] = useState();
  const [editid, setEditid] = useState(-1);

  const showAddJadwal = () => {
    setAddjadwal((addjadwal) => !addjadwal);
  };

  function handleSubmit(event) {
    event.preventDefault();

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

    let dataAdd = {
      hari: hari,
      matkul: matkul,
      dosen: dosen,
      ruang: ruang,
      jam: jam,
      semester: sems,
    };
    axios
      .post("/createJadwal.php", dataAdd, config)
      .then((response) => {
        location.reload();

        // console.log(response);
      })
      .catch((error) => console.log(error));
  }

  function handleEditid(id) {
    axios
      .post("/fetchMatkul.php", {
        id: id,
      })
      .then((response) => {
        const matkul = response.data[0];
        setEditid(matkul.id);
        setHari(matkul.hari);
        setMatkul(matkul.matkul);
        setDosen(matkul.dosen);
        setRuang(matkul.ruang);
        setJam(matkul.jam);
        setSems(matkul.semester);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    setTimeout(() => {
      if (resultArray.length == 0) {
        const List = async () => {
          await axios
            .get("/getJadwal.php")
            .then((response) => setResultArray(response.data));
        };
        List();
      }
    }, 200);
  }, [resultArray]);
  const { status, ...filteredData } = resultArray;
  const hasil = Object.values(filteredData);

  const handleUpdate = () => {
    const token = localStorage.getItem("token");

    let dataput = {
      id: editid,
      hari: hari,
      matkul: matkul,
      dosen: dosen,
      ruang: ruang,
      jam: jam,
      semester: sems,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

    axios
      .put("/updateJadwal.php", dataput, config)
      .then((response) => {
        if (response.data.status == 200) location.reload();
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = (deleteID) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Apakah anda yakin?",
        text: "Proses ini tidak dapat dibatalkan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, hapus jadwal!",
        cancelButtonText: "Batal",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          const token = localStorage.getItem("token");

          axios
            .delete("/deleteJadwal.php", {
              headers: {
                Authorization: "Bearer " + token,
              },
              data: {
                id: deleteID,
              },
            })
            .then((response) => {
              if (response.data.status == 200) {
                swalWithBootstrapButtons.fire({
                  title: "Terhapus!",
                  text: "Jadwal berhasil dihapus.",
                  icon: "success",
                });

                window.location.reload(true);
              }
            })
            .catch((error) => console.log("iki error", error));
        }
      });
  };

  return (
    <Container style={{ width: "100%" }}>
      <Row>
        <Col className="m-5 dark-secondary p-3 rounded-5">
          <h2 className="text-light">Jadwal Matkul</h2>
          <div style={{ overflow: "auto" }}>
            <table className="table table-custom fade-effect">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Hari</th>
                  <th>Matkul</th>
                  <th>Dosen</th>
                  <th>Ruang</th>
                  <th>Jam</th>
                  <th>Semester</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {hasil.map((item, anu) =>
                  item.id === editid ? (
                    <tr style={{ overflow: "auto" }} key={anu}>
                      <td>
                        <input type="text" defaultValue={editid} />
                      </td>
                      <td>
                        <input
                          type="text"
                          defaultValue={item.hari}
                          onChange={(e) => setHari(e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          defaultValue={item.matkul}
                          onChange={(e) => setMatkul(e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          defaultValue={item.dosen}
                          onChange={(e) => setDosen(e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          defaultValue={item.ruang}
                          onChange={(e) => setRuang(e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          defaultValue={item.jam}
                          onChange={(e) => setJam(e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          defaultValue={item.semester}
                          onChange={(e) => setSems(e.target.value)}
                        />
                      </td>
                      <td className="text-end">
                        <div className="text-end">
                          <span
                            className="bi-pencil-square me-3"
                            onClick={handleUpdate}
                          >
                            UPDATE
                          </span>
                          <span
                            className="bi-pencil-square me-3 text-danger"
                            onClick={() => {
                              location.reload();
                            }}
                          >
                            CANCEL
                          </span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <tr key={anu}>

                      <td>{item.id}</td>
                      <td>{item.hari}</td>
                      <td>{item.matkul}</td>
                      <td>{item.dosen}</td>
                      <td>{item.ruang}</td>
                      <td>{item.jam}</td>
                      <td>{item.semester}</td>
                      <td className="text-end">
                        <div className="text-end">
                          <span
                            className="bi-pencil-square me-3"
                            onClick={() => handleEditid(item.id)}
                          >
                            EDIT
                          </span>
                          <span
                            className="bi-trash me-3 text-danger"
                            onClick={() => handleDelete(item.id)}
                          >
                            DELETE
                          </span>
                        </div>
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>

            {addjadwal && (
              <Row className="fade-effect">
                <h2 className="text-light">Tambahkan Jadwal</h2>
                <form onSubmit={handleSubmit}>
                  <Col className="col-12 mt-2">
                    {" "}
                    <label
                      style={{ color: "black" }}
                      defaultValue="ENTER DAY"
                      className="form-label text-light"
                    >
                      HARI
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue=""
                      onChange={(e) => setHari(e.target.value)}
                    />
                  </Col>
                  <Col className="col-12 mt-2">
                    {" "}
                    <label
                      style={{ color: "black" }}
                      defaultValue="ENTER MATKUL"
                      className="form-label text-light"
                    >
                      MATKUL
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue=""
                      onChange={(e) => setMatkul(e.target.value)}
                    />
                  </Col>
                  <Col className="col-12 mt-2">
                    {" "}
                    <label
                      style={{ color: "black" }}
                      defaultValue="ENTER DOSEN"
                      className="form-label text-light"
                    >
                      DOSEN
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue=""
                      onChange={(e) => setDosen(e.target.value)}
                    />
                  </Col>
                  <Col className="col-12 mt-2">
                    {" "}
                    <label
                      style={{ color: "black" }}
                      defaultValue="ENTER ROOM"
                      className="form-label text-light"
                    >
                      RUANG
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue=""
                      onChange={(e) => setRuang(e.target.value)}
                    />
                  </Col>
                  <Col className="col-12 mt-2">
                    {" "}
                    <label
                      style={{ color: "black" }}
                      defaultValue="ENTER JAM"
                      className="form-label text-light"
                    >
                      JAM
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue=""
                      onChange={(e) => setJam(e.target.value)}
                    />
                  </Col>
                  <Col className="col-12 mt-2">
                    {" "}
                    <label
                      style={{ color: "black" }}
                      defaultValue="ENTER SEMESTER"
                      className="form-label text-light"
                    >
                      SEMESTER
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue=""
                      onChange={(e) => setSems(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <button
                      style={{ marginTop: "30px" }}
                      className="btn btn-primary"
                      onClick={handleSubmit}
                    >
                      Submit rek
                    </button>
                  </Col>
                </form>
              </Row>
            )}
            <button
              style={{ marginTop: "30px" }}
              className="btn btn-primary"
              onClick={showAddJadwal}
            >
              {!addjadwal ? "Tambahkan Jadwal" : "Tutup"}
            </button>
          </div>
        </Col>
      </Row>
    </Container>
    // </div>
  );
}
