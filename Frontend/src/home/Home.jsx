import  { useEffect } from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Freebook from "../components/Freebook";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Home() {
const navigate=useNavigate();
  useEffect(()=>{
    if (!localStorage.getItem("Token")){
      toast.error("You Don't Have Access Please Login ..!!");
      navigate("/")
    }
  },[])
  return (
    <>
      <Navbar />
      <Banner />
      <Freebook />
      <Footer />
    </>
  );
}

export default Home;
