import React, { useState, useEffect } from 'react'
import { getProductsByAdmin,getUsersMe } from '../apiAdapter'
import {DeleteProduct, UpdateProducts} from './index'
import { Link } from 'react-router-dom'



 const MerchantProducts  = () => {
const [myProducts, setMyProducts] = useState([])
const brand = localStorage.getItem('brand')
async function fetchMyProducts() {
  
  const token = localStorage.getItem('token')
  const username = localStorage.getItem('username')
  const user = await getUsersMe(token)
  if (user.username === username) {
    const allMyProducts = await getProductsByAdmin(username)
    setMyProducts(allMyProducts)
    
  }
}


useEffect(() => {
  fetchMyProducts()
}, []);

  return (
    <div className="bg-gradient-to-t from-rose-300 to-yellow-600 h-screen flex flex-col justify-center items-center select-none">
       
    <h1 className=' text-center text-6xl mt-24'>{brand}</h1>
    <div className=" mx-0 py-16 px-4 sm:py-24 sm:px-12 lg:w-full lg:h-full lg:px-9 sm:h-full ">
      <div className=" grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-10 xl:w-full  ">
       
        {myProducts.map((element, index) => (
          
            <div key={`Product ${index}`} className=" flex flex-col   ">
            <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8 l xl:max-w-sm ">
              <img
                src={require("./Logo/coffeeBag.jpg")}
                className=" xl:max-w-full h-full object-center object-cover "
              />
            </div>

            <h3 className=" text-center mt-2 text-2xl  text-gray-700 justify-center">
              {element.name}
            </h3>
            <p className="text-center mt-1 text-xl font-medium text-gray-900 ">
              ${element.price}
            </p>

            <Link to='/SingleProduct'
              state={{productId: element.id}}
              className=" max-w-fit container text-center font-medium mt-2 px-4 py-1 border-zinc-900 border-solid border-2 rounded-md bg-orange-300 hover:bg-rose-900 hover:text-yellow-600 transition duration-500"
            >
              Details
            </Link>
            <DeleteProduct myProducts={myProducts} setMyProducts={setMyProducts} productId={element.id}/>
            <div className='w-full h-full'>
                <UpdateProducts
                        myProducts={myProducts} setMyProducts={setMyProducts} productId={element.id}
                        />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  )
}

export default MerchantProducts