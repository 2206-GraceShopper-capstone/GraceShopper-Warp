import React, { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import { getProducts } from "../apiAdapter";
import '../input.css';
import CreateProduct from "./CreateProduct";



const Products = ({productsList, setProductsList, isLoggedIn, isAdmin}) => {
  const [isShown,setIsShown] = useState(false)
    
        async function btnClick () {
          setIsShown((current)=>!current)
        }
   
    
    useEffect(() => {
        getProducts().then((results) => {
            setProductsList(results)
        })
    }, [])
    
    return (
        <div className="bg-gradient-to-t from-rose-300 to-yellow-600 h-screen  flex justify-center items-center ">
          <div className="max-w-2xl mx-0 py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-1  ">
            
    

            <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-9 ">
              {productsList.map((element, index) => (
                <a  key={`Product ${index}`}  className="group">
                    
                  <div className="w-full aspect-w-1 aspect-h-1 bg-gray-800 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8 group-hover:shadow-xl  ">
  
                    <img
                      src={require('./Logo/coffeeBag.jpg')}
                      className="w-full h-full object-center object-cover group-hover:opacity-50 group-hover:scale-110 transition duration-500  " 
                    /> 
                    
                  </div>
                  
                  <h3 className="mt-4 text-xl text-gray-700">{element.name} <button className="ml-28 border-zinc-900 border-solid border-2 rounded-md ">Details</button></h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">${element.price}</p>
                  
                </a>
              ))}
               {isLoggedIn && isAdmin ? 
              <button onClick={btnClick}>Create Product</button>
               : null}
               {isShown && (<CreateProduct />)} 
            </div>
          </div>
        </div>
      )
     
    }

export default Products;