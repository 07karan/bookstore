import axios from 'axios';
import { useState } from 'react';
import { verifyOtpRoute } from '../utils/apiRoute';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
function VerifyOTP() {
    // const userId=useParams();
    const [otp, setOtp] = useState(['', '', '', '']);
    const [mobileNumber, setMobileNumber] = useState('');
    const [countryCode, setCountryCode] = useState('+91');
    const navigate=useNavigate();

    const handleChange = (index, value) => {
        if (isNaN(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        const phone=countryCode+mobileNumber;
        const OTP = otp.join('');
        const res = await axios.post(verifyOtpRoute, { phone, OTP },{
        headers: {'Content-Type': 'application/json'},
       })
       const data=res.data;
        const userId = data.otpData._id;
        toast.success("OTP Verify Successfully..!!");
        navigate(`/resetpassword/${userId}`);
    };

    return (
        <div className="flex h-screen items-center justify-center text-black">
            <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md">
                <h2 className="text-2xl font-bold text-center mb-4">Verify Your OTP</h2>
                <form onSubmit={handleSubmit}>
                    <div className="flex items-center justify-center mb-4">
                        <input
                            type="text"
                            className="w-1/5 p-2 border border-gray-300 rounded-l-md focus:outline-none"
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
                    <div className="flex justify-center mb-4 space-x-4">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength={1}
                                className="w-[4rem] h-12 text-4xl text-center border border-gray-300 rounded-md focus:outline-none"
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                            />
                        ))}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-700 focus:outline-none"
                    >
                        Verify OTP
                    </button>
                </form>
                <p className="mt-4 text-center">
                    Didn't receive OTP?{"  "}
                    <button className="text-blue-500 underline focus:outline-none"><Link to="/sendotp">Resend OTP</Link></button>
                </p>
                {/* <p className="mt-2 text-center">
                    <Link to="/login" className="text-blue-500 underline">
                        Back to Login
                    </Link>
                </p> */}
            </div>
        </div>
    );
}

export default VerifyOTP;
