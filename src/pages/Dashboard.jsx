/** @format */

import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Content from "../components/dashboard/Content";
import Ldashboard from "./Ldashboard";
import { Setting } from "../components/dashboard/Setting";
import Jadwal from "../components/dashboard/Jadwal";
import { checkUserToken } from "../hooks/AuthUser";
import Piket from "../components/dashboard/Piket";
import Kas from "../components/dashboard/Kas";
import "../styles/DashStyle.css";
export default function Dashboard() {
  useEffect(() => {
    checkUserToken();
  }, []);

  return (
    <>
      <Ldashboard>
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="/" element={<Setting />} />
          <Route path="/" element={<Jadwal />} />
          <Route path="/" element={<Piket />} />
          <Route path="/" element={<Kas />} />
        </Routes>
      </Ldashboard>
    </>
  );
}
