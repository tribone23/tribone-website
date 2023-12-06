/** @format */

import "../styles/About.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function About() {
  const [array, setArray] = useState([]);
  useEffect(() => {
    let anuarray = [];
    for (let k = 0; k < 1; k++) {
      const response = async () => {
        for (let i = 2423600031; i <= 2423600060; i++) {
          if (
            i !== 2423600039 &&
            i !== 2423600046 &&
            i !== 2423600051 &&
            i !== 2423600052 &&
            i !== 2423600054 &&
            i !== 2423600057 &&
            i !== 2423600059
          ) {
            let res = await axios.post(
              "http://127.0.0.1/tribone-api/getDikti.php",
              {
                data: i,
              },
            );
            let nama;

            const data = res.data.mahasiswa[0].text.split(",");
            nama = data[0].replace(/\s*\(.*?\)\s*/g, "");

            anuarray.push(nama);
          }
          setArray(anuarray);
        }
      };
      response();
    }
    // console.log(array);
  }, []);

  const listItems = array.map((nama) => (
    <li className="card" key={nama.toString()}>
      <div>
        <h3 className="card-title">ANGGOTA TRIBONE.</h3>
        <div className="card-content">
          <img
            height={"150px"}
            width={"150px"}
            src="../../src/assets/semuanya.jpeg"
            alt=""
          />
          <p className="text-ccenter">{nama}</p>
        </div>
      </div>
      <div className="card-link-wrapper">
        <a href="" className="card-link">
          Learn More
        </a>
      </div>
    </li>
  ));

  return (
    <>
      <section className="" id="About">
        <div style={{ marginTop: "150px" }}>
          <div className="text-center mt-5">
            <h1 className="mt-5 typing-effect animate-character">ABOUT US</h1>
            <br />
            <p className="mt-4 fade-effect lead gradient-text">
              KAMI ADALAH MAHASISWA DARI POLITEKNIK ELEKTRONIKA NEGERI SURABAYA
              TAHUN 2023. <br /> KAMI MASUK DI PRODI TEKNOLOGI REKAYASA INTERNET
              KELAS B
            </p>
          </div>
          <div className="container mt-5 mb-5">
            <h2 style={{ color: "white" }} className="text-center">
              STRUKTUR KELAS
            </h2>
            <ul className="cards">
              <li className="card">
                <div>
                  <h3 className="card-title">KOMTING</h3>
                  <div className="card-content">
                    <img
                      height={"150px"}
                      width={"150px"}
                      src="../../src/assets/tiga.jpeg"
                      alt=""
                    />
                    <p className="text-ccenter">
                      Muhammad Aprieldauzi Frieldane
                    </p>
                  </div>
                </div>
                <div className="card-link-wrapper">
                  <a href="" className="card-link">
                    Learn More
                  </a>
                </div>
              </li>
              <li className="card">
                <div>
                  <h3 className="card-title">WAKOMTING</h3>
                  <div className="card-content justify-content-center">
                    <img
                      height={"150px"}
                      width={"150px"}
                      src="../../src/assets/satu.jpeg"
                      alt=""
                    />
                    <p className="text-ccenter">Daniel Feren Antoni</p>
                  </div>
                </div>
                <div className="card-link-wrapper">
                  <a href="" className="card-link">
                    Learn More
                  </a>
                </div>
              </li>
              <li className="card">
                <div>
                  <h3 className="card-title">SEKERTARIS 1</h3>
                  <div className="card-content">
                    <img
                      height={"150px"}
                      width={"150px"}
                      src="../../src/assets/lima.jpeg"
                      alt=""
                    />
                    <p className="text-ccenter">Aiko Devy Ratnasari</p>
                  </div>
                </div>
                <div className="card-link-wrapper">
                  <a href="" className="card-link">
                    Learn More
                  </a>
                </div>
              </li>
              <li className="card">
                <div>
                  <h3 className="card-title">SEKERTARIS 2</h3>
                  <div className="card-content">
                    <img
                      height={"150px"}
                      width={"150px"}
                      src="../../src/assets/7.jpeg"
                      alt=""
                    />
                    <p className="text-ccenter">Romadhona Fitri Lestari</p>
                  </div>
                </div>
                <div className="card-link-wrapper">
                  <a href="" className="card-link">
                    Learn More
                  </a>
                </div>
              </li>
              <li className="card">
                <div>
                  <h3 className="card-title">BENDAHARA 1</h3>
                  <div className="card-content">
                    <img
                      height={"150px"}
                      width={"150px"}
                      src="../../src/assets/semuanya.jpeg"
                      alt=""
                    />
                    <p className="text-ccenter">Rahmat Bayu Nurisnan</p>
                  </div>
                </div>
                <div className="card-link-wrapper">
                  <a href="" className="card-link">
                    Learn More
                  </a>
                </div>
              </li>
              <li className="card">
                <div>
                  <h3 className="card-title">BENDAHARA 2</h3>
                  <div className="card-content">
                    <img
                      height={"150px"}
                      width={"150px"}
                      src="../../src/assets/enam.jpeg"
                      alt=""
                    />
                    <p className="text-ccenter">Miftakhul Zannah</p>
                  </div>
                </div>
                <div className="card-link-wrapper">
                  <a href="" className="card-link">
                    Learn More
                  </a>
                </div>
              </li>
            </ul>
          </div>

          <div className="container">
            <h2
              className="text-center"
              style={{ color: "white" }}
            >
              ANGGOTA TRIBONE
            </h2>

            <ul className="cards">{listItems}</ul>
          </div>
        </div>
      </section>
    </>
  );
}
