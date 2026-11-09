import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import IconButton from "@mui/material/IconButton";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import React, { useRef, useState } from "react";
import { Card, CardMedia, Box, Typography, Grid } from "@mui/material";

import { useEffect } from "react";
import {
  getProductCategories,
  getServicesCategories,
} from "../api/categoriesApi";

const Categories = React.forwardRef((props, ref) => {
  const [productCategories, setProductCategories] = useState([]);
  const [serviceCategories, setServiceCategories] = useState([]);
  const [centerIndex, setCenterIndex] = useState(0);
  const swiperRef = useRef(null);

  useEffect(() => {
    getProductCategories()
      .then((res) => {
        setProductCategories(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getServicesCategories()
      .then((res) => {
        setServiceCategories(res.data);
      })
      .catch((err) => console.log(err));
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
    <Box
      ref={ref}
      sx={{
        margin: "20vh 0",
        backgroundColor: "lightgray",
        direction: "rtl",
        position: "relative",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <svg
          style={{ margin: "5vh 7vw 0 0" }}
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
          sx={{ display: "block", margin: "3vh 1vw 0 0", fontSize: "2em" }}
        >
          التصنيفات
        </Typography>
      </Box>
      <Box
        sx={{
          height: "30vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginRight: "4vw",
        }}
      >
        <Swiper
          ref={swiperRef}
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          loop={true}
          onSlideChange={handleSlideChange}
          breakpoints={{
            0: {
              slidesPerView: 2,
            },
            600: {
              slidesPerView: 2,
            },
            960: {
              slidesPerView: 4,
            },
          }}
        >
          {/* Swiper slides go here */}
          <Grid container>
            {serviceCategories.map((Categorie) => (
              <SwiperSlide>
                <Grid item>
                  <Card
                    sx={{
                      height: "22vh",
                      width: "80",
                      position: "relative",
                      ml: "1.5em",
                      mr: { xs: "10%", md: "2%" },
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        color: "white",
                        textAlign: "center",
                        height: "100%",
                        backgroundColor: "rgb(50,50,50,.3)",
                      }}
                    >
                      <Typography sx={{ fontSize: "2rem", marginTop: "5vh" }}>
                        {Categorie.name}
                      </Typography>
                    </Box>
                    <CardMedia
                      component="img"
                      height="100%"
                      width="100%"
                      image={Categorie.photo}
                    />
                  </Card>
                </Grid>
              </SwiperSlide>
            ))}
          </Grid>
        </Swiper>
      </Box>
      <IconButton
        sx={{
          position: "absolute",
          top: "60%",
          left: "0px",
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
          top: "60%",
          right: "20px",
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
  );
});

export default Categories;
