import React, { useEffect, useState } from "react";
import ProductDetiles from "../Components/Details/productDetiles";
import { Review } from "../Components/Details/review";
import Footer from "../Components/footer";
import { useParams } from "react-router-dom";
import { getServiceDetails } from "../api/services";

export const DetalisPage = () => {
  const [serviceDetails, setServiceDetails] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  console.log(params);
  useEffect(() => {
    getServiceDetails(params.serviceId)
      .then((res) => {
        console.log(res);
        setServiceDetails(res.data);
      })
      .catch((err) => console.log(err, "error fetching"));
  }, [params.serviceId]);

  return (
    <>
      {serviceDetails && <ProductDetiles data={serviceDetails} />}
      {/* <Review /> */}
      <Footer />
    </>
  );
};
