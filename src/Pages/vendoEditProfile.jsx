import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import Button from "@mui/material/Button";
import Footer from "./../Components/footer";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import { getCities, getGovernorates } from "../api/locations";
import { getUserData, updateUserData } from "../api/users";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import header2 from "../assets/Header2.jpeg";

const VendorEditProfilePage = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const token = localStorage.getItem("token");
  const userId = userData._id;
  const [user, setUser] = useState({});
  const [governorates, setGovernorates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedGovernorate, setSelectedGovernorate] = useState();
  const [updatedUser, setUpdatedUser] = useState({});
  const [selectedCity, setSelectedCity] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getGovernorates()
      .then((res) => {
        setGovernorates(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (selectedGovernorate) {
      getCities(selectedGovernorate)
        .then((response) => {
          setCities(response.data);
        })
        .catch((error) => {
          console.error("Error fetching cities:", error);
        });
    }
  }, [selectedGovernorate]);

  useEffect(() => {
    getUserData(userId, token)
      .then((res) => {
        setUser(res.data);
        setUpdatedUser(res.data);
      })
      .catch((err) => console.log(err));
  }, [userId, token]);

  const validateName = (name) => {
    const value = name || "";
    return value.length >= 2 && value.length <= 50;
  };

  const validateDescription = (description) => {
    const value = description || "";
    return value.length >= 20 && value.length <= 500;
  };

  const validatePhone = (phone) => {
    return /^\+?\d{8,15}$/.test(String(phone || "").trim());
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "gov" || name === "city") {
      setUpdatedUser((prevUser) => ({
        ...prevUser,
        address: {
          ...prevUser.address,
          [name]: value,
        },
      }));
    } else {
      setUpdatedUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }
  };

  const formDataToSend = {
    ...updatedUser,
    address: {
      gov: selectedGovernorate
        ? governorates.find((gov) => gov._id === selectedGovernorate)?.name ||
          ""
        : user.address?.gov || "",
      city: selectedCity
        ? cities.find((city) => city._id === selectedCity)?.name || ""
        : user.address?.city || "",
    },
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "LocalCrafts");

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dbtaj8rn6/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        setUpdatedUser((prevUser) => ({
          ...prevUser,
          photo: data.secure_url,
        }));
        setUser((prevUser) => ({
          ...prevUser,
          photo: data.secure_url,
        }));
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (user.role === "vendor") {
      if (!validateName(updatedUser.name)) {
        alert("الأسم يجب أن يكون من 2 الى 50 حرف");
        return;
      }
      if (!validateDescription(updatedUser.description)) {
        alert("نبذه عنك يجب ان تكون من 20 الى 500 حرف");
        return;
      }
      if (!validatePhone(updatedUser.phone)) {
        alert("الهاتف يجب ان يكون صحيح");
        return;
      }
    } else if (user.role === "customer") {
      if (!validateName(updatedUser.name)) {
        alert("الأسم يجب أن يكون من 2 الى 50 حرف");
        return;
      }
    }
    try {
      const response = await updateUserData(userId, formDataToSend, token);
      setUser(response.data);
      setUpdatedUser(response.data);
      window.location.reload();
      console.log("User updated successfully:", response.data);
    } catch (error) {
      console.log("Error updating user:", error);
    }
  };

  const inputSx = {
    width: { xs: "90%", md: "100%" },
    height: "40px",
    backgroundColor: "#1F2A69",
    border: "1px solid #8E8E8E",
    color: "white",
    direction: "rtl",
    mt: "2vh",
  };

  const labelSx = {
    color: "white",
    fontFamily: "Kurb",
    fontSize: "1.5em",
  };

  const cornerSx = {
    position: "absolute",
    background: "rgb(50,50,50,.7)",
    width: "20%",
    borderRadius: "50% 0 0",
    bottom: "0",
    height: "40%",
    opacity: "70%",
    right: "0",
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ position: "relative" }}>
        <Box
          sx={{
            backgroundImage: `url(${header2})`,
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
              width: "80vw",
              backgroundColor: "white",
              borderRadius: "30px",
              top: "20vh",
              left: "50%",
              height: "215vh",
              transform: "translateX(-50%)",
              zIndex: 1,
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
                تعديل الصفحه الشخصية
              </Typography>
            </Box>
            {/* box البيانات */}
            <Grid
              container
              sx={{
                direction: "rtl",
                justifyContent: "center",
              }}
              spacing={1}
            >
              <Grid
                mt={3}
                item
                xs={12}
                md={2}
                sx={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <label htmlFor="file-upload">
                  {user.photo ? (
                    <Avatar
                      key={user.photo}
                      src={user.photo}
                      alt="User Photo"
                      sx={{
                        width: 150,
                        height: 150,
                        mr: "2vw",
                        mt: "7vh",
                      }}
                    />
                  ) : (
                    <PersonIcon
                      sx={{
                        fontSize: "15vw",
                        color: "black",
                        mr: "2vw",
                        mt: "7vh",
                      }}
                    />
                  )}
                </label>
                <EditIcon
                  sx={{
                    position: "absolute",
                    top: { md: "13%", xs: "4%" },
                    bottom: { xs: "40%", md: "0%" },
                    right: "10%",
                    color: "blue",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    borderRadius: "50%",
                    padding: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => document.getElementById("file-upload").click()}
                />
                <input
                  id="file-upload"
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </Grid>

              <Grid
                item
                xs={9}
                sx={{
                  margin: "3vw 2vw",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "#091242",
                    height: { xs: "150vh", md: "160vh" },
                    borderRadius: "20px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
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
                          <stop stopColor="#FFB629" />
                          <stop offset="0.507189" stopColor="#FFDA56" />
                          <stop offset="1" stopColor="#FFD7A6" />
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
                      }}
                    >
                      البيانات
                    </Typography>
                  </Box>
                  <Grid
                    container
                    sx={{
                      paddingTop: "2vw",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    spacing={10}
                  >
                    <Grid item sx={{ marginRight: "3vw" }}>
                      <Typography sx={labelSx}>الأسم</Typography>
                      <TextField
                        id="profile-name"
                        variant="outlined"
                        name="name"
                        value={updatedUser.name || ""}
                        onChange={handleChange}
                        InputLabelProps={{ sx: { color: "white" } }}
                        InputProps={{ sx: inputSx }}
                      />
                      <Typography sx={{ ...labelSx, mt: "2vh" }}>
                        البريد
                      </Typography>
                      <TextField
                        id="profile-email"
                        variant="outlined"
                        name="email"
                        disabled
                        value={user.email || ""}
                        onChange={handleChange}
                        InputLabelProps={{ sx: { color: "white" } }}
                        InputProps={{ sx: inputSx }}
                      />{" "}
                      {user.role === "vendor" && (
                        <>
                          <Grid container>
                            <Grid item sx={{ width: "50%" }}>
                              <Typography sx={{ ...labelSx, mt: "4vh" }}>
                                المحافظة
                              </Typography>

                              <TextField
                                id="profile-governorate"
                                name="gov"
                                select
                                value={selectedGovernorate || ""}
                                onChange={(e) => {
                                  setSelectedGovernorate(e.target.value);
                                  handleChange(e);
                                }}
                                sx={{
                                  width: { xs: "50%" },
                                  backgroundColor: "#1F2A69",
                                  border: "1px solid #8E8E8E",
                                  color: "white",
                                }}
                              >
                                {governorates.map((option) => (
                                  <MenuItem key={option._id} value={option._id}>
                                    {" "}
                                    {option.name}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </Grid>
                            <Grid item sx={{ width: "50%" }}>
                              <Typography sx={{ ...labelSx, mt: "4vh" }}>
                                المدينه
                              </Typography>

                              <TextField
                                id="profile-city"
                                name="city"
                                select
                                value={selectedCity || ""}
                                onChange={(e) => {
                                  setSelectedCity(e.target.value);
                                  handleChange(e);
                                }}
                                sx={{
                                  width: "50%",
                                  backgroundColor: "#1F2A69",
                                  border: "1px solid #8E8E8E",
                                  color: "white",
                                }}
                              >
                                {cities.map((option) => (
                                  <MenuItem key={option._id} value={option._id}>
                                    {" "}
                                    {option.name}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </Grid>
                          </Grid>
                          <Typography sx={{ ...labelSx, mt: "2vh" }}>
                            الهاتف
                          </Typography>
                          <TextField
                            id="profile-phone"
                            type="number"
                            name="phone"
                            value={updatedUser.phone || ""}
                            onChange={handleChange}
                            variant="outlined"
                            InputLabelProps={{ sx: { color: "white" } }}
                            InputProps={{ sx: inputSx }}
                          />
                          <Typography sx={{ ...labelSx, mt: "2vh" }}>
                            المهنه
                          </Typography>
                          <TextField
                            id="profile-job"
                            variant="outlined"
                            name="job"
                            value={updatedUser.job || ""}
                            onChange={handleChange}
                            InputLabelProps={{ sx: { color: "white" } }}
                            InputProps={{ sx: inputSx }}
                          />
                          <Typography sx={{ ...labelSx, mt: "5vh" }}>
                            نبذة
                          </Typography>
                          <TextField
                            name="description"
                            value={updatedUser.description || ""}
                            onChange={handleChange}
                            id="profile-description"
                            multiline
                            rows={6}
                            InputProps={{
                              style: { color: "white" },
                            }}
                            sx={{
                              width: "40vw",
                              direction: "rtl",
                              backgroundColor: "#1F2A69",
                              border: "1px solid #8E8E8E",
                              color: "white",
                            }}
                          />
                        </>
                      )}
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        marginRight: "5%",
                      }}
                    >
                      <Button
                        type="submit"
                        sx={{
                          background:
                            "linear-gradient(45deg, #FFB629 0%, #FFDA56 50%, #FFD7A6 100%)",
                          borderRadius: 0,
                          color: "black",
                          height: 48,
                          padding: "0 30px",
                          position: "relative",
                          fontWeight: "bold",
                        }}
                      >
                        تعديل
                        <Box sx={cornerSx}></Box>
                      </Button>
                      <Button
                        onClick={() => {
                          navigate(-1);
                        }}
                        sx={{
                          background: "white",
                          borderRadius: 0,
                          color: "black",
                          height: 48,
                          padding: "0 30px",
                          marginRight: "4vw",
                          position: "relative",
                          fontWeight: "bold",
                        }}
                      >
                        الغاء
                        <Box sx={cornerSx}></Box>
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/*box of blue and white box */}
        <Box sx={{ height: "200vh", position: "relative" }}>
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
    </form>
  );
};
export default VendorEditProfilePage;