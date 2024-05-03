const isOtpExpired = async (otpExpirationTime) => {
  try {
    const currentDateTime = new Date();
    const diffValue = (otpExpirationTime - currentDateTime.getTime()) / 1000;
    const minutes = Math.abs(diffValue / 60);

    console.log("Time difference until expiration: " + minutes + " minutes");

    return minutes > 10; 
  } catch (error) {
    console.error("Error in OTP expiration check:", error.message);
    throw error;
  }
};

export default isOtpExpired;
