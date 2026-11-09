import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Footer from "./../Components/footer";
import VendorOrderCard from "../Components/vendorOrderCard";
import { axiosInstance } from "../api/config";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import IconButton from "@mui/material/IconButton";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Header2 from "../assets/Header2.jpeg";
const VendorOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");
  const swiperRef = useRef(null);
  const [centerIndex, setCenterIndex] = useState(0);

  useEffect(() => {
    const fetchVendorOrders = async () => {
      try {
        const response = await axiosInstance.get("/orders", {
          headers: {
            token,
          },
        });
        setOrders(response.data.data);
        console.log(orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchVendorOrders();
  }, []);
  const goNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const goPrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleSlideChange = (swiper) => {
    setCenterIndex(swiper.realIndex + 1);
  };

  return (
    <Box>
      <Box
        sx={{
          backgroundImage: `url(${Header2})`,
          height: "35vh",
          width: "100%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            backgroundColor: "rgb(6,0,66,.7)",
            height: "100%",
            top: "0",
            right: "0",
            left: "0",
          }}
        ></Box>
        <Box
          sx={{
            position: "absolute",
            width: "80vw",
            backgroundColor: "white",
            borderRadius: "30px",
            top: { xs: "70%", md: "50%" },
            left: "50%",
            height: "200vh",
            transform: "translateX(-50%)",
            zIndex: 1,
            direction: "rtl",
          }}
        >
          {/* عنوان الصفحه الشخصيه */}
          <Box sx={{ display: "flex", direction: "rtl" }}>
            <svg
              style={{ margin: "5vh 2vw 0 0" }}
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0H17V17H0V0Z" fill="url(#paint0_linear_29_4153)" />
              <defs>
                <linearGradient
                  id="paint0_linear_29_4153"
                  x1="-29875"
                  y1="87704.3"
                  x2="-29853.6"
                  y2="87705.8"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FFB629" />
                  <stop offset="0.507189" stopColor="#FFDA56" />
                  <stop offset="1" stopColor="#FFD7A6" />
                </linearGradient>
              </defs>
            </svg>
            <Typography
              sx={{
                display: "block",
                margin: "3vh 1vw 0 0",
                fontSize: "1.8em",
                fontFamily: "Rubik",
                fontWeight: "700",
              }}
            >
              الطلبات
            </Typography>
          </Box>

          <Box>
            {Array.isArray(orders) && orders.length > 0 ? (
              <Box mt={20}>
                <Swiper
                  xs={6}
                  md={6}
                  lg={3}
                  ref={swiperRef}
                  modules={[Navigation, Pagination, Scrollbar, A11y]}
                  slidesPerView={1}
                  loop={true}
                  onSlideChange={handleSlideChange}
                >
                  <Grid container>
                    {orders.map((order, index) => (
                      <Grid item key={index} xs={12} mb={5}>
                        <SwiperSlide>
                          <VendorOrderCard data={order} />
                        </SwiperSlide>
                      </Grid>
                    ))}
                  </Grid>
                </Swiper>
                {/* Pagination buttons */}
              </Box>
            ) : (
              <Typography
                sx={{
                  fontFamily: "Rubik",
                  fontSize: "2rem",
                  textAlign: "center",
                  color: "red",
                  pt: "50vh",
                }}
              >
                لا يوجد طلبات
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
      {/*box of blue and white box */}
      <Box sx={{ height: "183vh", position: "relative" }}>
        {/*blue box */}
        <Grid container sx={{ height: "100%" }}>
          <Grid item xs={6} sx={{ backgroundColor: "#091242" }}>
            <Box
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                height: "100%",
              }}
            ></Box>
          </Grid>
        </Grid>
      </Box>

      <Footer></Footer>
    </Box>
  );
};
export default VendorOrdersPage;
