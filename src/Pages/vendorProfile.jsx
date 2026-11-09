import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PersonIcon from "@mui/icons-material/Person";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Footer from "../Components/footer";
import { useEffect, useState } from "react";
import { getUserData } from "../api/users";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import header2 from "../assets/Header2.jpeg"

const VendorProfile = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const token = localStorage.getItem("token");
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getUserData(userData._id, token)
      .then((res) => {
        setUser(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleEditProfile = () => {
    navigate("/vendorEditProfile");
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          backgroundImage:
            `url(${header2})`,
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
        >

        </Box>
        {/* Red Box */}
        <Box
          sx={{
            position: "absolute",
            width: "70vw",
            backgroundColor: "white",
            borderRadius: "30px",
            top: "20vh",
            left: "50%",
            height: "180vh",
            transform: "translateX(-50%)",
            zIndex: 1,
          }}
        >
          {/* عنوان الصفحه الشخصيه */}
          <Box mt={3} sx={{ display: "flex", direction: "rtl" }}>
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
              sx={{ display: "block", margin: "3vh 1vw 0 0", fontSize: "2rem",fontFamily:"Rubik" }}
            >
              الصفحة الشخصية
            </Typography>
          </Box>
          {/* box البيانات */}
          <Grid mb={10}
            container
            sx={{
              direction: "rtl",
              justifyContent: "center",
            }}
            spacing={3}>
            <Grid item md={2} xs={12} sx={{ mt: "7vh", display: { xs: "inline-block", md: "inline-block" }, justifyContent: "center" }}>
              {user.photo ? (
                <Avatar
                  src={user.photo}
                  alt="User Photo"
                  sx={{
                    width: 150,
                    height: 150,
                    mr: { xs: "20vw", md: "2vw" },
                  }}
                />
              ) : (
                <IconButton>
                  <PersonIcon sx={{ fontSize: "15vw", color: "black" , mr: { xs: "26vw", md: "0vw" },}} />
                </IconButton>
              )}
              <Box sx={{ mt: { xs: "5%" }, }}>
                <Typography
                  sx={{
                    textAlign: "center",
                    fontSize: "1.5rem",
                    paddingRight: "2vw",
                    fontFamily:"Rubik"

                  }}
                >
                  {user.name}
                </Typography>
                <Typography
                  sx={{
                    textAlign: "center",
                    fontSize: "1.5em",
                    paddingRight: "2vw",
                    fontFamily:"Rubik"

                  }}
                >
                  {user.job}
                </Typography>
              </Box>
              {/* <Button
                sx={{
                  background:
                    "linear-gradient(90deg, #1F2A69  0%, #091242 100%)",
                  border: 0,
                  color: "White",
                  height: 48,
                  padding: "0 2vw",
                  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
                  marginRight: "2vw",
                  marginTop: "2vh",
                  position: "relative",
                  borderRadius: 0,
                  textWrap: "nowrap",
                  fontSize: "1.5vw",
                }}
              >
                ذهاب الى الطلبات
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
              </Button> */}
            </Grid>
            <Grid item md={8} xs={12} sx={{ margin: "3vw 5vw", width: "100%", }}>
              <Box
                sx={{
                  backgroundColor: "#091242",
                  height: "120%",
                  borderRadius: "20px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontFamily:"Rubik"
                  }}
                >
                  <svg
                    width="4"
                    height="5vh"
                    viewBox="0 0 4 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width="4"
                      height="32"
                      fill="url(#paint0_linear_49_2162)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_49_2162"
                        x1="-0.113402"
                        y1="6.93333"
                        x2="4.94361"
                        y2="6.97822"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FFB629" />
                        <stop offset="0.507189" stop-color="#FFDA56" />
                        <stop offset="1" stop-color="#FFD7A6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <Typography
                    sx={{
                      fontSize: "2rem",
                      marginRight: "4px",
                      color: "white",
                      marginTop: "1vh",
                      backgroundColor: "rgb(50,50,50,.5)",
                      fontFamily:"Rubik"
                    }}
                  >
                    البيانات
                  </Typography>
                </Box>
                
                <Grid container sx={{
                  direction: "rtl", textAlign: "right"

                  , paddingLeft: { xs: "30%", md: "3%" },
                  paddingRight: { xs: "10%", md: "3%" },
                  fontSize: { xs: "1rem", md: "3rem" }
                }}>
                  <Grid mt={3} xs={12} md={6.1} item sx={{ display: "flex", justifyContent: "space-between", color: "white" }}>

                    <Typography>الأسم</Typography>
                    <Typography>{user.name}</Typography>

                  </Grid>

                  <Grid mt={3} xs={12} md={6.1} item sx={{ display: "flex", justifyContent: "space-between", color: "white" }}>

                    <Typography >البريد</Typography>
                    <Typography sx={{
                      marginRight: { xs: "3vw", md: "1vw" },
                    }

                    }>{user.email}</Typography>

                  </Grid>
                  {user.role==="vendor"&& 
                  <>
                  <Grid mt={3} xs={12} md={6.1} item sx={{ display: "flex", justifyContent: "space-between", color: "white" }}>

                    <Typography>الهاتف</Typography>
                    <Typography>{user.phone}</Typography>

                  </Grid>
                  <Grid mt={3} xs={12} md={6.1} item sx={{ display: "flex", justifyContent: "space-between", color: "white" }}>

                    <Typography>المحافظة</Typography>
                    <Typography> {user.address && user.address.gov}</Typography>

                  </Grid>
                  <Grid mt={3} xs={12} md={6.1} item sx={{ display: "flex", justifyContent: "space-between", color: "white" }}>

                    <Typography>المدينة</Typography>
                    <Typography>
                      {" "}
                      {user.address && user.address.city}
                    </Typography>
                  </Grid>
                  <Grid mt={3} xs={12} md={6.1} item sx={{ display: "flex", justifyContent: "space-between", color: "white" }}>

                    <Typography>المهنة</Typography>
                    <Typography>
                      {user.job}
                    </Typography>
                  </Grid>
                 

                  <Grid mt={3} xs={12} md={6.1} item sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginRight: { md: "10%", xs: "5%" }
                  }}>
                    <Typography sx={{ color: "white" }}>
                      نبذة
                    </Typography>
                    <Typography
                      sx={{
                        wordWrap: "break-word",
                        // width: {  sm: "auto" },
                        marginRight: { xs: "2.5vw", md: "1vw" },
                        color: "gray",
                      }}
                    >
                      {user.description}
                    </Typography>
                  </Grid>
                   </>
                  }
                </Grid>
              </Box>
              <Button
                onClick={handleEditProfile}
                sx={{
                  background:
                    "linear-gradient(45deg, #FFB629 0%, #FFDA56 50%, #FFD7A6 100%)",
                  borderRadius: 0,
                  color: "black",
                  height: 48,
                  padding: "0 30px",
                  marginRight: "4vw",
                  marginTop: ".5vw",
                  position: "relative",
                  fontWeight: "bold",
                  mt: "5vh",
                }}
              >
                تعديل
                <Box
                  sx={{
                    position: "absolute",
                    background: "rgb(50,50,50,.7)",
                    width: "20%",
                    borderRadius: "50% 0 0",
                    bottom: "0",
                    height: "40%",
                    opacity: "70%",
                    right: "0",
                  }}
                ></Box>
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/*box of blue and white box */}
      <Box sx={{ height: "165vh", position: "relative" }}>
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

export default VendorProfile;
