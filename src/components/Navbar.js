import React from "react";
import { NavLink,Link,useNavigate} from "react-router-dom";
import { getCartItemsbyUserId,getUsersMe2 } from "../apiAdapter";
import { useState,useEffect } from "react";

const Navbar = ({setIsLoggedIn,setIsAdmin,isLoggedIn,isAdmin}) => {
 
const navigate = useNavigate()
   function handleLogout (){
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.removeItem("admin")
    localStorage.removeItem('brand')
    setIsLoggedIn(false)
    setIsAdmin(false)
    navigate('/')
   }
  //  const [cartItems, setCartItems] = useState([])

  //  async function fetchCart() {
  //   const token = localStorage.getItem("token");
  //    if (token) {
   
  //   const getUser = await getUsersMe2(token);
  //   const getCartItems = await getCartItemsbyUserId(getUser.id);
  //   setCartItems(getCartItems);
  //    }
  // }

  // console.log(cartItems.length)

  // useEffect(() => {
  //   if (token)
  //   fetchCart();
  // }, []);


    return ( 
       
<nav className="bg-rose-900 select-none shadow-lg ">
  <div className="md:flex md:justify-between md:items-center lg:items-center lg:justify-center ">
    <div className="flex justify-between items-center ">
        <img src={require('../components/Logo/coffee.png')} className="sm:hidden lg:w-32 lg:inline" href="#"/>
    </div>

     {/* Here is were we can add more links to the navbar */}
    <div className="flex items-center justify-evenly w-screen  gap-x-20 ">
      <NavLink to="/" className="my-1 text-3xl text-gray-200 font-medium  hover:text-yellow-600 hover:scale-125 transition duration-400 md:my-0 " >Home
      </NavLink>
      {isAdmin && isLoggedIn ?  (<div className="flex flex-col sm:flex-row md:flex-row gap-x-60 sm:gap-x-8 md:mx-6 lg:gap-x-20 xl:gap-x-20 justify-center ">
      <NavLink to='/createProduct' className=" my-1 text-3xl text-gray-200 font-medium  hover:text-yellow-600 hover:scale-125 transition duration-400 md:my-0 " >Create Product
      </NavLink>
      <NavLink to='/merchantProduct' className="my-1 text-3xl text-gray-200 font-medium  hover:text-yellow-600 hover:scale-125 transition duration-400 md:my-0" >My Products
      </NavLink>
      {/* <NavLink to='/sellerProducts' className="my-1 text-3xl text-gray-200 font-medium  hover:text-yellow-600 hover:scale-125 transition duration-400 md:my-0" >My Products
      </NavLink>  */}
  
      </div>): !isAdmin && isLoggedIn ? (
        <div className="flex justify-center ">
        <Link to='/cart' className="relative text-gray-200 hover:text-yellow-600">
          <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
           {/* This is the blue dot on the cart,IDK if we should change it to a number that displays how many items are in the cart or get rid of it? */}

          <span className="absolute top-0 left-0 rounded-full bg-indigo-500 text-white p-1 text-xs"></span>

          </Link>

          <NavLink to='/OrderHistory' className="my-1 text-3xl text-gray-200 font-medium  hover:text-yellow-600 hover:scale-125 transition duration-400 md:my-0" >OrderHistory
      </NavLink>
  

      </div>
      ) : (
<div className="inline-flex flex-col md:flex-row md:mx-6 gap-x-60  xl:gap-x-20 sm:flex-row justify-center sm:gap-x-20 ">
        <NavLink to="/login" className="my-1 text-3xl text-gray-200 font-medium text- hover:text-yellow-600 hover:scale-125  transition duration-400  md:my-0 ">Log In
        </NavLink>
        <NavLink to="/register" className="my-1 text-3xl text-gray-200 font-medium hover:text-yellow-600 hover:scale-125  transition duration-400  md:my-0" >Register
        </NavLink>
        <Link to='/publiccart' className="relative text-gray-200 hover:text-yellow-600">
          <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
           {/* This is the blue dot on the cart,IDK if we should change it to a number that displays how many items are in the cart or get rid of it? */}
          <span className="absolute top-0 left-0 rounded-full bg-indigo-500 text-white p-1 text-xs"></span>
          </Link>
        
      </div>

      )}

         {isLoggedIn ?  <button onClick={handleLogout} className="relative bg-yellow-600 px-6 py-2 border-2 rounded-md border-black font-medium ">Log Out</button> : null}

      
  
          
        
      

    </div>
  </div>
</nav>
  


  
    );
  };
  
  export default Navbar;