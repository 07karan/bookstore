import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { forgotpasswordRoute } from "../utils/apiRoute";
import Navbar from "../components/Navbar";
function Forgotpassword() {
    // const location = useLocation();
    const navigate = useNavigate();
    // const from = location.state?.from?.pathname || "/";
    const [email, setEmail] = useState("")
    
    const handlOtp=()=>{
        navigate("/sendotp");
    }
    const handleSubmit = async () => {
        const userInfo = {
            email,
        };

        if(email===""){
            toast.error("Please enter your email..!!");
        }
        await axios
            .post(forgotpasswordRoute, userInfo)
            .then((res) => {
                console.log(res.data);
                if (res.data) {
                    toast.success("Email Send Successfully Please Check Your Email");
                }
            })
            .catch((err) => {
                if (err.response) {
                    console.log(err);
                    // toast.error("Error: " + err.response.data.message);
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
                                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            >
                                ✕
                            </Link>

                            <h3 className="font-bold text-black">Forgot Password</h3>
                            {/* Email */}
                            <div className="mt-4 space-y-2">
                                <span className="text-black">Email:</span>
                                <br />
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-[28rem]  px-3 py-1 border rounded-md outline-none text-black"
                                    value={email} onChange={(e) => setEmail(e.target.value)}
                                />
                                <br />
                            </div>
                            {/* Button */}
                           <div className=" flex justify-between">
                                <div className="flex justify-around mt-4">
                                    <button className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200">
                                        Send Email
                                    </button>
                                </div>
                                <p className=" text-black mt-5 size-10 text-xl">OR</p>
                                <div className="flex justify-around mt-4">
                                    <button className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200" onClick={handlOtp}>
                                        Send OTP
                                    </button>
                                </div>
                           </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Forgotpassword
