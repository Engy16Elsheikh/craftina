import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import IconButton from "@mui/material/IconButton";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./Product/ProductCard";
import { getPopularServices } from "../api/services";

// The old Figma image URL expired (Expires=1710115200 = March 2024).
// Put your own image in src/assets and import it, for example:
//   import bg from "../assets/popularBg.jpg";
// then replace BG_IMAGE below with `url(${bg})`.
// Until then a solid navy background is used so the banner never looks broken.
const BG_IMAGE = "none";

const PopularServices = React.forwardRef((props, ref) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const swiperRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServicesList = async () => {
      try {
        const response = await getPopularServices();
        console.log("popular services:", response);
        setServices(Array.isArray(response) ? response : []);
      } catch (error) {
        console.error("Error fetching services list:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServicesList();
  }, []);

  const goNext = () => swiperRef.current?.swiper?.slideNext();
  const goPrev = () => swiperRef.current?.swiper?.slidePrev();

  const imgStyle = {
    backgroundColor: "#091242",
    backgroundImage: `linear-gradient(rgba(9, 18, 66, 0.5), rgba(9, 18, 66, 0.5)), ${BG_IMAGE}`,
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    padding: "10%",
  };

  const positionBox = {
    position: "absolute",
    borderRadius: "5%",
    backgroundColor: "white",
    top: "65%",
    right: "5%",
    width: "80%",
    bottom: "10%",
    padding: "5%",
    height: "50vh",
  };

  return (
    <Box
      ref={ref}
      sx={{ position: "relative", textAlign: "right", direction: "rtl" }}
      mb={80}
    >
      <Box mt={6}>
        <Box sx={imgStyle}></Box>
      </Box>

      <Box>
        <Box sx={positionBox} mb={5}>
          <Box sx={{ display: "flex" }}>
            <Box mt={1}>
              <svg
                width="10"
                height="10"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0H17V17H0V0Z" fill="url(#paint0_linear_29_4096)" />
                <defs>
                  <linearGradient
                    id="paint0_linear_29_4096"
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
            </Box>

            <Typography
              variant="h4"
              sx={{ fontFamily: "'Rubik', sans-serif" }}
            >
              الخدمات الأكثر طلبا
            </Typography>
          </Box>

          <Box
            mt={5}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            {loading ? (
              <Typography>جاري التحميل...</Typography>
            ) : services.length === 0 ? (
              <Typography>لا توجد خدمات حالياً</Typography>
            ) : (
              <Swiper
                ref={swiperRef}
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                // Swiper needs an explicit width inside a flex container,
                // otherwise it shrinks to its content and squeezes the cards.
                style={{ width: "100%" }}
                breakpoints={{
                  0: { slidesPerView: 1 },
                  600: { slidesPerView: 2 },
                  960: { slidesPerView: 4 },
                }}
                spaceBetween={20}
                // loop only works when there are more slides than slidesPerView
                loop={services.length > 4}
              >
                {services.map((service) => (
                  <SwiperSlide key={service._id}>
                    {/* Clicking a service opens the service details page */}
                    <Box
                      onClick={() => navigate(`/servicesdetails/${service._id}`)}
                      sx={{ cursor: "pointer", width: "100%" }}
                    >
                      <ProductCard data={service} />
                    </Box>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}

            <IconButton
              sx={{
                position: "absolute",
                left: "5%",
                transform: "translateY(-50%)",
                zIndex: 999,
                background:
                  "linear-gradient(90deg, #FFB629 0%, #FFDA56 50%, #FFD7A6 100%)",
                color: "white",
                width: "3vw",
                height: "5vh",
              }}
              onClick={goPrev}
            >
              &gt;
            </IconButton>
            <IconButton
              sx={{
                position: "absolute",
                right: "1%",
                transform: "translateY(-50%)",
                zIndex: 999,
                backgroundColor: "#091242",
                color: "white",
                width: "3vw",
                height: "5vh",
              }}
              onClick={goNext}
            >
              &lt;
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
});

export default PopularServices;