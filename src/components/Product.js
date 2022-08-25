import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { AddProductToCart } from ".";
import { getProducts } from "../apiAdapter";
import "../input.css";

const Products = ({ productsList, setProductsList, isLoggedIn, isAdmin }) => {
  const navigate = useNavigate();

  async function fetchAllProducts() {
    try {
      const newproducts = await getProducts();

      setProductsList(newproducts);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div className="bg-gradient-to-t from-rose-300 to-yellow-600 h-screen  flex justify-center items-center pb-24 ">
      <div className=" mx-0 py-16 px-4 sm:py-24 sm:px-12 sm:max-h-full lg:max-w-full lg:max-h-full lg:px-9 overflow-y-scroll">
        <div className=" grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-10 xl:max-w-full  ">
          {productsList.map((element, index) => (
            <div key={`Product ${index}`} className="group">
              <div className="w-full aspect-w-1 aspect-h-1 bg-gray-800 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8 group-hover:shadow-2xl xl:max-w-sm ">
                <img
                  src={require("./Logo/coffeeBag.jpg")}
                  className=" xl:max-w-full h-full object-center object-cover  group-hover:scale-150 transition duration-500"
                />
              </div>

              <h3 className=" text-center mt-2 text-2xl  text-gray-700 justify-center">
                {element.name}
              </h3>
              <p className="text-center mt-1 text-xl font-medium text-gray-900 ">
                ${element.price}
              </p>
              <div className=" inline-flex text-center items-center w-full gap-14 text-clip">
                <Link
                  to="/SingleProduct"
                  state={{ productId: element.id }}
                  className="container font-medium mt-2 px-4 py-1 border-zinc-900 border-solid border-2 rounded-md bg-orange-300 hover:bg-rose-900 hover:text-yellow-600 transition duration-500"
                >
                  Details
                </Link>
                {!isAdmin ? (
                  <AddProductToCart
                    productsList={productsList}
                    setProductsList={setProductsList}
                    productId={element.id}
                    productPrice={element.price}
                  />
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
