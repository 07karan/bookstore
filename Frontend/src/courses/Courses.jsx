import Navbar from "../components/Navbar";
import Course from "../components/Course";
import Footer from "../components/Footer";
import { useState } from "react";
import axios from "axios";
function Courses() {
  const [query, setQuery] = useState("")
  const [searchResult,setSearchResult]=useState([])
  const handleQuery = async () => {
    try {
      if(query.trim()!==""){

        const res = await axios.get(`https://bookstore-1gta.onrender.com/book/search?name=${query}`)
        const data = res.data;
        setSearchResult(data.book);
        // setQuery("");
      }
      else{
        setSearchResult([])
        
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleKeyPress=(e)=>{
    if(e.key==="Enter"){
      handleQuery();
    }
  }

  const bookDetails=()=>{
    navigate(``)
  }
  return (
    <>
      <Navbar handleQuery={handleQuery} query={query} setQuery={setQuery} handleKeyPress={handleKeyPress}/>
      <div className="min-h-screen">
        {
          searchResult.length >0 
          ?
          (
              
                searchResult.map((ele) => (
                  <>
                    <div className="flex justify-center ">
                      <div className="mt-4 p-3 max-w-md">
                        <div className="mt-[5rem] card bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">
                          <figure>
                            <img src={ele.image} alt="Shoes" />
                          </figure>
                          <div className="card-body">
                            <h2 className="card-title">
                              {ele.name}
                              <div className="badge badge-secondary">{ele.category}</div>
                            </h2>
                            <p>{ele.title}</p>
                            <div className="card-actions justify-between">
                              <div className="badge badge-outline"> &#8377;{ele.price}</div>
                              <div
                                className="cursor-pointer px-2 py-1 rounded-full border-[2px] hover:bg-pink-500 hover:text-white duration-200"
                              onClick={bookDetails}
                              >
                                More Info
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>

                ))
              
          )
          :

        <Course />
        }
      </div>
      <Footer />
    </>
  );
}

export default Courses;
