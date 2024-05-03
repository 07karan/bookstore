// import {loadStripe} from '@stripe/stripe-js'
import axios from "axios";
// import Razorpay from 'razorpay';
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function Cards({ item }) {
  const navigate = useNavigate();

  const makePayment = async (e) => {
    // if (!localStorage.getItem("Users")) {
    //   navigate("/");
    //   toast.error("You Don't have access please login..!!");
    // }else {
    //   const body = {
    //     name: item.name,
    //     price: item.price,
    //     currency: "INR",
    //     ReciptId: item._id,
    //   };
    //   const headers = {
    //     "Content-Type": "application/json",
    //   };

    //   const res = await axios.post(
    //     "http://localhost:8080/api/user/order",
    //     body,
    //     headers
    //   );
    //   const resp = res.data;

    //   var options = {
    //     key: "",
    //     price: item.price * 100,
    //     currency: "INR",
    //     name: "Bookstore",
    //     description: "Test Transactions",
    //     image: item.image,
    //     order_id: resp.order.id,
    //   };

    //   const razor = new Razorpay(options);
    //   console.log(razor);
    //   razor.on("Payment Failed", () => {
    //     alert("Payment Failed");
    //   });

    //   razor.open();
    //   e.preventDefault();

    //   const response = await axios.post("http://localhost:8080/api/user/generateinvoice",body,headers)
    //   const data1=response.data;
    //   console.log(data1)
    //   navigate(`/success`);

    navigate(`/books/${item._id}`)
    }
  

  return (
    <>
      <div className="mt-4 my-3 p-3">
        <div className="card w-92 bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">
          <figure>
            <img src={item.image} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {item.name}
              <div className="badge badge-secondary">{item.category}</div>
            </h2>
            <p>{item.title}</p>
            <div className="card-actions justify-between">
              <div className="badge badge-outline"> &#8377;{item.price}</div>
              {/* <div
                className=" cursor-pointer px-2 py-1 rounded-full border-[2px] hover:bg-pink-500 hover:text-white duration-200"
                // onClick={makePayment}
              >
                Buy Now
              </div> */}
              <div
                className=" cursor-pointer px-2 py-1 rounded-full border-[2px] hover:bg-pink-500 hover:text-white duration-200"
                onClick={makePayment}
              >
                More Info
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;
