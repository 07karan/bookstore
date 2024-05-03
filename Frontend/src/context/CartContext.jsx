import {  createContext, useContext, useReducer } from "react";
import reducer from "../reducers/Cartreducer";

const cartContext=createContext();

const intialState={
    cart:[],
    total_item:"",
    total_amt:""
}


const CartProvider=({children})=>{

    const [state,dispatch]=useReducer(reducer,intialState);

    const addToCart=(id,name,desc,image,price)=>{
        dispatch({type:"ADD_TO_CART",payload:{id,name,desc,image,price}})
    }
    return <cartContext.Provider value={{...state,addToCart}}>{children}</cartContext.Provider>
}

const useCartContext=()=>{
    return useContext(cartContext)
}

export {CartProvider,useCartContext};