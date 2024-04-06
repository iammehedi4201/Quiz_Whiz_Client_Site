import Blogs from "../../components/Home/Blogs";
import { FooterWithLogo } from "../../components/Home/Footer";
import Header from "../../components/Home/Header";
import Topics from "../../components/Home/Topics";

const Home = () => {
  return (
    <div id="/">
      <Header />
      <Blogs />
      <Topics  />
      <FooterWithLogo />
    </div>
  );
};

export default Home;
