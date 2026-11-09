import React, { useState } from "react";
import Footer from "../Components/footer";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import logo from "../assets/logo.png";
import header from "../assets/Header2.jpeg";
import { axiosInstance } from "../api/config";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.get("/auth/code", {
        params: { email, type: "password" },
      });
      if (response.status === 200) {
        navigate("/reset-password", { state: { email } });
      }
    } catch (error) {
      const message = {
        404: "البريد الإلكتروني غير مسجل",
        400: "رجاء ادخال بريد الكتروني صحيح",
        429: "يجب الانتظار ٣٠ ثانية قبل اعادة الارسال",
        other: "حدث خطأ ما. يرجى المحاولة مرة أخرى لاحقًا.",
      };
      if (error.response?.status === 404) {
        setTimeout(() => navigate("/user-register"), 3000);
        return;
      }
      if (error.response) {
        setErrorMessage(message[error.response?.status] || message.other);
      } else {
        setErrorMessage("خطأ في الشبكة. يرجى المحاولة مرة أخرى لاحقًا.");
      }
    }
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          backgroundImage: `url(${header})`,
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
            width: { xs: "85vw", md: "70vw" },
            backgroundColor: "white",
            borderRadius: "30px",
            top: "35vh",
            right: 0,
            height: "120vh",
            zIndex: 1,
          }}
        >
          {/* عنوان الصفحه الشخصيه */}
          <Box
            sx={{
              display: "flex",
              direction: "rtl",
            }}
          >
            <svg
              style={{ margin: "32.5vh 15vw 0 0" }}
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
                margin: "30vh 1vw 0 0",
                fontSize: { xs: "1.6rem", md: "2rem" },
                fontFamily: "Rubik",
              }}
            >
              استعادة كلمة السر
            </Typography>
          </Box>
          <Box sx={{ direction: "rtl", mt: "5vh", mr: "15vw" }}>
            <TextField
              id="email"
              type="email"
              label="البريد"
              variant="standard"
              placeholder="ادخل البريد الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              inputProps={{ style: { direction: "rtl" } }}
              sx={{
                width: { xs: "50vw", md: "30vw" },
                direction: "rtl",
                mb: "3vh",
              }}
              InputLabelProps={{ direction: "rtl" }}
            />
            {errorMessage && (
              <Typography sx={{ color: "red", mt: "1vh" }}>
                {errorMessage}
              </Typography>
            )}
            <Button
              onClick={handleSubmit}
              sx={{
                background: "#091242",
                color: "white",
                height: "7vh",
                width: { xs: "50vw", md: "30vw" },
                padding: "0 30px",
                mt: "6vh",
                display: "block",
                "&:hover": { backgroundColor: "gray" },
              }}
            >
              ارسال
            </Button>
          </Box>
        </Box>
      </Box>
      {/*box of blue and white box */}
      <Box sx={{ height: "120vh", position: "relative" }}>
        {/*blue box */}
        <Grid container sx={{ height: "100%" }}>
          <Grid item xs={12} sx={{ backgroundColor: "#091242" }}>
            <Box
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                height: "100%",
              }}
            >
              <Box sx={{ display: { xs: "none", md: "block" } }}>
                <Typography
                  sx={{
                    color: "white",
                    pt: "20vh",
                    fontSize: "2.3vw",
                    pl: "3vw",
                    fontFamily: "Rubik",
                  }}
                >
                  نحن نتيح لك فرصة
                </Typography>
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "2.3vw",
                    pl: "3vw",
                    fontFamily: "Rubik",
                  }}
                >
                  سريعة وسهله لكل
                </Typography>
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "2.3vw",
                    pl: "3vw",
                    fontFamily: "Rubik",
                  }}
                >
                  ما يحتاج اليه <span style={{ color: "#FFBE34" }}>منزلك </span>
                </Typography>

                <Box
                  sx={{
                    backgroundColor: "#5B86E5",
                    width: "12vw",
                    height: "27vh",
                    borderRadius: "0 40% 40% 0",
                    ml: "5vw",
                    mt: "15vh",
                  }}
                >
                  <img
                    src={logo}
                    style={{ width: "50%", height: "50%", padding: "3vw" }}
                  ></img>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Footer></Footer>
    </Box>
  );
};

export default ForgotPasswordPage;
