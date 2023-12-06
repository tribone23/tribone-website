/** @format */

import ContentFooter from "../components/dashboard/ContentFooter";
import Header from "../components/dashboard/Header";
import Menu from "../components/dashboard/Menu";
import { Outlet } from "react-router-dom";
import "../styles/DashStyle.css";

export default function Ldashboard({ children }) {
  return (
    <>
      <div id="hitam">
        <Menu />
        <div className="layout-wrapper dark-primary">
          <Header />
          {children}
          <Outlet />
          <ContentFooter />
        </div>
      </div>
    </>
  );
}
