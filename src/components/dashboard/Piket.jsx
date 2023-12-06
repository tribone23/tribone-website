/** @format */
import "../../styles/Dashboard.css";
import { Row, Col, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function Piket() {
  const [addpiket, setAddpiket] = useState(false);
  const [resultArray, setResultArray] = useState([]);
  const [hari, setHari] = useState();
  const [ruangan, setRuangan] = useState();
  const [nama, setNama] = useState();
  const [editid, setEditid] = useState(-1);

  const showAddPiket = () => {
    setAddpiket((addpiket) => !addpiket);
  };

  function handleSubmit(event) {
    event.preventDefault();
    let dataAdd = {
      hari: hari,
      ruangan: ruangan,
      nama: nama,
    };
    axios
      .post("/createPiket.php", dataAdd)
      .then((response) => {
        if (response.data.status == 200) location.reload();

        // console.log(response);
      })
      .catch((error) => console.log(error));
  }

  function handleEditid(id) {
    setEditid(id);
    axios
      .post("/fetchPiket.php", {
        id: id,
      })
      .then((response) => {
        // console.log(response);
        const piket = response.data[0];
        setEditid(piket.id);
        setHari(piket.hari);
        setRuangan(piket.ruangan);
        setNama(piket.nama);
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
            .get("/getPiket.php")
            .then((response) => setResultArray(response.data));
        };
        List();
      }
    }, 200);
  }, [resultArray]);
  const { status, ...filteredData } = resultArray;
  const hasil = Object.values(filteredData);
  // console.log(hasil);

  const handleUpdate = () => {
    const token = localStorage.getItem("token");
    let dataput = {
      id: editid,
      hari: hari,
      ruangan: ruangan,
      nama: nama,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

    axios
      .put("/updatePiket.php/", dataput, config)
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
            .delete("/deletePiket.php", {
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
                  text: "Jadwal Piket berhasil dihapus.",
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
          <h2 className="text-light">Jadwal Piket</h2>
          <div style={{ overflow: "auto" }}>
            <table className="table table-custom fade-effect" id="products">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Hari</th>
                  <th>Ruangan</th>
                  <th>Nama</th>
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
                          defaultValue={item.ruangan}
                          onChange={(e) => setRuangan(e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          defaultValue={item.nama}
                          onChange={(e) => setNama(e.target.value)}
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
                      <td>{item.ruangan}</td>
                      <td>{item.nama}</td>
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

            {addpiket && (
              <Row className="fade-effect">
                <h2 className="text-light mt-">Tambahkan Piket</h2>
                <form onSubmit={handleSubmit}>
                  <Col className="col-12">
                    {" "}
                    <label
                      style={{ color: "black" }}
                      defaultValue="ENTER DAY"
                      className="form-label text-light mt-2"
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
                  <Col className="col-12">
                    {" "}
                    <label
                      style={{ color: "black" }}
                      defaultValue="ENTER MATKUL"
                      className="form-label text-light mt-2"
                    >
                      RUANGAN
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue=""
                      onChange={(e) => setRuangan(e.target.value)}
                    />
                  </Col>
                  <Col className="col-12">
                    {" "}
                    <label
                      style={{ color: "black" }}
                      defaultValue="ENTER DOSEN"
                      className="form-label text-light mt-2"
                    >
                      NAMA
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue=""
                      onChange={(e) => setNama(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <button
                      style={{ marginTop: "30px" }}
                      className="btn btn-primary"
                      onClick={handleSubmit}
                    >
                      Tambahkan
                    </button>
                  </Col>
                </form>
              </Row>
            )}
            <button
              style={{ marginTop: "30px" }}
              className="btn btn-primary"
              onClick={showAddPiket}
            >
              {!addpiket ? "Tambahkan Piket" : "Tutup"}
            </button>
          </div>
        </Col>
      </Row>
    </Container>
    // </div>
  );
}
