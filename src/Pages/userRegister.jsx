import React, { useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
const UserRegister = () => {
  const navigate = useNavigate();
  const [selectedValueType, setSelectedValueType] = useState("");
  const [errors, setErrors] = useState({});
  const [openDialog2, setOpenDialog2] = useState(false);
  const handleTypeChange = (event) => {
    setSelectedValueType(event.target.value);
    formData.role = event.target.value;
  };

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    password: "",
    email: "",
  });

  const types = [
    {
      value: "vendor",
      label: "بائع",
    },
    {
      value: "customer",
      label: "مشترى",
    },
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateFormData(formData);

    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: "كلمة السر غير متطابقة" });
      return;
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Create an object with only the required fields
    const formDataToSend = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    };

    if (formDataToSend.role === "vendor") {
      navigate("/vedorRegister", { state: { formData: formDataToSend } });
    } else if (formDataToSend.role === "customer") {
      try {
        const res = await axiosInstance.post("/auth/register", formDataToSend);
        console.log("User registered successfully!", res.data.user);
        navigate("/user-confirm", { state: { ...res.data.user } });
      } catch (error) {
        if (error.response && error.response.status === 406) {
          setOpenDialog2(true);
        } else {
          console.error("Error registering user:", error);
        }
      }
    }
  };

  ////////////Validation Form
  const validateFormData = (data) => {
    let errors = {};

    // Validate name
    if (!data.name || data.name.length < 2 || data.name.length > 50) {
      errors.name = "الاسم يجب ان يكون من 2 الي 50 حرف";
    }

    // Validate email
    if (!data.email || !isValidEmail(data.email)) {
      errors.email = "بريد االكترني غير صالح";
    }
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    if (!data.password || !passwordRegex.test(data.password)) {
      errors.password =
        "( !@#$%^&*) يجب ان تحتوي كلمه السر علي الاقل 8 حروف حرف كبير وحرف صغير وحروف مميزه!";
    }

    // Validate role
    if (data.role !== "vendor" && data.role !== "customer") {
      errors.role = "يجب ان تختار بائع او مشتري'";
    }

    return errors;
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
            width: { xs: "80vw", md: "70vw" },
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
              style={{ margin: "9.5vh 15vw 0 0" }}
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
                margin: "7vh 1vw 0 0",
                fontSize: { xs: "1.5rem", md: "2rem" },
                fontFamily: "Rubik",
              }}
            >
              انشاء حساب جديد
            </Typography>
          </Box>
          <form onSubmit={handleSubmit}>
            <Box sx={{ direction: "rtl", mt: "5vh", mr: "15vw" }}>
              <TextField
                name="name"
                value={formData.name}
                onChange={handleChange}
                id="standard-basic"
                label=" الأسم"
                variant="standard"
                placeholder="ادخل الأسم "
                inputProps={{ style: { direction: "rtl" } }}
                sx={{
                  width: { xs: "90%", md: "60%" },
                  textAlign: "start",
                  mb: "2vh",
                }}
                InputLabelProps={{ direction: "rtl", textAlign: "start" }}
              />
              {errors.name && (
                <Typography sx={{ color: "red" }}>{errors.name}</Typography>
              )}
              <TextField
                id="standard-basic"
                name="email"
                label="البريد"
                variant="standard"
                placeholder="ادخل البريد الإلكتروني"
                value={formData.email}
                onChange={handleChange}
                inputProps={{ style: { direction: "rtl" } }}
                sx={{
                  width: { xs: "90%", md: "60%" },
                  direction: "rtl",
                  mb: "2vh",
                }}
                InputLabelProps={{ direction: "rtl" }}
              />
              {errors.email && (
                <Typography sx={{ color: "red" }}>{errors.email}</Typography>
              )}
              <TextField
                id="standard-basic"
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                label="كلمه السر"
                variant="standard"
                placeholder="ادخل كلمه السر"
                inputProps={{ style: { direction: "rtl" } }}
                sx={{ width: { xs: "90%", md: "60%" }, mb: "2vh" }}
                InputLabelProps={{ direction: "rtl", textAlign: "start" }}
              />
              {errors.password && (
                <Typography sx={{ color: "red" }}>{errors.password}</Typography>
              )}
              <TextField
                id="standard-basic"
                label="تأكيد كلمة السر"
                name="confirmPassword"
                type="password"
                variant="standard"
                placeholder="ادخل كلمة السر مرة أخرى"
                // value={formData.confirmPassword}
                onChange={handleChange}
                inputProps={{ style: { direction: "rtl" } }}
                sx={{
                  width: { xs: "90%", md: "60%" },
                  textAlign: "start",
                  mb: "2vh",
                }}
                InputLabelProps={{ direction: "rtl", textAlign: "start" }}
              />
              {errors.confirmPassword && (
                <Typography sx={{ color: "red" }}>
                  {errors.confirmPassword}
                </Typography>
              )}

              <TextField
                id="standard-select-currency"
                name="role"
                onChange={handleTypeChange}
                value={selectedValueType}
                select
                label="نوع الحساب"
                defaultValue="نوع الحساب"
                variant="standard"
                sx={{ width: { xs: "90%", md: "60%" } }}
              >
                {types.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              {errors.role && (
                <Typography sx={{ color: "red" }}>{errors.role}</Typography>
              )}
              <Button
                type="submit"
                sx={{
                  background: "#091242",
                  color: "white",
                  height: "7vh",
                  width: { xs: "90%", md: "60%" },
                  padding: "0 30px",
                  mt: "8vh",
                  display: "block",
                  "&:hover": { backgroundColor: "gray" },
                }}
              >
                انشاء حساب
              </Button>
              <Typography
                sx={{
                  width: { xs: "90%", md: "60%" },
                  textAlign: "center",
                  mt: "4vh",
                  fontFamily: "Rubik",
                  fontSize: "1rem",
                }}
              >
                لديك حساب بالفعل ؟{" "}
                <Link
                  to="/user-login"
                  style={{ textDecoration: "none", color: "blue" }}
                >
                  سجل الدخول
                </Link>
              </Typography>
            </Box>
          </form>
          {/* box البيانات */}
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
              <Dialog
                sx={{ direction: "rtl" }}
                open={openDialog2}
                onClose={() => setOpenDialog2(false)}
              >
                <DialogTitle sx={{ fontFamily: "Rubik" }}>خطأ</DialogTitle>
                <DialogContent>
                  <Typography sx={{ fontFamily: "Rubik" }}>
                    هذا البريد الإلكتروني مستخدم بالفعل. يرجى استخدام بريد
                    إلكتروني آخر.
                  </Typography>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setOpenDialog2(false)}>حسناً</Button>
                </DialogActions>
              </Dialog>
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

export default UserRegister;
