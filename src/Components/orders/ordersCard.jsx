import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const OrdersCard = ({ data }) => {
  //   const [isFavorite, setIsFavorite] = useState(false);

  //   const toggleFavorite = () => {
  //     setIsFavorite(!isFavorite);
  //   };

  return (
    <Box sx={{ direction: "rtl" }} width={200}>
      <Card mb={10}>
        {/* Product Section */}
        {data && data.product && (
          <>
            <CardMedia
              component="img"
              height={200}
              image={
                data.product.photos && data.product.photos.length > 0
                  ? data.product.photos[0]
                  : ""
              }
              alt="Product Image"
            />
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                {/* <Box sx={{ borderRadius: "50%" }}>
                  <img
                    height="35"
                    width="35"
                    src="https://www.figma.com/file/KoAR42FTHSt4h6oCQSSZOL/image/b0b5575b38d94edf1272fe60bcdd977fef76cd81"
                    alt="Person"
                    style={{ borderRadius: "50%" }}
                  />
                </Box> */}
                <Typography
                  gutterBottom
                  variant="p"
                  component="div"
                  sx={{ fontWeight: "bold" }}
                >
                  {data.product.name}
                </Typography>
                {/* <Box onClick={toggleFavorite}>
                  {isFavorite ? (
                    <FavoriteIcon sx={{ color: "red", fontSize: "1.5rem" }} />
                  ) : (
                    <FavoriteBorderIcon sx={{ fontSize: "1.5rem" }} />
                  )}
                </Box> */}
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
                  {data.product.category && data.product.category.main}
                </Typography>
                <Typography
                  gutterBottom
                  variant="p"
                  sx={{ fontFamily: " 'Rubik', sans-serif" }}
                >
                  {data.product.category && data.product.category.sub}
                </Typography>
              </Box>

              <Typography mt={2} variant="body2">
                {data.product.description}
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
                  السعر : {data.product.price} ج
                </Typography>
                <Box mt={0.5}>
                  <StarBorderIcon sx={{ fontSize: "1rem" }} />
                  <StarBorderIcon sx={{ fontSize: "1rem" }} />
                  <StarBorderIcon sx={{ fontSize: "1rem" }} />
                  <StarBorderIcon sx={{ fontSize: "1rem" }} />
                </Box>
              </Box>
            </CardContent>
          </>
        )}

        {/* Service Section */}
        {data && data.service && (
          <>
            <CardMedia
              component="img"
              height={200}
              image={
                data.service.photos && data.service.photos.length > 0
                  ? data.service.photos[0]
                  : ""
              }
              alt="Product Image"
            />
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                {/* <Box sx={{ borderRadius: "50%" }}>
                  <img
                    height="35"
                    width="35"
                    src="https://www.figma.com/file/KoAR42FTHSt4h6oCQSSZOL/image/b0b5575b38d94edf1272fe60bcdd977fef76cd81"
                    alt="Person"
                    style={{ borderRadius: "50%" }}
                  />
                </Box> */}
                <Typography
                  gutterBottom
                  variant="p"
                  component="div"
                  sx={{ fontWeight: "bold" }}
                >
                  {data.service.name}
                </Typography>
                {/* <Box onClick={toggleFavorite}>
                  {isFavorite ? (
                    <FavoriteIcon sx={{ color: "red", fontSize: "1.5rem" }} />
                  ) : (
                    <FavoriteBorderIcon sx={{ fontSize: "1.5rem" }} />
                  )}
                </Box> */}
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
                  {data.service.category && data.service.category.main}
                </Typography>
                <Typography
                  gutterBottom
                  variant="p"
                  sx={{ fontFamily: " 'Rubik', sans-serif" }}
                >
                  {data.service.category && data.service.category.sub}
                </Typography>
              </Box>

              <Typography mt={2} variant="body2">
                {data.service.description}
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
                  السعر : {data.service.price} ج
                </Typography>
                <Box mt={0.5}>
                  <StarBorderIcon sx={{ fontSize: "1rem" }} />
                  <StarBorderIcon sx={{ fontSize: "1rem" }} />
                  <StarBorderIcon sx={{ fontSize: "1rem" }} />
                  <StarBorderIcon sx={{ fontSize: "1rem" }} />
                </Box>
              </Box>
            </CardContent>
          </>
        )}
      </Card>
    </Box>
  );
};

export default OrdersCard;
