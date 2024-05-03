import Home from "./home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Courses from "./courses/Courses";
import Signup from "./components/Signup";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";
import Contact from "./pages/Contact";
import Forgotpassword from "./pages/Forgotpassword";
import Resetpassword from "./pages/Resetpassword";
import Services from "./pages/Services";
import Bookdetails from "./pages/Bookdetails";
import Success from "./pages/Success";
import Cancle from "./pages/Cancle";
import Sendotp from "./pages/Sendotp";
import VerifyOTP from "./pages/VerifyOTP";
import Singlecart from "./components/Singlecart";
import Cart from "./pages/Cart";

function App() {
  const [authUser, setAuthUser] = useAuth();
  // console.log(authUser);
  return (
    <>
      <div className="dark:bg-slate-900 dark:text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/books"
            element={authUser ? <Courses /> : <Navigate to="/signup" />}
          />
          <Route
            path="/service"
            element={authUser ? <Services /> : <Navigate to="/signup" />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/book/:id" element={<Bookdetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/success" element={<Success />} />
          <Route path="/books/:id" element={<Singlecart />} />
          <Route path="/cancle" element={<Cancle />} />
          <Route path="/forgotpassword" element={<Forgotpassword />} />
          <Route path="/sendotp" element={<Sendotp />} />
          <Route path="/verifyotp" element={<VerifyOTP />} />
          <Route path="/resetpassword/:id" element={<Resetpassword />} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
