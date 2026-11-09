import React, { useEffect, useState } from "react";
import { Review } from "../Components/Details/review";
import Footer from "../Components/footer";
import { useParams, useHistory, useNavigate } from "react-router-dom";
import { getProductListDetails } from "../api/Products";
import NaveBar from "../Components/navBar";
import ProductDetiles from "../Components/Details/productDetiles";
import PopularProducts from "../Components/popularProducts";

export const ProductsDetalis = () => {
  const [productDetails, setProductDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/user-login");
      return;
    }

    getProductListDetails(params.productId)
      .then((res) => {
        setProductDetails(res.data);
      })
      .catch((err) => {
        console.log(err, "error fetching");
      });
  }, [params.productId]);

  return (
    <>
      {productDetails && <ProductDetiles data={productDetails} />}
      {productDetails && <Review data={productDetails} />}
      <PopularProducts />
      <Footer />
    </>
  );
};
