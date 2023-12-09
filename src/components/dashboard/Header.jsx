import {useNavigate} from "react-router-dom";
import {logoutUser} from "../../hooks/AuthUser";
import logoki from "../../../src/assets/logo.png";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <div className='header dark-primary'>
      <div className='menu-toggle-btn'>
        <a href='#'>
          <i className=' text-white bi bi-list' />
        </a>
      </div>

      <a
        href='./dashboard.html'
        className='logo'
      >
        <img
          width={100}
          src={logoki}
          alt='logo'
        />
      </a>

      <div className='page-title text-white'>Dashboard</div>
      <div className='header-bar ms-auto'>
        <ul className='navbar-nav justify-content-end'>
          <li className='nav-item ms-3'>
            <button
              className='btn btn-primary btn-icon'
              onClick={handleLogout}
            >
              <i className='bi bi-box-arrow-left' /> Logout
            </button>
          </li>
        </ul>
      </div>

      <div className='header-mobile-buttons'>
        <a
          href='#'
          className='actions-btn'
        >
          <i className='bi bi-three-dots' />
        </a>
      </div>
    </div>
  );
}

export default Header;
