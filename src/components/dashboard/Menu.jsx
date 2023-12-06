/** @format */
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchUserData } from "../../hooks/AuthUser";

function Menu() {
  const [nrp, setNrp] = useState("");
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    const isUserLogged = localStorage.getItem("isLogged");
    // console.log(isUserLogged);
    if (isUserLogged === "true") {
      const user = fetchUserData();
      setNrp(user.nrp);
      setName(user.nama);
      setPhoto(user.profile);
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="menu dark-secondary">
      <div className="menu-header">
        <a href="/dashboard" className="menu-header-logo">
          <img
            className="rounded-circle img-cover"
            src="../../src/assets/logo.png"
            alt="logo"
          />
          <span className="text-light">Tribone.</span>
        </a>
        <a href="#" className="btn btn-sm menu-close-btn">
          <i className="bi bi-x" />
        </a>
      </div>
      <div className="menu-body text-light">
        <div className="dropdown">
          <a
            href="#"
            className="d-flex align-items-center"
            data-bs-toggle="dropdown"
          >
            <div className="me-4">
              <img
                src={photo}
                className="rounded-circle img-cover"
                alt="image"
              />
            </div>
            <div>
              <div className="fw-bold">{name}</div>
              <small className="text-muted">{nrp}</small>
            </div>
          </a>
          <div className="dropdown-menu dropdown-menu-end"></div>
        </div>
        <ul>
          <li className="menu-divider">Dashboard Manajemen Tribone</li>
          <li>
            <Link
              className={pathname === "/dashboard" ? "m-2 active" : "m-2"}
              to={"/dashboard"}
            >
              <span className="nav-link-icon">
                <i
                  className={
                    pathname === "/dashboard"
                      ? "bi bi-bar-chart"
                      : "bi bi-bar-chart text-light"
                  }
                />
              </span>
              <span className="text-light">Dashboard</span>
            </Link>
            <Link
              className={
                pathname === "/dashboard/jadwal" ? "m-2 active" : "m-2"
              }
              to="/dashboard/jadwal"
            >
              <span className="nav-link-icon">
                <i
                  className={
                    pathname === "/dashboard/jadwal"
                      ? "bi bi-receipt"
                      : "bi bi-receipt text-light"
                  }
                />
              </span>
              <span className="text-light">Jadwal Matkul</span>
            </Link>
            <Link
              className={
                pathname === "/dashboard/piketkelas" ? "m-2 active" : "m-2"
              }
              to={"/dashboard/piketkelas"}
            >
              <span className="nav-link-icon">
                <i
                  className={
                    pathname === "/dashboard/piketkelas"
                      ? "bi bi-check-circle"
                      : "bi bi-check-circle text-light"
                  }
                />
              </span>
              <span className="text-light">Jadwal Piket</span>
            </Link>
            <Link
              className={
                pathname === "/dashboard/kaskelas" ? "m-2 active" : "m-2"
              }
              to={"/dashboard/kaskelas"}
            >
              <span className="nav-link-icon">
                <i
                  className={
                    pathname === "/dashboard/kaskelas"
                      ? "bi bi-wallet2"
                      : "bi bi-wallet2 text-light"
                  }
                />
              </span>
              <span className="text-light">Kas Kelas</span>
            </Link>
            <Link
              className={
                pathname === "/dashboard/settings" ? "m-2 active" : "m-2"
              }
              to={"/dashboard/settings"}
            >
              <span className="nav-link-icon">
                <i
                  className={
                    pathname === "/dashboard/settings"
                      ? "bi bi-person-badge"
                      : "bi bi-person-badge text-light"
                  }
                />
              </span>
              <span className="text-light">Pengaturan</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Menu;
