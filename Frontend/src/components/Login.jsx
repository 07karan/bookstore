import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { loginRoute } from "../utils/apiRoute";
function Login() {
  const navigate=useNavigate();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  // console.log(loginRoute);
  const handleSubmit = async () => {
    
    const userpass=localStorage.getItem("Users");
    if(userpass!==password){
      navigate("/");
    }

    const userInfo = {
      email,
      password
    };
    await axios
      .post(loginRoute, userInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          toast.success("Logged In Successfully");
          document.getElementById("my_modal_3").close();
          setTimeout(() => {
            window.location.reload();
            localStorage.setItem("Users", JSON.stringify(res.data.user));
            localStorage.setItem("Token", JSON.stringify(res.data.user.token));
          }, 1000);
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log(err);
          toast.error("Error: " + err.response.data.message);
          setTimeout(() => {}, 2000);
        }
      });
  };
  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form onSubmit={handleSubmit} method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <Link
              to="/"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => document.getElementById("my_modal_3").close()}
            >
              ✕
            </Link>

            <h3 className="font-bold text-lg text-black">Login</h3>
            {/* Email */}
            <div className="mt-4 space-y-2">
              <span className=" text-black">Email :</span>
              <br />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-[28rem]  px-3 py-1 border rounded-md outline-none text-black"
                value={email} onChange={(e)=>setEmail(e.target.value)}
              />
              <br />
            </div>
            {/* password */}
            <div className="mt-4 space-y-2">
              <span className=" text-black">Password :</span>
              <br />
              <input
                type="password"
                placeholder="Enter your password"
                className="w-[28rem] px-3 py-1 border rounded-md outline-none text-black"
                value={password} onChange={(e) => setPassword(e.target.value)}
              />
              <br />
            </div>

            {/* Button */}
            <div className="flex justify-around mt-6">
              <button className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200">
                Login
              </button>
              <p className=" text-black">
                Not registered? 
                <Link
                  to="/signup"
                  className="underline text-blue-500 cursor-pointer"
                >
                   Signup
                </Link>
              </p>
            </div>
            <p className=" text-black py-[30px] align-center justify-center">
              Forgot Password ? 
              <Link
                to="/forgotpassword"
                className="underline text-blue-500 cursor-pointer"
              >
                Click Here
              </Link>
            </p>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default Login;
