import AboutInfo from "../Components/aboutInfo";
import Categories from "../Components/categories";
import HomeHeader from "../Components/Home/homeHeader";
import OrderServiceSteps from "../Components/orderServiceSteps";
import Footer from "../Components/footer";
import Navbar from "../Components/navBar";
import PopularServices from "../Components/popularServices";
import PopularProducts from "../Components/popularProducts";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { loadUserDataFromLocalStorage } from "./loadUserDataFromLocalStorageAction";
import { clearUserData, clearUserToken } from "../stores/slice/user";

const HomePage = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const token = useSelector((state) => state.user.token);

  // useEffect(() => {
  //   dispatch(loadUserDataFromLocalStorage());
  //   console.log("User Data:", userData);
  //   console.log("Token:", token);
  // }, []);
  const categoriesRef = useRef(null);

  const scrollToCategories = () => {
    if (categoriesRef.current) {
      categoriesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const productsRef = useRef(null);

  const scrollToProducts = () => {
    if (productsRef.current) {
      productsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      {/* <Navbar /> */}
      <HomeHeader onButtonClick={scrollToCategories} />
      <Categories ref={categoriesRef} />
      <OrderServiceSteps onButtonClick={scrollToProducts} />
      <PopularServices ref={productsRef} />
      <PopularProducts />
      <AboutInfo />
      {/* <button onClick={handleLogout}>Logout</button> */}
      <Footer />
    </>
  );
};

export default HomePage;
