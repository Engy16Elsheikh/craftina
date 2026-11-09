import React, { useEffect, useState } from "react";
import Footer from "../Components/footer";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import logo from "../assets/logo.png";
import header from "../assets/Header2.jpeg";
import { axiosInstance } from "../api/config";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUserDataFromLocalStorage } from "./loadUserDataFromLocalStorageAction";
import { saveUserData, saveUserToken } from "../stores/slice/user";

const ConfirmEmail = () => {
  const [code, setcode] = useState("");
  const [feedback, setFeedback] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [email] = useState(location.state?.email);

  useEffect(() => {
    dispatch(loadUserDataFromLocalStorage());
    if (!email) navigate("/user-login");
  }, [email]);

  useEffect(() => {
    if (feedback[0]) {
      setTimeout(() => setFeedback([]), 4000);
    }
    if (feedback[2]) {
      setTimeout(
        () => setFeedback(["جاري تحويلك للصفحة الرئيسية", "gray"]),
        4000
      );
      setTimeout(() => {
        navigate("/", { replace: true });
        window.location.reload();
      }, 6000);
    }
  }, [feedback]);
  const handleSubmit = async () => {
    try {
      if (code.length !== 5) {
        setErrorMessage("الرجاء إدخال كود التفعيل المكون من ٥ أرقام");
        return;
      }
      const response = await axiosInstance.post("/auth/confirm", {
        email,
        code: parseInt(code),
      });
      const { user, access_token } = response.data;

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

      setFeedback(["تم تفعيل الحساب وتسجيل الدخول بنجاح", "lime", true]);
    } catch (error) {
      if (error.response) {
        setErrorMessage("هناك خطأ في البيانات");
      } else {
        setFeedback(["خطأ في الشبكة. يرجى المحاولة مرة أخرى لاحقًا.", "red"]);
      }
    }
  };

  const sendEmailAgain = async () => {
    try {
      const response = await axiosInstance.get("/auth/code", {
        params: { email, type: "email" },
      });
      if (response.status === 200) {
        setFeedback(["تم ارسال كود اخر الى بريدك الالكتروني", "lime"]);
      }
    } catch (error) {
      if (error.response) {
        setFeedback(["رجاء تحقق من بريدك الإلكتروني قبل اعادة الارسال", "red"]);
      } else {
        setFeedback(["خطأ في الشبكة. يرجى المحاولة مرة أخرى لاحقًا.", "red"]);
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
            width: "70vw",
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
                fontSize: "2em",
              }}
            >
              تفعيل الحساب
              <Typography
                variant="subtitle1"
                sx={{
                  display: "block",
                  fontSize: "16px",
                }}
              >
                لقد تم ارسال كود التفعيل الى بريدك الالكتروني:
                <Typography variant="subtitle2">{email}</Typography>
              </Typography>
            </Typography>
          </Box>
          <Box sx={{ direction: "rtl", mt: "5vh", mr: "15vw" }}>
            <TextField
              id="code"
              label="كود التفعيل"
              variant="standard"
              placeholder="ادخل الكود المكون من ٥ ارقام"
              type="code"
              value={code}
              onChange={(e) => setcode(e.target.value)}
              inputProps={{ style: { direction: "rtl" } }}
              sx={{ width: "30vw", textAlign: "start" }}
              InputLabelProps={{ direction: "rtl", textAlign: "start" }}
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
                width: "30vw",
                padding: "0 30px",
                mt: "6vh",
                display: "block",
                "&:hover": { backgroundColor: "gray" },
              }}
            >
              تفعيل
            </Button>
            <Typography
              sx={{
                width: "30vw",
                textAlign: "center",
                mt: "4vh",
                fontFamily: "Rubik",
                fontSize: "1.2vw",
              }}
            >
              لم تصلك رسالتنا؟{" "}
              <Link
                onClick={sendEmailAgain}
                style={{ textDecoration: "none", color: "blue" }}
              >
                ارسل مرة اخرى
              </Link>
            </Typography>
            {feedback[0] && (
              <Typography
                sx={{
                  mt: "2vh",
                  width: "30vw",
                  textAlign: "center",
                  fontFamily: "Rubik",
                  fontSize: "1.2vw",
                  color: feedback[1],
                }}
              >
                {feedback[0]}
              </Typography>
            )}
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
          </Grid>
        </Grid>
      </Box>
      <Footer></Footer>
    </Box>
  );
};

export default ConfirmEmail;
