/** @format */

import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Piket from "./components/dashboard/Piket";
import {Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import RequireAuth from "./hooks/RequireAuth";
import HasLogged from "./hooks/HasLogged";
import Redirect from "./pages/Redirect";
import Kas from "./components/dashboard/Kas";
import {Setting} from "./components/dashboard/Setting";
import Jadwal from "./components/dashboard/Jadwal";
import Short from "./components/Short";
import Linkshort from "./components/Linkshort";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || "https://budisantoso.serv00.net";

function App() {
  return (
    <>
      <Routes>
        <Route
          path='/'
          Component={Home}
        ></Route>
        <Route
          path='/login'
          element={
            <HasLogged>
              <Login />
            </HasLogged>
          }
        ></Route>
        <Route
          path='/dashboard'
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        ></Route>

        <Route
          path='/register'
          element={
            <HasLogged>
              <Register />
            </HasLogged>
          }
        ></Route>
        <Route
          path='redirect'
          element={<Redirect />}
        ></Route>
        <Route
          path='/dashboard/*'
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        >
          <Route
            path='settings'
            Component={Setting}
          />
          <Route
            path='jadwal'
            Component={Jadwal}
          />
          <Route
            path='piketkelas'
            Component={Piket}
          />
          <Route
            path='kaskelas'
            Component={Kas}
          />
          <Route
            path='*'
            element={<Redirect />}
          />
        </Route>
        <Route
          path='/*'
          element={<Redirect />}
        ></Route>
        <Route
          path='/short'
          element={<Short />}
        />
        <Route
          path='/:id'
          element={<Linkshort />}
        />
      </Routes>
    </>
  );
}

export default App;
