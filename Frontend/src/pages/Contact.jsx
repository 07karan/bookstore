import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { contactRoute } from "../utils/apiRoute";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
function Contact() {
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";
    const [fullname,setFullName]=useState("")
    const [email,setEmail]=useState("")
    const [message,setMessage]=useState("")
    const handleSubmit = async () => {
        const userInfo = {
            fullname,
            email,
            message
        };
        await axios
            .post(contactRoute, userInfo)
            .then((res) => {
                console.log(res.data);
                if (res.data) {
                    toast.success("Send Message Successfully");
                    navigate(from, { replace: true });
                }
                // localStorage.setItem("Users", JSON.stringify(res.data.user));
            })
            .catch((err) => {
                if (err.response) {
                    console.log(err);
                    toast.error("Error: " + err.response.data.message);
                }
            });
    };
    return (
        <>
        <Navbar></Navbar>
            <div className="flex h-screen items-center justify-center align-center text-black">
                <div className=" w-[600px] ">
                    <div className="modal-box">
                        <form onSubmit={handleSubmit} method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <Link
                                to="/"
                                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black"
                            >
                                ✕
                            </Link>

                            <h3 className="font-bold text-lg text-black">Contact</h3>
                            <div className="mt-4 space-y-2">
                                <span className="text-black">Name :</span>
                                <br />
                                <input
                                    type="text"
                                    placeholder="Enter your fullname"
                                    className="w-[30rem]  px-3 py-1 border rounded-md outline-none text-black"
                                    value={fullname} onChange={(e)=>setFullName(e.target.value)}
                                />
                                <br />
                            </div>
                            {/* Email */}
                            <div className="mt-4 space-y-2">
                                <span className=" text-black">Email :</span>
                                <br />
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-[30rem]  px-3 py-1 border rounded-md outline-none text-black"
                                    value={email} onChange={(e) => setEmail(e.target.value)}
                                />
                                <br />
                            </div>
                           
                            <div className="mt-4 space-y-2">
                                <span className=" text-black">Message :</span>
                                <br />
                                <textarea
                                    type="text"
                                    placeholder="Enter your Message..."
                                    className="w-[30rem] px-3 py-1 border rounded-md outline-none text-black"
                                    value={message} onChange={(e) => setMessage(e.target.value)}
                                />
                                <br />
                                
                            </div>
                            {/* Button */}
                            <div className="flex justify-around mt-4">
                                <button className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200">
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        {/* <Footer></Footer> */}
        </>
    );
}

export default Contact;
