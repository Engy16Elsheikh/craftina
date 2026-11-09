import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addToFavirot, removeFavirot } from "../../stores/slice/favirot";

const UsersCard = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const refIcon = useRef();

  const HandleViewVendor = () => {
    navigate(`/userViewVendor/${data.vendor.id}`);
  };

  return (
    <Box sx={{ direction: "rtl" }} width={200}>
      <Card mb={10} sx={{ height: 450 }}>
        <CardMedia
          component="img"
          height={200}
          image={data.photo}
          alt="Random"
        />
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            {/* <Box sx={{ borderRadius: "50%" }}>
              {data.user.photo ? (
                <IconButton onClick={HandleViewVendor}>
                  <img
                    height="35"
                    width="35"
                    src={data.vendor.photo}
                    alt="Person"
                    style={{ borderRadius: "50%" }}
                  />
                </IconButton>
              ) : (
                <IconButton onClick={HandleViewVendor}>
                  <img
                    height="35"
                    width="35"
                    src="https://th.bing.com/th/id/OIP.e4YIHGIZBy1X7GW01zOQfwHaHa?rs=1&pid=ImgDetMain"
                  />
                </IconButton>
              )}
            </Box> */}

            <Typography
              gutterBottom
              variant="p"
              component="div"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/productDetails/${data.id}`)}
              sx={{ fontWeight: "bold" }}
            >
              {data.name}
            </Typography>
            <Typography
              gutterBottom
              variant="p"
              sx={{ fontFamily: " 'Rubik', sans-serif", fontWeight: "bold" }}
            >
              {data.job}
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
              {data.address && data.address.gov && data.address.gov}
            </Typography>
            <Typography
              gutterBottom
              variant="p"
              sx={{ fontFamily: " 'Rubik', sans-serif" }}
            >
              {data.address && data.address.city && data.address.city}
            </Typography>
          </Box>

          <Typography
            mt={2}
            variant="body2"
            mr={2}
            sx={{ 
              height:"60px",
              maxLines:"3",
              overflow:"clip"
             }}
          
          >
            {data.description}
          </Typography>

          <Box
            mt={2}
            sx={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Typography variant="p" 
            sx={{fontFamily:"Rubik",
             fontWeight:"bold",
             fontSize:".9rem"}}> الهاتف : 
              
            </Typography>
            <Typography variant="p"
            sx={{fontSize:".9rem"}}>
            {data.phone}
            </Typography>
          </Box>
          <Box
            mt={2}
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
             
            }}
          >
            <Typography variant="p" sx={{fontFamily:"Rubik", fontWeight:"bold", fontSize:".9rem"}}> البريد : 
              
            </Typography>
            <Typography variant="p" sx={{fontSize:".9rem"}}>
            {data.email}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UsersCard;