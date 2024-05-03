

function Servicecard({ item }) {
    const shortenedDesc = item.desc.length > 255 ? item.desc.slice(0, 100) + '...' : item.desc;
    return (
        <>
            <div className="mt-4 my-3 p-3">
                <div className="card w-92 bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">
                    <figure>
                        <img src={item.image} alt="Shoes" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">
                            {item.title}
                            {/* <div className="badge badge-secondary">{item.category}</div> */}
                        </h2>
                        <p>{shortenedDesc}</p>
                        <div className="card-actions justify-between">
                            {/* <div className="badge badge-outline">${item.price}</div> */}
                            <div className=" cursor-pointer px-2 py-1 rounded-full border-[2px] hover:bg-pink-500 hover:text-white duration-200">
                                Read More
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Servicecard
