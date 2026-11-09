import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import "../Styles/footer.css";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Divider,  Typography } from "@mui/material";
import logo from "../assets/logo.png"
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <Box
        className="footer"
        sx={{ display: "flex", justifyContent: "center", direction: "rtl" }}
      >
        <Grid container>
          <Grid item xs={3} sx={{ margin: "0 auto" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "3vh",
              }}
            >
              <img
                src={logo}
                alt="Logo"
                style={{ width: "20%", height: "30%", marginLeft: "5px" }}
              />
              <Typography className="name" sx={{ fontSize:{xs:".8rem",md:"2rem"} ,fontFamily:"Rubik"  }}>
                لوكال كرافت
              </Typography>
            </Box>
            <Typography
              sx={{
                textAlign: "start",
                margin: "2vh 5vw 0 0",
                fontSize:{xs:".7rem",md:"1rem"} ,
                fontFamily:"Rubik",
                color: "white",
              }}
            >
              {" "}
              موقعنا يتيح لك شراء العديد من المنتجات والحصول علي خدمات مميزه
              وسريعه ويمكنك شراء العديد من المنتجات{" "}
            </Typography>
          </Grid>

          <Grid item xs={5} sx={{ textAlign: "center" }}>
            <Typography
              sx={{
                display: "block",
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                padding: "3vh 0",
                color: "white",
                fontSize:{xs:".8rem",md:"1.5rem"} ,
                fontFamily:"Rubik"
              }}
            >
              الصفح
            </Typography>
            <Link
            to="/"
            style={{
              textDecoration:"none",
              color:"white",
              display: "block",
              textDecoration: "none",
              margin: "3vh",

            }}
             
            >
              الرئيسيه
            </Link>
            <Link 
              to="/products"
              style={{
                textDecoration:"none",
                color:"white",
                display: "block",
                textDecoration: "none",
                margin: "3vh",
  
              }}
            >
              المنتجات
            </Link>
            <Link to="/services"
               style={{
                textDecoration:"none",
                color:"white",
                display: "block",
                textDecoration: "none",
                margin: "3vh",
  
              }}
            >
              الخدمات
            </Link>
          </Grid>
          <Grid item xs={3}>
            <Typography
              sx={{
                display: "block",
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                padding: "3vh 0",
                textAlign: "start",
                color: "white",
                fontSize:{xs:".8rem",md:"1.5rem"} ,
                fontFamily:"Rubik"
              }}
            >
              تواصل معنا
            </Typography>
            <Box 
              sx={{ display: "flex", alignItems: "center",
               marginTop: "6vh" ,
               justifyContent:"space-evenly",
               ml:{xs:"10px",md:"0px"} }}
            >
              <Box sx={{ display: "block" }}>
                <Typography
                  sx={{
                    textAlign: "left",
                    color: "white",
                   
                    fontSize:{xs:".8rem",md:"1rem"} ,
                      fontFamily:"Rubik"
                  }}
                >
                  Email
                </Typography>
                <Typography
                  sx={{ color: "white",
                  fontSize:{xs:".6rem",md:"1rem"} ,
                  fontFamily:"Rubik" }}
                >
                  Eman@gmail.com
                </Typography>
              </Box>
              <MailOutlineIcon
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  borderRadius: "10vw",
                  padding: "1vw",
                  color: "gold",
                  width: "10%",
                  mr:{xs:"5px",md:"1px"}
                }}
              ></MailOutlineIcon>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "left",
                color: "white",
                justifyContent: "start",
                marginTop: "5vh",
              }}
            >
              <LinkedInIcon></LinkedInIcon>
              <TwitterIcon></TwitterIcon>
              <FacebookIcon></FacebookIcon>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Divider sx={{ color: "wheat" }}></Divider>
      <Typography
        sx={{
          backgroundColor: "#091242",
          textAlign: "center",
          color: "white",
          fontSize: ".8rem",
          padding: "10px 0",
        }}
      >
        Copyright &copy;2024 LocalCrafts. All rights reserved.
      </Typography>
    </>
  );
};

export default Footer;
