import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOneBook } from "../utils/apiRoute";

function Bookdetails() {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        const getBook = async () => {
            try {
                const res = await axios.get(`${getOneBook}/${id}`);
                console.log(res.data);
                setBook(res.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        getBook();
    }, [id]);

    return (
        <>
            
            <div className="mt-4 my-3 p-3">
                <div className="card w-92 bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">
                    {book && (
                        <div className="card lg:card-side bg-base-100 shadow-xl" key={book._id}>
                            <figure><img src={book.image} alt="Album" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{book.name}</h2>
                                <p>{book.title}</p>
                                <div className="badge badge-outline">${book.price}</div>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary">Buy Now</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        
        </>
    );
}

export default Bookdetails;
