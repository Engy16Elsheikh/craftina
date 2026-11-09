import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

const ServiceCard = ({ orderData }) => {
  return (
    <Box sx={{ direction: "rtl" }}>
      <Card mb={10} sx={{ width: { xs: "200px", md: "250px" } }}>
        <CardMedia
          component="img"
          height={200}
          image={
            orderData.product?.photos?.[0] || orderData.service?.photos?.[0]
          }
          alt="Random"
        />
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Typography
              gutterBottom
              variant="p"
              component="div"
              sx={{ fontWeight: "bold" }}
            >
              {orderData.product?.name || orderData.service?.name}
            </Typography>
          </Box>
          <Box
            mt={2}
            mb={2}
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
              {orderData.product?.category.main ||
                orderData.service?.category.main}
            </Typography>
            <Typography
              gutterBottom
              variant="p"
              sx={{ fontFamily: " 'Rubik', sans-serif" }}
            >
              {orderData.product?.category.sub ||
                orderData.service?.category.sub}
            </Typography>
          </Box>

          <Typography variant="p" sx={{ fontFamily: " 'Rubik', sans-serif" }}>
            {orderData.product?.description || orderData.service?.description}
          </Typography>
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
              السعر : {orderData.product?.price || orderData.service?.price} ج
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
export default ServiceCard;