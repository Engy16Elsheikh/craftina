import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Footer from "../Components/footer";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import IconButton from "@mui/material/IconButton";
import ServiceCard from "../Components/serviceCard";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserData } from "../api/users";
import { Avatar } from "@mui/material";
import { getProductsByUser } from "../api/Products";
import { getServicesByUser } from "../api/services";
import ProductCard from "./../Components/Product/ProductCard";

const UserViewVendor = () => {
  const [centerIndex, setCenterIndex] = useState(0);
  const [vendor, setVendor] = useState({});
  const token = localStorage.getItem("token");
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const swiperRef = useRef(null);

  const handleSlideChange = (swiper) => {
    setCenterIndex(swiper.realIndex + 1);
  };
  const { vendorId } = useParams();
  useEffect(() => {
    getUserData(vendorId, token)
      .then((res) => {
        setVendor(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));

    getProductsByUser(vendorId)
      .then((res) => {
        setProducts(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
    getServicesByUser(vendorId)
      .then((res) => {
        setServices(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [vendorId, token]);

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
            height: "205vh",
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
                fontSize: "1.8rem",
                fontFamily:"Rubik"
              }}
            >
              الصفحة الشخصية
            </Typography>
          </Box>
          <Box sx={{ display: { md: "flex", xs: "block" }, justifyContent: "center" }}>
            <Box sx={{ mr: { md: "1%", xs: "20%" } }}>
              {vendor.photo ? (
                <Avatar
                  src={vendor.photo}
                  sx={{
                    fontSize: "5vw",
                    marginRight: "2vw",
                    mt: "4vh",
                    mb: "2vh",
                    width: 120,
                    height: 120,
                  }}
                ></Avatar>
              ) : (
                <IconButton>
                  <PersonIcon
                    sx={{
                      fontSize: "5vw",
                      color: "black",
                      marginRight: "4vw",
                      mt: "4vh",
                    }}
                  ></PersonIcon>
                </IconButton>
              )}
              <Box sx={ {textAlign:"center",marginLeft:{xs:"45%",sm:"70%",md:"1%"}}}>
                <Typography sx={{  fontWeight: "bold", fontFamily:"Rubik" }}>
                  {vendor.name}
                </Typography>

                <Typography sx={{ fontFamily:"Rubik" }}>
                  {vendor.job}
                </Typography>
              </Box>
            </Box>
            <Grid container spacing={2} sx={{ mt: { md: "15%", xs: "5%" } }}>

              <Grid item md={1} xs={3}>
                <Typography sx={{ fontWeight: "bold", fontFamily:"Rubik"}}>
                  الأسم:{" "}
                </Typography>
                <Typography sx={{ fontWeight: "bold", fontFamily:"Rubik" }}>البريد: </Typography>
                <Typography sx={{ fontWeight: "bold", fontFamily:"Rubik" }}>مدينه:</Typography>
              </Grid>
              <Grid item  md={5} xs={9}>
                <Typography sx={{ fontFamily:"Rubik"}}>{vendor.name} </Typography>
                <Typography sx={{ fontFamily:"Rubik"}}> {vendor.email} </Typography>
                <Typography sx={{ fontFamily:"Rubik"}}>{vendor.address?.city} </Typography>
              </Grid>
              <Grid item  md={1} xs={3}>
                <Typography sx={{ fontWeight: "bold",fontFamily:"Rubik" }}>المهنه: </Typography>
                <Typography sx={{ fontWeight: "bold",fontFamily:"Rubik" }}>المحافظه: </Typography>
                <Typography sx={{ fontWeight: "bold" ,fontFamily:"Rubik"}}>رقم الهاتف:</Typography>
              </Grid>
              <Grid item  md={5} xs={9}>
                <Typography sx={{ fontFamily:"Rubik"}}>{vendor.job} </Typography>
                <Typography sx={{ fontFamily:"Rubik"}}> {vendor.address?.gov} </Typography>
                <Typography sx={{ fontFamily:"Rubik"}}> {vendor.phone} </Typography>
              </Grid>
              <Grid item xs={12} >
                <Typography sx={{ fontWeight: "bold" ,fontFamily:"Rubik"}}>نبذة: </Typography>
                <Typography sx={{ width: "40vw" ,fontFamily:"Rubik" }}>
                  {vendor.description}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ backgroundColor: "#F4F4F4", height: "110vh", mt: "8vh" }}>
            <Box sx={{ display: "flex", direction: "rtl"}}>
              <svg
                style={{ margin: "7vh 2vw 0 0" }}
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
                  margin: "5.5vh 1vw 0 0",
                  fontSize:{md:"1.5rem",xs:"1rem"},
                  fontFamily:"Rubik"
                }}
              >
                الخدمات والمنتجات المنشورة
              </Typography>
              <Typography sx={{ margin: "6vh 25vw 0 0" }}>
                <span style={{ fontWeight: "bold" }}>العدد</span>:
                {products.length + services.length} خدمه ومنتج
              </Typography>
            </Box>
            {/*Cards swiper*/}
            <Swiper
              style={{ margin: "7vh 4vw" }}
              ref={swiperRef}
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              slidesPerView={3}
              loop={true}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                600: {
                  slidesPerView: 2,
                },
                960: {
                  slidesPerView: 3,
                },
              }}
              onSlideChange={handleSlideChange}
            >
              {/* Swiper slides go here */}
              <Grid container spacing={3} sx={{ mr: "3vw", mt: "3vh" }}>
                {products &&
                  products.map((product) => (
                    <SwiperSlide key={product.id}>
                      <Grid item>
                        <ProductCard data={product} />
                      </Grid>
                    </SwiperSlide>
                  ))}
                {services &&
                  services.map((service) => (
                    <SwiperSlide key={service.id}>
                      <Grid item>
                        <ProductCard data={service} />
                      </Grid>
                    </SwiperSlide>
                  ))}
              </Grid>
            </Swiper>
          </Box>
        </Box>
      </Box>
      {/*box of blue and white box */}
      <Box sx={{ height: "190vh", position: "relative" }}>
        {/*blue box */}
        <Grid container sx={{ height: "190vh" }}>
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

export default UserViewVendor;
