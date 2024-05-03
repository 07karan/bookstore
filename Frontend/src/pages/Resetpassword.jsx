import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { resetpasswordRoute } from "../utils/apiRoute";
function Resetpassword() {
    // const location = useLocation();
    const navigate = useNavigate();
    // const from = location.state?.from?.pathname || "/";
    const [password, setPassword] = useState("")
    const [cpassword, setCpassword] = useState("")

    const {id}=useParams();
    const handleSubmit = async () => {
        const userInfo = {
            password,
            cpassword
        };
        
        await axios
            .put(`${resetpasswordRoute}/${id}`, userInfo,)
            .then((res) => {
                console.log(res.data);
                if (res.data) {
                    toast.success("Password Reset Successfully Please Login Again..!!");
                    navigate("/")
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

                            <h3 className="font-bold text-black">Reset Password</h3>
                            {/* Email */}
                            <div className="mt-4 space-y-2">
                                <span className=" text-black">Password :</span>
                                <br />
                                <input
                                    type="text"
                                    placeholder="Enter your Password"
                                    className="w-[28rem]  px-3 py-1 border rounded-md outline-none"
                                    value={password} onChange={(e) => setPassword(e.target.value)}
                                />
                                <br />
                            </div>
                            <div className="mt-4 space-y-2">
                                <span className=" text-black">Confirm Password :</span>
                                <br />
                                <input
                                    type="text"
                                    placeholder="Confirm Password"
                                    className="w-[28rem]  px-3 py-1 border rounded-md outline-none"
                                    value={cpassword} onChange={(e) => setCpassword(e.target.value)}
                                />
                                <br />
                            </div>
                            {/* Button */}
                            <div className="flex justify-around mt-4">
                                <button className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200">
                                    Reset Password
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Resetpassword
