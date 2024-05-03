import { useState } from "react";
import banner from "../../public/Banner.png";
import { useAuth } from "../context/AuthProvider";
import {  problemRoute } from "../utils/apiRoute";
import axios from "axios";
import toast from "react-hot-toast";
function Banner() {
  const [authUser, setAuthUser] = useAuth();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleProblem=async(e)=>{
    e.preventDefault();
    const userInfo = {
      fullname,
      email,
      message
    };
    await axios
      .post(problemRoute, userInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          toast.success("Send Message Successfully Please Login Again..!!");
        }
        // localStorage.setItem("Users", JSON.stringify(res.data.user));
      })
      .catch((err) => {
        if (err.response) {
          console.log(err);
          toast.error("Error: " + err.response.data.message);
        }
      });
      setEmail("");
      setMessage("");
      setFullname("");
  }
  return (
    <>
      <div className=" max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-10 ">
        <div className="w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-36">
          <div className="space-y-8">
            <h1 className="text-2xl md:text-4xl font-bold">
              Hello, welcomes here to learn something &nbsp;
              <span className="text-pink-500">new everyday!!!</span>
            </h1>
            <p className="text-sm md:text-xl">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor,
              et totam. Tempora amet atque expedita, quae corrupti totam sed
              pariatur corporis at veniam est voluptas animi!
            </p>
            {authUser ? (
              <p>
                
                Welcome back,
                <h1 className="text-pink-500 font-bold text-lg">
                  {authUser.fullname}..!!
                </h1>
                We're thrilled to see you again. Explore our latest offerings,
                discover new features, and make the most of your experience with
                us. If you have any questions or need assistance, feel free to
                reach out. Happy browsing!"
              </p>
            ) : (
              <>
              <form onSubmit={handleProblem} >

                <h1>Any Problem At the time of Login please Conatct 🧛‍♀️</h1>
                <label className="input input-bordered flex items-center gap-2">
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70"
                  >
                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                  </svg> */}

                      <input type="text" className="grow text-black" placeholder="Enter Your Name" value={fullname} onChange={(e)=>setFullname(e.target.value)} />
                </label>
                <br />
                <label className="input input-bordered flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70"
                  >
                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                  </svg>

                      <input type="text" className="grow text-black" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                </label>
                <br />
                <label className="input input-bordered flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70"
                  >
                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                  </svg>

                  <input
                    type="text"
                        className="grow text-black"
                    placeholder="Send Message"
                    value={message} onChange={(e) => setMessage(e.target.value)}
                    />
                </label>
                <button className="btn mt-6 btn-secondary" type="submit">Send Message</button>
            </form>
              </>
            )}
          </div>
        </div>
        <div className=" order-1 w-full mt-20 md:w-1/2">
          <img
            src={banner}
            className="md:w-[550px] md:h-[460px] md:ml-12"
            alt=""
          />
        </div>
      </div>
    </>
  );
}

export default Banner;
