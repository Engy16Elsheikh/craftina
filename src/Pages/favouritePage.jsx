import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Footer from "./../Components/footer";
import ServiceCard from "../Components/serviceCard";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import React, { useRef, useState } from "react";
import Button from "@mui/material/Button";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Container } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
const FavouritePage = () => {
  const [centerIndex, setCenterIndex] = useState(0);
  const swiperRef = useRef(null);
  const navigate = useNavigate();
  const fave = useSelector((state) => state.favirot.favirot);

  const handleSlideChange = (swiper) => {
    setCenterIndex(swiper.realIndex + 1);
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          backgroundImage:
            "url('https://s3-alpha-sig.figma.com/img/0d66/363b/6f00d7173f94ca7d7ab6bcc39bde6406?Expires=1709510400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Y-dGzk1BZ7AzXsytxPi6tPDQGedhQNe-fnxuhUubZEHGmJGV3Mv7ViyEdH~h1mEoLCLZ8bGvOMHOac9P10gmWkZUvNbdtKWNZFPEeVUDFqS~ZRZfxiSZ-Bfn0ETk6BhRY67QaLL7ERh4Tt5XNHQJoa9j6TeSL6C5SuJc79nQ37shNjVlPVaXOzUxa5SY6cvUscKDALerDU7CDku6S5EHwZ1hlb2sUHyC6a71TKY~D00y8~YzvGecVrgd3XjbDRMF1mhq5Tgo~TxSxoDkjuf3ZxQ-wlKLEi1C30bdkPyA9ezOh37aeshkILVrPjvVBKeJKsfNXN5CUsrMZj7KM5BWoQ__')",
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
        {/* Red Box */}
        <Box
          sx={{
            position: "absolute",
            width: "70vw",
            backgroundColor: "white",
            borderRadius: "30px",
            top: "20vh",
            left: "50%",
            height: "195vh",
            transform: "translateX(-50%)",
            zIndex: 1,
            direction: "rtl",
            overflow: "auto",
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
                fontSize: "2em",
              }}
            >
              المفضلة
            </Typography>
          </Box>
          <Container>
            <Box mt={10}>
              <Grid container spacing={4} sx={{ width: "90%" }}>
                {fave.map((fave) => (
                  <Grid item key={fave.id} xs={12} md={6} lg={3} mb={5}>
                    <Box sx={{ direction: "rtl" }} width={200}>
                      <Card mb={10} sx={{ height: 450 }}>
                        <CardMedia
                          component="img"
                          height={200}
                          image={fave.photos[0]}
                          alt="Random"
                        />
                        <CardContent>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-around",
                            }}
                          >
                            <Box sx={{ borderRadius: "50%" }}>
                              {fave.vendor.photo ? (
                                <IconButton>
                                  <img
                                    height="35"
                                    width="35"
                                    src={fave.vendor.photo}
                                    alt="Person"
                                    style={{ borderRadius: "50%" }}
                                  />
                                </IconButton>
                              ) : (
                                <IconButton>
                                  <img
                                    height="35"
                                    width="35"
                                    src="https://th.bing.com/th/id/OIP.e4YIHGIZBy1X7GW01zOQfwHaHa?rs=1&pid=ImgDetMain"
                                  />
                                </IconButton>
                              )}
                            </Box>

                            <Typography
                              gutterBottom
                              variant="p"
                              component="div"
                              sx={{ fontWeight: "bold" }}
                              onClick={() =>
                                navigate(`/servicesdetails/${fave.id}`)
                              }
                            >
                              {fave.name}
                            </Typography>
                          </Box>
                          <Box
                            mt={2}
                            sx={{
                              display: "flex",
                              justifyContent: "space-around",
                            }}
                          >
                            <Typography
                              gutterBottom
                              variant="p"
                              sx={{ fontFamily: " 'Rubik', sans-serif" }}
                            >
                              {fave.category.main}
                            </Typography>
                            <Typography
                              gutterBottom
                              variant="p"
                              sx={{ fontFamily: " 'Rubik', sans-serif" }}
                            >
                              {fave.category.sub}
                            </Typography>
                          </Box>

                          <Typography mt={2} variant="body2">
                            I {fave.description}{" "}
                          </Typography>

                          <Box
                            mt={2}
                            sx={{
                              display: "flex",
                              justifyContent: "space-around", // Changed to space-between for spacing
                            }}
                          >
                            <Typography
                              gutterBottom
                              variant="p"
                              sx={{ fontFamily: " 'Rubik', sans-serif" }}
                            >
                              السعر : {fave.price} ج
                            </Typography>
                            <Box mt={0.5}>
                              <StarBorderIcon sx={{ fontSize: "1rem" }} />
                              <StarBorderIcon sx={{ fontSize: "1rem" }} />
                              <StarBorderIcon sx={{ fontSize: "1rem" }} />
                              <StarBorderIcon sx={{ fontSize: "1rem" }} />
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Container>

          <Button
            sx={{
              background: "linear-gradient(90deg, #1F2A69  0%, #091242 100%)",
              border: 0,
              color: "White",
              height: 45,
              padding: "0 50px",
              marginRight: "25vw",
              marginTop: "2vh",
              position: "relative",
              borderRadius: 0,
            }}
            endIcon={<DeleteForeverRoundedIcon sx={{ mr: "10px" }} />}
          >
            مسح كل المفضلة
            <Box
              sx={{
                position: "absolute",
                background: "#1F2A69",
                width: "20%",
                borderRadius: "50% 0 0",
                bottom: "0",
                height: "40%",
                opacity: "70%",
                right: "0",
              }}
            ></Box>
          </Button>
        </Box>
      </Box>
      {/*box of blue and white box */}
      <Box Box sx={{ height: "180vh", position: "relative" }}>
        {/*blue box */}
        <Grid container sx={{ height: "180vh" }}>
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

export default FavouritePage;
