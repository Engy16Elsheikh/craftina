import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Comments from "./comments";
const labels = {
  0.5: "غير مفيد",
  1: "غير مفيد+",
  1.5: "ضغيف",
  2: "ضعيف + ",
  2.5: "جيد ",
  3: "جيد +",
  3.5: "جيد جدا",
  4: "جيد جدا +",
  4.5: "ممتاز",
  5: "ممتاز +",
};

export const Review = ({ data }) => {
  const value = 4;
  const headerStyle = {
    fontFamily: " 'Rubik', sans-serif",
    color: "#164C96",
  };
  return (
    <>
      <Box
        sx={{
          marginTop: { xs: "120vh", md: "100vh", },
          direction: " rtl",
          width: "86%",
          padding: "5%",
        }}
      >
        <Grid container mt={10}>
          <Grid sm={10}>
            <Box mt={10}>
              <Typography variant="h4" sx={headerStyle}>
                التقيمات
              </Typography>
              <svg
                width="128"
                height="4"
                viewBox="0 0 128 4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="128" height="4" fill="#164C96" />
              </svg>
            </Box>

            <Box mt={7}>
              <Grid container sx={{ justifyContent: "space-around" }}>
                <Grid xs={6} md={4} mt={3} mb={5}>
                  <Typography variant="h1" sx={headerStyle}>
                    4.3
                  </Typography>
                  <Box
                    sx={{
                      width: 200,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Rating
                      name="text-feedback"
                      value={value}
                      readOnly
                      precision={0.5}
                      emptyIcon={
                        <StarIcon
                          style={{ opacity: 0.55 }}
                          fontSize="inherit"
                        />
                      }
                    />
                  </Box>
                  <Typography variant="h6" sx={headerStyle}>
                    {labels[value]}
                  </Typography>
                </Grid>
                <Grid xs={6} md={4} mb={5}>
                  <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
                    <Typography variant="P" mt={0.8} sx={headerStyle}>
                      70%
                    </Typography>
                    <Rating name="read-only" value={value} readOnly />
                  </Box>
                  <Box
                    mt={3}
                    sx={{ display: "flex", justifyContent: "space-evenly" }}
                  >
                    <Typography variant="P" mt={0.8} sx={headerStyle}>
                      70%
                    </Typography>
                    <Rating name="read-only" value={value} readOnly />
                  </Box>
                  <Box
                    mt={3}
                    sx={{ display: "flex", justifyContent: "space-evenly" }}
                  >
                    <Typography variant="P" mt={0.8} sx={headerStyle}>
                      30%
                    </Typography>
                    <Rating name="read-only" value={value} readOnly />
                  </Box>
                  <Box
                    mt={3}
                    sx={{ display: "flex", justifyContent: "space-evenly" }}
                  >
                    <Typography variant="P" mt={0.8} sx={headerStyle}>
                      80%
                    </Typography>
                    <Rating name="read-only" value={value} readOnly />
                  </Box>
                  <Box
                    mt={3}
                    sx={{ display: "flex", justifyContent: "space-evenly" }}
                  >
                    <Typography variant="P" mt={0.8} sx={headerStyle}>
                      90%
                    </Typography>
                    <Rating name="read-only" value={value} readOnly />
                  </Box>
                </Grid>

                <Grid xs={12} md={4} mb={5}>
                  <Box>
                    <svg
                      width="292"
                      height="5"
                      viewBox="0 0 292 5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="292" height="5" rx="2.5" fill="#20590C" />
                    </svg>
                  </Box>
                  <Box mt={3}>
                    <svg
                      width="161"
                      height="5"
                      viewBox="0 0 161 5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="161" height="5" rx="2.5" fill="#20590C" />
                    </svg>
                  </Box>
                  <Box mt={5}>
                    <svg
                      width="114"
                      height="5"
                      viewBox="0 0 114 5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="114" height="5" rx="2.5" fill="#20590C" />
                    </svg>
                  </Box>
                  <Box mt={4}>
                    <svg
                      width="48"
                      height="5"
                      viewBox="0 0 48 5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="48" height="5" rx="2.5" fill="#20590C" />
                    </svg>
                  </Box>
                  <Box mt={4}>
                    <svg
                      width="25"
                      height="5"
                      viewBox="0 0 25 5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="25" height="5" rx="2.5" fill="#20590C" />
                    </svg>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Comments data={data} />
          </Grid>

          <Grid sm={2}></Grid>
        </Grid>
      </Box>
    </>
  );
};
