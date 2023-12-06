/** @format */
import { useState, useEffect, useRef } from "react";
import { fetchUserData } from "../../hooks/AuthUser";
import axios from "axios";
import Swal from "sweetalert2";

export const Setting = () => {
  const [nrp, setNrp] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [timestamp, setTimestamp] = useState(Date.now());
  const [role, setRole] = useState("");
  const [pass, setPass] = useState("");
  const [confpass, setConfpass] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }

    // console.log("fileObj isine", fileObj);
    event.target.value = null;

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("photo", fileObj);

    axios({
      method: "post",
      url: "/updateProfileImage.php",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    })
      .then(function (response) {
        let userData = fetchUserData();
        userData.profile = response.data.message;

        localStorage.setItem("user", JSON.stringify(userData));
        setPhoto(userData.profile);
        setTimestamp(Date.now());
        window.location.reload(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleDeletePhoto = () => {
    const token = localStorage.getItem("token");

    axios
      .delete("/deleteProfileImage.php", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        if (response.data.status == 200) {
          let userData = fetchUserData();
          
          userData.profile = response.data.message;

          localStorage.setItem("user", JSON.stringify(userData));
          setPhoto(userData.profile);
          setTimestamp(Date.now());
          window.location.reload(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e, type) => {
    e.preventDefault();

    switch (type) {
      case "pass":
        setError("");
        setPass(e.target.value);
        if (e.target.value === "") {
          setError("Password tidak boleh kosong");
        }
        break;
      case "confpass":
        setError("");
        setConfpass(e.target.value);
        if (e.target.value === "") {
          setError("Konfirmasi password tidak boleh kosong");
        }
        break;
      default:
    }
  };

  const handleChangePassword = () => {
    const token = localStorage.getItem("token");

    let data = {
      pass: pass,
      confpass: confpass,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

    axios
      .put("/updatePassword.php", data, config)
      .then((response) => {
        if (response.data.status == 200) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Password berhasil diubah",
            showConfirmButton: false,
            timer: 1500,
          });
          setPass("");
          setConfpass("");
        }
      })
      .catch((error) => setError(error.response.data.message));
  };

  useEffect(() => {
    const user = fetchUserData();
    setNrp(user.nrp);
    setName(user.nama);
    setEmail(user.email);
    setPhoto(user.profile);
    setRole("Warga TRI");
  }, []);

  return (
    <>
      <div className="content">
        <div className="row flex-column-reverse flex-md-row">
          <div className="col-md-8">
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="profile"
                role="tabpanel"
                aria-labelledby="profile-tab"
              >
                <div className="mb-4">
                  <div className="d-flex flex-column flex-md-row text-center text-md-start mb-3 p-2 bg-transparent">
                    <figure className="me-4 flex-shrink-0">
                      <img
                        key={timestamp}
                        width={100}
                        className="rounded-pill"
                        src={photo}
                        alt="..."
                      />
                    </figure>
                    <div className="flex-fill">
                      <h5 className="mb-3 text-light">{name}</h5>
                      <input
                        style={{ display: "none" }}
                        ref={inputRef}
                        type="file"
                        onChange={handleFileChange}
                      />

                      <button
                        className="btn btn-primary me-2"
                        onClick={handleClick}
                      >
                        Change Avatar
                      </button>
                      <button
                        className="btn btn-outline-danger btn-icon"
                        data-bs-toggle="tooltip"
                        title="Remove Avatar"
                        onClick={handleDeletePhoto}
                      >
                        <i className="bi bi-trash me-0" />
                      </button>
                    </div>
                  </div>
                  <div className="card mb-4 dark-secondary fade-effect">
                    <div className="card-body">
                      <h6 className="card-title mb-4 text-light">
                        Data Pribadi
                      </h6>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label
                              style={{ color: "black" }}
                              className="form-label text-light"
                            >
                              Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue={name}
                              readOnly={true}
                            />
                          </div>

                          <div className="mb-3">
                            <label
                              style={{ color: "black" }}
                              className="form-label text-light"
                            >
                              Email
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              defaultValue={email}
                              readOnly={true}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label
                              style={{ color: "black" }}
                              className="form-label text-light"
                            >
                              NRP
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue={nrp}
                              readOnly={true}
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              style={{ color: "black" }}
                              className="form-label  text-light"
                            >
                              Role
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue={role}
                              readOnly={true}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="password"
                role="tabpanel"
                aria-labelledby="password-tab"
              >
                <div className="card dark-secondary fade-effect">
                  <div className="card-body">
                    <h6 className="card-title mb-4 text-light">
                      Ubah Password
                    </h6>
                    <div className="mb-3">
                      <label
                        style={{ color: "black" }}
                        className="form-label text-light"
                      >
                        Password Baru
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        name="pass"
                        onChange={(e) => handleChange(e, "pass")}
                        value={pass}
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        style={{ color: "black" }}
                        className="form-label text-light"
                      >
                        Konfirmasi Password Baru
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        name="confpass"
                        onChange={(e) => handleChange(e, "confpass")}
                        value={confpass}
                      />
                      {error ? (
                        <h5 className="text-danger my-3 fade-effect">
                          {error}
                        </h5>
                      ) : (
                        <div className="my-3"></div>
                      )}
                      <button
                        className="btn btn-primary"
                        onClick={handleChangePassword}
                      >
                        Ubah Password
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card sticky-top mb-4 mb-md-0 dark-secondary">
              <div className="card-body">
                <ul
                  className="nav nav-pills flex-column gap-2"
                  id="myTab"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <a
                      className="nav-link active"
                      id="profile-tab"
                      data-bs-toggle="tab"
                      href="#profile"
                      role="tab"
                      aria-controls="profile"
                      aria-selected={true}
                    >
                      <i className="bi bi-person me-2" /> Profile
                    </a>
                  </li>
                  <li className="nav-item" role="presentation">
                    <a
                      className="nav-link"
                      id="password-tab"
                      data-bs-toggle="tab"
                      href="#password"
                      role="tab"
                      aria-controls="password"
                      aria-selected="false"
                    >
                      <i className="bi bi-lock me-2" /> Password
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
