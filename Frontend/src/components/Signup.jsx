import { Link, useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { signupRoute } from "../utils/apiRoute";
import Navbar from "./Navbar";
// import Footer from "./Footer";
function Signup() {
  // const location = useLocation();
  const navigate = useNavigate();
  const [fullname,setFullName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [phone,setPhone]=useState("")

  const handleSubmit = async () => {
    const userInfo = {
      fullname,
      email,
      password,
      phone
    };
    await axios
      .post(signupRoute, userInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          toast.success("Signup Successfully");
          navigate('/');
        }
        localStorage.setItem("Users", JSON.stringify(res.data.user));
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
      <div className="flex h-screen items-center justify-center text-black">
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

              <h3 className="font-bold text-lg text-black">Signup</h3>
              <div className="mt-4 space-y-2">
                <span className=" text-black">Name :</span>
                <br />
                <input
                  type="text"
                  placeholder="Enter your fullname"
                  className="w-[28rem] px-3 py-1 border rounded-md outline-none text-black"
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
                  className="w-[28rem] px-3 py-1 border rounded-md outline-none text-black"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                />
                <br />
              </div>
              {/* Password */}
              <div className="mt-4 space-y-2">
                <span className=" text-black">Password :</span>
                <br />
                <input
                  type="text"
                  placeholder="Enter your password"
                  className="w-[28rem] px-3 py-1 border rounded-md outline-none text-black"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                />
                <br />
              </div>

              <div className="mt-4 space-y-2">
                <span className=" text-black">Phone :</span>
                <br />
                <input
                  type="text"
                  placeholder="Enter your password"
                  className="w-[28rem] px-3 py-1 border rounded-md outline-none text-black"
                  value={phone} onChange={(e) => setPhone(e.target.value)}
                />
                <br />
              </div>
              {/* Button */}
              <div className="flex justify-around mt-4">
                <button className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200">
                  Signup
                </button>
                <p className="text-xl text-black">
                  Have account?
                  <button
                    className="underline text-blue-500 cursor-pointer"
                    onClick={() =>
                      document.getElementById("my_modal_3").showModal()
                    }
                  >
                    Login
                  </button>
                  <Login />
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    {/* <Footer></Footer> */}
    </>
  );
}

export default Signup;
