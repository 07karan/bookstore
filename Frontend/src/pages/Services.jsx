import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { serviceRoute } from "../utils/apiRoute";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Servicecard from "../components/Servicecard";


function Services() {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get(serviceRoute); // Make sure to replace with your service route
                setServices(response.data.data);
                console.log(response.data.data);
            } catch (error) {
                console.error("Error fetching services:", error);
            }
        };

        fetchServices();
    }, []);

    return (
        <>
        <Navbar></Navbar>
            <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
            <div className="mt-[4.5rem] items-center justify-center text-center">
                <h1 className="text-2xl md:text-4xl">
                    Our Services
                    <span className="text-pink-500"> :</span>
                </h1>
                <p className="mt-12">
                        Welcome to our services page! Explore a wide range of innovative solutions crafted to elevate your business. From cutting-edge technology to personalized support, we're here to help you succeed in today's competitive landscape
                </p>
                <Link to="/">
                    <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
                        Back
                    </button>
                </Link>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-4">
                {services.map((item,index) => (
                    <Servicecard key={index} item={item} />
                ))}
            </div>
        </div>
        <Footer></Footer>
    </>
    );
}

export default Services;
