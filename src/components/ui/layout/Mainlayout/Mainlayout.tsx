import { Outlet } from "react-router-dom";
import Container from "./Container";
import { MainNavbar } from "./Navbar";

const Mainlayout = () => {
  return (
    <Container>
      <MainNavbar />
      <Outlet />
    </Container>
  );
};

export default Mainlayout;
