import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import {
  Login,
  Register,
  Product,
  Navbar,
  Cart,
  CreateProduct,
  MerchantLogin,
  MerchantRegister,
  MerchantProducts,
  SingleProduct,
  PublicCart,
  OrderHistory,
} from ".";

const App = () => {
  const [productsList, setProductsList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
    if (localStorage.getItem("admin")) {
      setIsAdmin(true);
    }
  }, []);
  return (
    <div>
      <div>
        <Navbar
          setIsLoggedIn={setIsLoggedIn}
          setIsAdmin={setIsAdmin}
          isLoggedIn={isLoggedIn}
          isAdmin={isAdmin}
        />
      </div>
      {isLoggedIn && isAdmin ? (
        <Routes>
          <Route path="/merchantProduct" element={<MerchantProducts />} />
          <Route
            exact
            path="/"
            element={
              <Product
                productsList={productsList}
                setProductsList={setProductsList}
                isLoggedIn={isLoggedIn}
                isAdmin={isAdmin}
                carts={carts}
                setcarts={setCarts}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart carts={carts} setcarts={setCarts} isLoggedIn={isLoggedIn} />
            }
          />
          <Route
            path="/createProduct"
            element={
              <CreateProduct
                productsList={productsList}
                setProductsList={setProductsList}
              />
            }
          />
          <Route
            path="/SingleProduct"
            element={
              <SingleProduct isAdmin={isAdmin} isLoggedIn={isLoggedIn} />
            }
          />
        </Routes>
      ) : !isAdmin && isLoggedIn ? (
        <Routes>
          <Route path="/OrderHistory" element={<OrderHistory />} />
          <Route
            exact
            path="/"
            element={
              <Product
                productsList={productsList}
                setProductsList={setProductsList}
                isLoggedIn={isLoggedIn}
                isAdmin={isAdmin}
                carts={carts}
                setcarts={setCarts}
              />
            }
          />
          <Route path="/cart" element={<Cart isLoggedIn={isLoggedIn} />} />
          <Route
            path="/SingleProduct"
            element={
              <SingleProduct isAdmin={isAdmin} isLoggedIn={isLoggedIn} />
            }
          />
        </Routes>
      ) : (
        <Routes>
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/register" element={<Register />} />
          <Route
            exact
            path="/"
            element={
              <Product
                productsList={productsList}
                setProductsList={setProductsList}
                isLoggedIn={isLoggedIn}
                isAdmin={isAdmin}
                carts={carts}
                setcarts={setCarts}
              />
            }
          />
          <Route
            path="/publiccart"
            element={
              <PublicCart
                carts={carts}
                setcarts={setCarts}
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route
            path="/adminLogin"
            element={
              <MerchantLogin
                setIsLoggedIn={setIsLoggedIn}
                setIsAdmin={setIsAdmin}
              />
            }
          />
          <Route
            path="/adminRegister"
            element={
              <MerchantRegister
                setIsLoggedIn={setIsLoggedIn}
                setIsAdmin={setIsAdmin}
              />
            }
          />
          <Route
            path="/SingleProduct"
            element={<SingleProduct isAdmin={isAdmin} />}
            isLoggedIn={isLoggedIn}
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
