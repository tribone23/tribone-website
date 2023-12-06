import { Row, Col, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export const Pembayaran = () => {
  const [resultArray, setResultArray] = useState([]);
  const [nama, setNama] = useState();
  const [agustus, setAgustus] = useState();
  const [september, setSeptember] = useState();
  const [oktober, setOktober] = useState();
  const [november, setNovember] = useState();
  const [desember, setDesember] = useState();
  const [editid, setEditid] = useState(-1);

  function handleEditid(id, namane, agus, septi, okta, novem, mberr) {
    setEditid(id);
    setNama(namane);
    setAgustus(agus);
    setSeptember(septi);
    setOktober(okta);
    setNovember(novem);
    setDesember(mberr);
  }

  useEffect(() => {
    setTimeout(
      () => {
        if (resultArray.length == 0) {
          const List = async () => {
            await axios
              .get("/getKas.php")
              .then((response) => setResultArray(response.data));
          };
          List();
        }
      },

      200,
    );
  }, []);
  const { status, ...filteredData } = resultArray;
  const hasil = Object.values(filteredData);

  const handleUpdate = () => {
    const token = localStorage.getItem("token");
    let dataput = {
      id: editid,
      nama: nama,
      agustus: agustus,
      september: september,
      oktober: oktober,
      november: november,
      desember: desember,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

    axios
      .put("/updateKas.php/", dataput, config)
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
        confirmButtonText: "Ya, hapus KAS!",
        cancelButtonText: "Batal",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          const token = localStorage.getItem("token");

          axios
            .delete("/deleteKas.php", {
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
                  text: "KAS berhasil dihapus.",
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
    <Container>
      <Row>
        <h1 className="mt-3 text-center text-light">Pembayaran Uang Kas</h1>
        <Col className="m-5">
          <div style={{ overflow: "auto" }}>
            <table className="table table-custom" id="products">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAMA</th>
                  <th>AGUSTUS</th>
                  <th>SEPTEMBER</th>
                  <th>OKTOBER</th>
                  <th>NOVEMBER</th>
                  <th>DESEMBER</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {hasil.map((item, anu) =>
                  item.id === editid ? (
                    <tr style={{ overflow: "auto" }} key={anu}>
                      <td>
                        <input type="text" defaultValue={editid} disabled />
                      </td>
                      <td>
                        <input type="text" defaultValue={item.nama} />
                      </td>
                      <td>
                        <input
                          type="text"
                          defaultValue={item.agustus}
                          onChange={(e) => setAgustus(e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          defaultValue={item.september}
                          onChange={(e) => setSeptember(e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          defaultValue={item.oktober}
                          onChange={(e) => setOktober(e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          defaultValue={item.november}
                          onChange={(e) => setNovember(e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          defaultValue={item.desember}
                          onChange={(e) => setDesember(e.target.value)}
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
                      <td>{item.nama}</td>
                      <td>{item.agustus}</td>
                      <td>{item.september}</td>
                      <td>{item.oktober}</td>
                      <td>{item.november}</td>
                      <td>{item.desember}</td>

                      <td className="text-end">
                        <div className="text-end">
                          <span
                            className="bi-pencil-square me-3"
                            onClick={() =>
                              handleEditid(
                                item.id,
                                item.nama,
                                item.agustus,
                                item.september,
                                item.oktober,
                                item.november,
                                item.desember,
                              )
                            }
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
          </div>
        </Col>
      </Row>
    </Container>
  );
};
