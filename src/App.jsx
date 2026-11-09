import "./App.css";
import PopularProducts from "./Components/popularProducts";
import PopularServices from "./Components/popularServices";
import ProductDetiles from "./Components/Details/productDetiles";
import ServiceCard from "./Components/serviceCard";
import HomePage from "./Pages/homePage";
import UserViewVendor from "./Pages/userViewVendor";
import LoginPage from "./Pages/loginPage";
import UserRegister from "./Pages/userRegister";
import VendorOrdersPage from "./Pages/venorOrdersPage";
import ProductsPage from "./Pages/productsPage";
import FavouritePage from "./Pages/favouritePage";
import ServicesProducts from "./Pages/servicesProduct";
import Navbar from "./Components/navBar";
import { BrowserRouter } from "react-router-dom";
import RouterPages from "./Router/Router";
import VendorRegister from "./Pages/vendorRegister";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { changeLocation } from "./stores/slice/location";
import AddProducts from "./Pages/addProducts";
import Footer from "./Components/footer";
function App() {
  const dispatch = useDispatch();

  dispatch(changeLocation(window.location.pathname));

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <RouterPages />
       
      </BrowserRouter>
    </>
  );
}

export default App;
