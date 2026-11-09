import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useEffect, useRef, useState } from "react";
import ProductCard from "./Product/ProductCard";
import { SettingsPhone } from "@mui/icons-material";
import { getPopularProduct } from "../api/Products";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import IconButton from "@mui/material/IconButton";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const PopularProducts = () => {
  const [mostPopular, setMostPopular] = useState([]);
  const swiperRef = useRef(null);
  const [centerIndex, setCenterIndex] = useState(0);

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const response = await getPopularProduct();
        setMostPopular(response);
        console.log(response)
      } catch (error) {
        console.error("Error fetching product list:", error);
      }
    };
    fetchProductList();
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

  const serviceBox = {
    direction: " rtl",
    width: "86%",
    padding: "5%",
  };

  return (
    <Box
      sx={{
        backgroundColor: "#F4F4F4",
      }}
    >
      <Box sx={serviceBox}>
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
                  <stop stop-color="#FFB629" />
                  <stop offset="0.507189" stop-color="#FFDA56" />
                  <stop offset="1" stop-color="#FFD7A6" />
                </linearGradient>
              </defs>
            </svg>
          </Box>
          <Typography variant="h4" sx={{ fontFamily: " 'Rubik', sans-serif" }}>
            المنتجات الأكثر طلبا
          </Typography>
        </Box>
        <Box
          mt={5}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // marginRight: "4vw",
          }}
        >
          <Swiper
            xs={6}
            md={6}
            lg={3}
            ref={swiperRef}
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            loop={true}
            onSlideChange={handleSlideChange}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              600: {
                slidesPerView: 2,
              },
              960: {
                slidesPerView: 4,
              },
            }}
          >
            <Grid container spacing={5}  mt={10} >
              {mostPopular.map((product) => (
                <Grid key={product.id} item >
                  <SwiperSlide style={{display:"flex",justifyContent:"center"}}>
                    <ProductCard data={product} />
                  </SwiperSlide>
                </Grid>
              ))}
            </Grid>
          </Swiper>
          <IconButton
            sx={{
              position: "absolute",
              // top: "30%",
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
              // top: "30%",
              right: "5%",
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
  );
};

export default PopularProducts;
