import React, { useState, useEffect } from "react";

import {
  addProductsToCart,
  getAllCartsByUserId,
  getUsersMe2,
  getCartItemsbyUserId,
  getProductsById,
} from "../apiAdapter";

import { useNavigate } from "react-router-dom";
const AddProductToCart = ({ productsList, setProductsList, productId, productPrice, isLoggedIn }) => {

  const [price, setPrice] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const [selectedCart, setSelectedCart] = useState([]);
  const [error, setError] = useState(null);
  const [carts, setCarts] = useState([]);
  const [guestCart, setGuestCart] = useState([])
  const navigate = useNavigate();

  async function fetchCart() {
    const token = localStorage.getItem("token");

    // console.log(getUser, 'the user')
    console.log("CREATING CART FOR USER");
    if (token) {
      const getUser = await getUsersMe2(token);
      console.log(getUser, 'the user')
      const getTheCart = await getAllCartsByUserId(token, getUser.id);
      console.log(getTheCart, "cart")
      const getCartItems = await getCartItemsbyUserId(getUser.id);
      console.log(getCartItems, "SOHW ME THE CART ITEMS");
      console.log(getTheCart, "cart");
      setSelectedCart(getTheCart);
    }
  }
console.log(guestCart, 'line 38')
  useEffect(() => {
    if (!isLoggedIn) {
console.log(guestCart, 'guest')
      localStorage.setItem('cart', JSON.stringify(guestCart))
   
    console.log(guestCart,'the cart')
    }
    fetchCart();
  }, [guestCart]);

  async function handleSubmit() {
    const token = localStorage.getItem("token");
    if (token) {

   const addedCartProduct = await addProductsToCart(productId, selectedCart.id, quantity, productPrice)
    

    if (addedCartProduct.error) {
      setError(addedCartProduct);
    } else {
      setError(null);
      setCart(addedCartProduct);
      navigate("./");
    }
  } else {
    var newcart = localStorage.getItem('cart')
    newcart = (newcart) ? JSON.parse(newcart) : []
    // console.log(newcart, 'cart')
  

// const guestProduct = productsList.map((product, index)=> product.id
// ) ()
const newGuestP = productsList.filter(pro => pro.id === productId)
console.log(newGuestP, 'new')
for (let i =0; i < newGuestP.length; i++) {

  let info = newGuestP[i]
  console.log(info, 'info')
newcart.push(info)  
}


// cart.push(newGuestP)
console.log(newcart, 'push')
newcart.forEach(object => {
  object.quantity = 1;
})
console.log(newcart, 'the new')
  setGuestCart(newcart)
  console.log(guestCart, 'guest cart')
  }
  } 
console.log(guestCart, 'line 87')

  return (
    <button className="font-medium mt-2 px-4 py-1 border-zinc-900 border-solid border-2 rounded-md bg-orange-300 hover:bg-rose-900 hover:text-yellow-600 transition duration-500"
       onClick={() => handleSubmit(productId)}>Add to Cart</button>
    
  );
};
export default AddProductToCart;
