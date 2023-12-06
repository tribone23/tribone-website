/** @format */
import "../../styles/Dashboard.css";
import { Container } from "react-bootstrap";
import { Pembayaran } from "./kas/Pembayarankas";
import { Pemasukankas } from "./kas/Pemasukankas";
export default function Kas() {
  return (
    <Container style={{ width: "100%" }}>
      <Pembayaran />
      <Pemasukankas />
    </Container>
  );
}
