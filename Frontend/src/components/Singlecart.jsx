import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from 'axios';
import { useCartContext } from "../context/CartContext";

const Singlecart = () => {
    const { id } = useParams();
    const [info, setInfo] = useState({});
    const {name,image,price,desc,title}=info;

    const {addToCart}=useCartContext()
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/book/${id}`);
                const data = res.data;
                setInfo(data.data);
                console.log(data);
            } catch (error) {
                console.error('Error downloading PDF:', error);
            }
        };
        fetchdata();
    }, [id]); // Adding id as dependency to useEffect

    return (
        <div className="flex justify-center items-center h-screen">
            <div className=" max-w-lg bg-white shadow-md rounded-md overflow-hidden">
                <div className="flex">
                    <img className="w-1/2 h-68 object-cover" src={image} alt="Product" />
                    <div className="flex flex-col justify-between p-4 w-1/2">
                        <h2 className="text-xl font-semibold mb-2 text-black">{name}</h2>
                        <p className="text-gray-600 mb-2 text-lg font-semibold">{title}.</p>
                        <p className="text-gray-600 mb-2">{desc}.</p>
                        <div className="flex justify-between items-center">
                            <p className="text-gray-800 font-semibold">Price: &#8377;{price}</p>
                            <NavLink to="/cart" onClick={()=>addToCart(id,name,image,desc,price)}>
                                <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    Add to Cart
                                </button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Singlecart;
