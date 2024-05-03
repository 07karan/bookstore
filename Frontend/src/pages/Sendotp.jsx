import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import axios from 'axios';
import { sendOtpRoute } from '../utils/apiRoute';
const Sendotp = () => {
    const [mobileNumber, setMobileNumber] = useState('');
    const [countryCode, setCountryCode] = useState('+91');
    const navigate=useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const phone=countryCode+mobileNumber;
        if(mobileNumber===""){
            toast.error("Please enter a mobile number..!!")
        }
        const res = await axios.post(sendOtpRoute, { phone },{
            headers:{
                "Content-Type": "application/json"
            }
        })
        const data=res.data;
        // console.log(data);
        toast.success("OTP Send Successfully..!!");
        navigate('/verifyotp');
    };

    return (
        <div className="flex h-screen items-center justify-center text-black">
            <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md">
                <h2 className="text-2xl font-bold text-center mb-4">Verify Your Mobile Number</h2>
                <form onSubmit={handleSubmit}>
                    
                    <div className="flex items-center justify-center mb-4">
                        <input
                            type="text"
                            className="w-1/3 p-2 border border-gray-300 rounded-l-md focus:outline-none"
                            value={countryCode}
                            onChange={(e) => setCountryCode(e.target.value)}
                        />
                        <input
                            type="text"
                            className="w-2/3 p-2 border border-gray-300 rounded-r-md focus:outline-none"
                            placeholder="Enter your mobile number"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-700 focus:outline-none"
                    >
                        Send OTP
                    </button>
                </form>
                {/* <p className="mt-4 text-center">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-500 underline">
                        Login
                    </Link>
                </p> */}
            </div>
        </div>
    );
}
export default Sendotp
