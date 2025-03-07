import { useState, useEffect } from "react";
// import AuthPage from "./Component/AuthPage.jsx";
import "../../assets/all.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingEffect from "../LoadingEffect.jsx";
import Cart from "../GetCart.jsx";
import GetProduct from "../GetProduct.jsx";
// import PaymentForm from "./Component/PaymentForm.js";
const API_BASE = "https://ec-course-api.hexschool.io/v2";
const API_PATH = "mevius";
function Product() {
  const [cartProductData, setCartProductData] = useState([]);
  const [cartChanged, setCartChanged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productsData, setProductsData] = useState([]);

  const getProduct = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/${API_PATH}/products/all`);
      setProductsData(res.data.products);
      // console.log(res.data);
    } catch (err) {
      toast.error(err.response.data.message, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
      });
    }
  };
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      {/* <AuthPage getProducts={getProduct} setIsAuth={false} /> */}
      <div id="app">
        <div className="container">
          <GetProduct
            productsData={productsData}
            cartChanged={cartChanged}
            setCartChanged={setCartChanged}
          />

          {/* <Cart
            cartChanged={cartChanged}
            setCartChanged={setCartChanged}
            cartProductData={cartProductData}
            setCartProductData={setCartProductData}
            setLoading={setLoading}
          /> */}
          {/* <PaymentForm
            setLoading={setLoading}
            cartChanged={cartChanged}
            setCartChanged={setCartChanged}
            cartProductData={cartProductData}
          /> */}
        </div>
      </div>
      <div>
        <ToastContainer />
        <LoadingEffect loadingState={loading} />
      </div>
    </>
  );
}
export default Product;
