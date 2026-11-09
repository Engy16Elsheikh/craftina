import React, { useEffect, useState } from "react";
import Footer from "../Components/footer";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";
import logo from "../assets/logo.png";
import header from "../assets/Header2.jpeg";
import { axiosInstance } from "../api/config";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUserDataFromLocalStorage } from "./loadUserDataFromLocalStorageAction";
import { saveUserData, saveUserToken } from "../stores/slice/user";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(loadUserDataFromLocalStorage());
  }, []);

  const checkHistory = () => {
    if (
      location.state?.previousPath === "/user-register" ||
      location.state?.previousPath === "/vendor-register" ||
      !location.state
    ) {
      navigate("/");
      return;
    }
    navigate(-1);
  };

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      const { user, access_token } = response.data;
      if (user.notApproved === true) {
        navigate("/user-confirm", { state: { email } });
        return;
      }

      const userData = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,
        photo: user.photo,
        description: user.description,
        phone: user.phone,
        job: user.job,
      };

      localStorage.setItem("token", access_token);
      localStorage.setItem("userData", JSON.stringify(user));

      // Dispatch actions to save user data and token to Redux store
      dispatch(saveUserData(userData));
      dispatch(saveUserToken(access_token));

      console.log("User logged in successfully");
      console.log("User data:", userData);

      checkHistory();
      window.location.reload();
      // navigate(-1);
    } catch (error) {
      if (error.response) {
        setErrorMessage(
          "خطأ في تسجيل الدخول. يرجى التحقق من البريد الإلكتروني وكلمة المرور."
        );
      } else {
        setErrorMessage("خطأ في الشبكة. يرجى المحاولة مرة أخرى لاحقًا.");
      }

      console.error("User login failed:", error);
    }
  };
  const userData = useSelector((state) => state.user.userData);
  const token = useSelector((state) => state.user.token);

  console.log("User Data:", userData);
  console.log("Token:", token);

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
            width: { xs: "80%", md: "70%" },
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
                fontSize: "1.8rem",
                fontFamily: "Rubik",
              }}
            >
              تسجيل الدخول
            </Typography>
          </Box>
          <Box sx={{ direction: "rtl", mt: "5vh", mr: "15vw", ml: "15vw" }}>
            <TextField
              id="email"
              label="البريد"
              variant="standard"
              placeholder="ادخل البريد الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              inputProps={{ style: { direction: "rtl" } }}
              sx={{
                width: { xs: "100%", md: "80%" },
                direction: "rtl",
                mb: "2vh",
              }}
              InputLabelProps={{ direction: "rtl" }}
            />
            <TextField
              id="password"
              label="كلمة السر"
              variant="standard"
              placeholder="ادخل كلمة السر"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              inputProps={{ style: { direction: "rtl" } }}
              sx={{
                width: { xs: "100%", md: "80%" },
                textAlign: "start",
                mb: "4vh",
              }}
              InputLabelProps={{ direction: "rtl", textAlign: "start" }}
            />
            {errorMessage && (
              <Typography sx={{ color: "red", mt: "1vh" }}>
                {errorMessage}
              </Typography>
            )}
            <Button
              onClick={handleLogin}
              sx={{
                background: "#091242",
                color: "white",
                height: "7vh",
                width: { xs: "100%", md: "80%" },
                padding: "0 30px",
                mt: "6vh",
                display: "block",

                "&:hover": { backgroundColor: "gray" },
              }}
              style={{ marginBottom: "5vh" }}
            >
              دخول
            </Button>
            <Typography
              sx={{
                width: { xs: "100%", md: "80%" },
                textAlign: "center",
                mt: "4vh",
                fontFamily: "Rubik",
                fontSize: "1rem",
              }}
            >
              ليس لديك حساب؟{" "}
              <Link
                to="/user-register"
                style={{
                  textDecoration: "none",
                  color: "blue",
                  fontSize: "1rem",
                }}
              >
                انشاء حساب
              </Link>
            </Typography>
            <Typography
              sx={{
                width: { xs: "100%", md: "80%" },
                textAlign: "center",
                mt: "4vh",
                fontFamily: "Rubik",
                fontSize: "1rem",
              }}
            >
              نسيت كلمة المرور؟{" "}
              <Link
                to="/forgot-password"
                style={{
                  textDecoration: "none",
                  color: "blue",
                  fontSize: "1rem",
                }}
              >
                اعادة تعيين كلمة المرور
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
      {/*box of blue and white box */}
      <Box sx={{ height: "120vh", position: "relative" }}>
        {/*blue box */}
        <Grid container sx={{ height: "100%" }}>
          <Grid
            item
            xs={12}
            sx={{
              backgroundColor: "#091242",
            }}
          >
            <Box
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                height: "100%",
                display: { xs: "none", md: "block" },
              }}
            >
              <Box sx={{}}>
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

export default LoginPage;
