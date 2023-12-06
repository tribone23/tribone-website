/** @format */

import Jumbotron from "../components/Jumbotron";
import Schedule from "../components/Schedule";
import NavBar from "../components/Navbar";
import About from "../components/About";
import { Footer } from "../components/Footer";
import PicketSchedule from "../components/PicketSchedule";

const Home = () => {
  return (
    <div>
      <NavBar />
      <Jumbotron />
      <About />
      <Schedule />
      <PicketSchedule />
      <Footer />
    </div>
  );
};

export default Home;
