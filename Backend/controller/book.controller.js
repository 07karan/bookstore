import Book from "../model/book.model.js";
import Service from "../model/service.model.js";

export const getBook = async(req, res) => {
    try {
        const book = await Book.find();
        res.status(200).json(book);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json(error);
    }
};

export const service=async(req,res)=>{
    try {
        const service=await Service.find({});
        res.status(200).json({message:"Services Get Successfully..!!",data:service});
    } catch (error) {
        res.status(500).json({message:"Internal Server Error..!!"+error.message});
    }
}


export const getOneBook=async(req,res)=>{
    try {
        const id=req.params.id;
        const book=await Book.findById(id);
        if(!book){
            return res.status(404).json({message:"Book Is Not Available..!!"});
        }
        return res.status(200).json({message:"Get All Details Of Book ..!!",data:book});
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error..!!"+error.message});
    }
}


export const searchBook=async(req,res)=>{
    try {
        const query=req.query.name;
       const book = await Book.find({
         name: { $regex: query, $options: "i" },
       });
        console.log(book);
        if(!book){
            return res.status(404).json({message:"Book Is Not Available..!!"});
        }
        return res.status(200).json({message:"Book Find..!!",book});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message:"Internal Server Error..!!"});
    }
}
