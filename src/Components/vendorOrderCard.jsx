import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ServiceCard from "./serviceCard";
import { useEffect, useState } from "react";
import { Container } from "@mui/material";


const VendorOrderCard = ({ data }) => {
  return (
    <Box sx={{ direction: "rtl", width: "100%" }}>     
      <Container sx={{ width: "75%", backgroundColor: "lightgray", padding: "2%" }}>
        <Box sx={{ display: "flex" }}>
          <Box mt={1}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0H15V15H0V0Z" fill="url(#paint0_linear_56_9125)" />
              <defs>
                <linearGradient id="paint0_linear_56_9125" x1="-26360.3" y1="77386.1" x2="-26341.4" y2="77387.4" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#FFB629" />
                  <stop offset="0.507189" stop-color="#FFDA56" />
                  <stop offset="1" stop-color="#FFD7A6" />
                </linearGradient>
              </defs>
            </svg>
          </Box>
          <Typography variant="h5" fontFamily={"Rubik"}>طلب الخدمة </Typography>
        </Box>

        <Grid container mt={3} spacing={3}>

          <Grid item sm={4} mr={3} mb={3} >

            <Box mt={3} sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="p" fontWeight={"bold"} fontFamily={"Rubik"}>الأسم  </Typography>
              <Typography variant="p">   {data.customer.name}</Typography>
            </Box>

            <Box mt={3} sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="p" fontWeight={"bold"} fontFamily={"Rubik"}>تليفون  </Typography>
              <Typography variant="p">  {data.phone}</Typography>
            </Box>


            <Box mt={3} sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="p" fontWeight={"bold"} fontFamily={"Rubik"}>رسالة  </Typography>
              <Typography variant="p">  {data.message}</Typography>
            </Box>
          </Grid>

          <Grid item sm={2} ></Grid>

          <Grid item md={5} xs={12} >
            <Box  sx={{mr:{xs:"10%"}}}>
              {data && <ServiceCard orderData={data}></ServiceCard>}
            </Box>
          </Grid>

        </Grid>
      </Container>

    </Box >


  );
};

export default VendorOrderCard;
