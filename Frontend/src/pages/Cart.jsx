import { useState } from 'react';
import { useCartContext } from '../context/CartContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Cart = () => {
    const { cart } = useCartContext();
    const [total, setTotal] = useState(0);
    const navigate=useNavigate();
    const shipping = 5;

    // Calculate total price dynamically when quantity changes
    const calculateTotal = () => {
        let totalPrice = 0;
        cart.forEach((item) => {
            totalPrice += item.price * item.quantity;
        });
        setTotal(totalPrice);
    };

    // Increment quantity of an item in the cart
    const incrementQuantity = (index) => {
        const updatedCart = [...cart];
        updatedCart[index].quantity += 1;
        calculateTotal();
    };

    // Decrement quantity of an item in the cart
    const decrementQuantity = (index) => {
        const updatedCart = [...cart];
        if (updatedCart[index].quantity > 1) {
            updatedCart[index].quantity -= 1;
            calculateTotal();
        }
    };


    const makePayment = async (e) => {
        if (!localStorage.getItem("Users")) {
          navigate("/");
          toast.error("You Don't have access please login..!!");
        }else {
          const body = {
            // name: cart.name,
            //   price: cart.price,
            // currency: "INR",
            //   ReciptId: cart._id,
            //   quantity:cart.quantity
            // cart:cart
          };
          const headers = {
            "Content-Type": "application/json",
          };

          const res = await axios.post(
            "https://bookstore-1gta.onrender.com/user/order",
            {currency:"INR",cart},
            headers
          );
          const resp = res.data;
          console.log(resp);
            for (const item of cart) {
                const {price,quantity,desc } = item;
                const amt=price*quantity;
                const totalamount=amt*100
                var options = {
                    key: "",
                    price: totalamount+shipping,
                    currency: "INR",
                    name: "Bookstore",
                    description: "Test Transactions",
                    image: desc,
                    order_id: resp.orders[0].id,
                    quantity:quantity
                }
          }

          console.log(options);
          const razor = new Razorpay(options);
          console.log(razor);
          razor.on("Payment Failed", () => {
            alert("Payment Failed");
          });

          razor.open();
          e.preventDefault();

        //   const response = await axios.post("https://bookstore-1gta.onrender.com/user/generateinvoice",body,headers)
        //   const data1=response.data;
        //   console.log(data1)
          navigate(`/success`);

    }
}
    return (
       <>
            <div className={` h-screen pt-20 ${cart.length > 3 ? 'bg-black':''} text-white`}>
                <h1 className="mb-10 text-center text-2xl font-bold">{`Cart Items (${cart.length})`}</h1>
                <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 text-black">
                    {/* Cart items */}
                    <div className="rounded-lg md:w-2/3">
                        {cart.map((item, index) => (
                            <div key={index} className="mb-6 bg-white rounded-lg shadow-md sm:flex sm:justify-between">
                                {/* Your cart item card */}
                                <img src={item.desc} alt="product-image" className="w-full rounded-t-lg sm:w-40 sm:rounded-none" />
                                <div className="p-6 sm:px-4 sm:py-2">
                                    <div className="mt-2">
                                        <h2 className="text-lg font-bold text-gray-900">{item.name}</h2>
                                        <p className="mt-1 text-xs text-gray-700">{item.title}</p>
                                    </div>
                                    <div className="mt-4 flex justify-between sm:flex-col sm:mt-0 sm:space-y-6 sm:items-start">
                                        <div className="flex items-center">
                                            <span className="cursor-pointer bg-gray-100 rounded-l py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={() => decrementQuantity(index)}> - </span>
                                            <input className="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value={item.quantity} min="1" readOnly />
                                            <span className="cursor-pointer bg-gray-100 rounded-r py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={() => incrementQuantity(index)}> + </span>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <p className="text-sm">Price: &#8377;{item.price}</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Checkout section */}
                    <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                        <div className="mb-2 flex justify-between">
                            <p className="text-gray-700">Subtotal</p>
                            <p className="text-gray-700">&#8377;{total}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-gray-700">Shipping</p>
                            <p className="text-gray-700">&#8377;{shipping}</p>
                        </div>
                        <hr className="my-4" />
                        <div className="flex justify-between">
                            <p className="text-lg font-bold">Total</p>
                            <div className="">
                                <p className="mb-1 text-lg font-bold">&#8377;{total + shipping}</p>
                                <p className="text-sm text-gray-700">including VAT</p>
                            </div>
                        </div>
                        <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600" onClick={makePayment}>Check out</button>
                    </div>
                </div>
            </div>

       </>

    );
};

export default Cart;
