import React, { useEffect, useState } from "react";
import Footer from "../Components/footer";
import { useNavigate, useParams } from "react-router-dom";
import { getServiceDetails } from "../api/services";
import NaveBar from "../Components/navBar";
import { Review } from "../Components/Details/review";
import ServicedetailCard from "../Components/Services/ServicedetailCard";

export const ServicesDetalis = () => {
  const [serviceDetails, setServiceDetails] = useState();
  const navigate = useNavigate();
  const { serviceId } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/user-login");
      return;
    }

    let ignore = false;

    getServiceDetails(serviceId)
      .then((res) => {
        if (!ignore) setServiceDetails(res.data);
      })
      .catch((err) => console.error("Error fetching service details:", err));

    // Avoid setting state from an outdated request if serviceId changes
    return () => {
      ignore = true;
    };
  }, [serviceId, navigate]);

  return (
    <>
      <NaveBar />

      {serviceDetails && <ServicedetailCard data={serviceDetails} />}
      <Review />
      <Footer />
    </>
  );
};