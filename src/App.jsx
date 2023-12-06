/** @format */

import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Piket from "./components/dashboard/Piket";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import RequireAuth from "./hooks/RequireAuth";
import HasLogged from "./hooks/hasLogged";
import Redirect from "./pages/Redirect";
import Kas from "./components/dashboard/Kas";
import { Setting } from "./components/dashboard/Setting";
import Jadwal from "./components/dashboard/Jadwal";

import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1/tribone-api";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={Home}></Route>
        <Route
          path="/login"
          element={
            <HasLogged>
              <Login />
            </HasLogged>
          }
        ></Route>
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        ></Route>

        <Route
          path="/register"
          element={
            <HasLogged>
              <Register />
            </HasLogged>
          }
        ></Route>
        <Route path="redirect" element={<Redirect />}></Route>
        <Route
          path="/dashboard/*"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        >
          <Route path="settings" Component={Setting} />
          <Route path="jadwal" Component={Jadwal} />
          <Route path="piketkelas" Component={Piket} />
          <Route path="kaskelas" Component={Kas} />
          <Route path="*" element={<Redirect />} />
        </Route>
        <Route path="/*" element={<Redirect />}></Route>
      </Routes>
    </>
  );
}

export default App;
