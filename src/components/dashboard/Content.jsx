import { useEffect, useState } from "react";
import "../../styles/ContentDash.css";
import { fetchUserData } from "../../hooks/AuthUser";
import axios from "axios";

function Content() {
  const [resultArray, setResultArray] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [greet, setGreet] = useState("");

  useEffect(() => {
    const user = fetchUserData();
    setName(user.nama);
    setEmail(user.email);
    setPhoto(user.profile);

    const date = new Date();

    const fulldate = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    setGreet(date.toLocaleDateString("id-ID", fulldate));
  }, []);

  useEffect(() => {
    const date = new Date();
    const days = {
      weekday: "long",
    };

    setTimeout(() => {
      if (resultArray.length == 0) {
        const List = async () => {
          await axios
            .post("/fetchMatkulHari.php", {
              hari: date.toLocaleDateString("id-ID", days),
            })
            .then((response) => setResultArray(response.data));
        };
        List();
      }
    }, 200);
  }, [resultArray]);
  const { status, ...filteredData } = resultArray;
  const hasil = Object.values(filteredData);

  return (
    <div className="content">
      <div className="buyer-profile-cover bg-image mb-4 img-cover-dash fade-effect">
        <div className="container d-flex align-items-center justify-content-center h-100 flex-column flex-md-row text-center text-md-start">
          <div className="avatar avatar-xl me-3">
            <img src={photo} className="rounded-circle" />
          </div>
          <div className="my-4 my-md-0">
            <h3 className="mb-1 profile-name typing-effect">{name}</h3>
            <small>{email}</small>
          </div>
          <div className="ms-md-auto">
            <a
              href="dashboard/settings"
              className="btn btn-primary btn-lg btn-icon"
            >
              <i className="bi bi-pencil small" /> Edit Profile
            </a>
          </div>
        </div>
      </div>
      <div className="fade-effect">
        <h2 className="text-light fade-effect">{greet}</h2>
        <h4 className="text-light fade-effect">
          Berikut kuliah untuk hari ini
        </h4>
        {hasil.map((item, anu) => (
          <div className="todo-list fade-effect" key={anu}>
            <ul className="list-group">
              <li className="list-group-item gap-3">
                <div className="flex-shrink-0">
                  <i className="todo-sortable-handle bi bi-grip-horizontal" />
                </div>
                <div className="flex-shrink-0">
                  <span className="text-muted">{item.jam}</span>
                </div>
                <div className="flex-grow-1 d-flex align-items-center justify-content-between">
                  <div className="text-truncate">{item.matkul}</div>
                  <div className="ps-3 d-flex gap-3 align-items-center flex-shrink-0">
                    <div className="d-sm-inline d-none">
                      <div className="badge bg-danger">{item.ruang}</div>
                    </div>
                    <div className="d-sm-inline d-none">
                      <div className="badge bg-warning">{item.dosen}</div>
                    </div>
                    <div className="d-sm-inline d-none"></div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Content;
