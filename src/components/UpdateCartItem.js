import React, { useState, useEffect } from "react";
import { editCartItemsbyId, getCartItemsbyUserId,getUsersMe2 } from "../apiAdapter";

const UpdateCartItem =({cartItems,setCartItems,cartItemId})=>{
    const [cartQuantity,setCartQuantity] = useState(1);

  async function handleSubmit (event) {
    event.preventDefault()
    const token = localStorage.getItem("token");
    const getUser = await getUsersMe2(token);
    console.log(cartItemId, "Show me the cart ID")
    await editCartItemsbyId(token, cartItemId, cartQuantity)
      const newEditedCartItem = await  getCartItemsbyUserId(getUser.id);

      setCartItems(newEditedCartItem);
    
    }
    
    useEffect(() => {}, [cartItems]);
    
    return(
        <div className="select-none ">
      <form onSubmit={handleSubmit}>
              <label>
          QTY:

          <input className="  mx-2 text-black rounded-md w-16 focus:outline-none focus:ring-rose-900 focus:border-rose-900 focus:z-10 focus:ring-1 "
            type="number"
            min='1'
            value={cartQuantity}
            onChange={(event) => {
              setCartQuantity(event.target.value);
            }}
          />
         
        </label>
        <button type='submit'>Update</button>
         </form>
        </div>
    )}
export default UpdateCartItem;