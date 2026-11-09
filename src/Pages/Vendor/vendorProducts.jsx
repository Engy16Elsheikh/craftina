import React, { useEffect, useState } from "react";
// import { getVendorProducts } from '../api/Products';

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { getVendorProducts } from "../../api/vendor";
import Footer from "../../Components/footer";
import VendorProductCard from "../../Components/Vendor/vendorProductCard";

const VendorProducts = () => {
  const [products, setProducts] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const token = localStorage.getItem("token");
  const userId = userData ? userData._id : null;

  useEffect(() => {
    if (userId) {
      getVendorProducts(userId)
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    }
  }, [userId]);

  const handleDelete = (productId) => {
    setProducts(products.filter((product) => product._id !== productId));
  };

  return (
    <Box>
      <Box
        sx={{
          backgroundImage:
            "linear-gradient(rgba(9, 18, 66, 0.5), rgba(9, 18, 66, 0.5)), url('https://s3-alpha-sig.figma.com/img/0d66/363b/6f00d7173f94ca7d7ab6bcc39bde6406?Expires=1710115200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=nNS~WGeV-YZqRjq2K8z8Y0ZkboQaagtzO5-~ymUeJIlX60tb1SC55m2oQyBFliP1EiOzkWEURNE9viaL6E0vYTdvH7P~RulSceiaY9gwYFYFMMkyzf5fnmSMUgf~Dxp6rOpk1B~sOm7SqUeKcz~EgBLM94fMIYVCyJFQ1q1lgcJXPGN1h10xJYAmYOOgfmDBnAd3TNVQ6eL7HYzFMmcJZwvOVdsKIp2u4gZMHsNSldRmhVtGMZNtNn6XSah0-OczpBON2Hsv2APcER2QvWhd3Xt6Sph~qZqySsvegLNQP~pGqH9THcGfJmY00y5dSxODa5DHoKMYqZ8ocffq0kdXHg__')",
          backgroundAttachment: "fixed",
          objectFit: "cover",
          padding: "10%",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: "80vw",
            backgroundColor: "white",
            borderRadius: "30px",
            top: "20vh",
            left: "50%",
            height: "225vh",
            transform: "translateX(-50%)",
            zIndex: 1,
            direction: "rtl",
            overflowY: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px",
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontFamily: "Rubik", fontWeight: "bold", color: "#091242" }}
            >
              عرض المنتجات
            </Typography>
          </Box>
          {products.length === 0 ? (
            <Typography
              variant="body1"
              sx={{
                textAlign: "center",
                fontFamily: "Rubik",
                color: "#091242",
                mt: "20%",
                fontSize: "2rem",
              }}
            >
              لا توجد منتجات لعرضها
            </Typography>
          ) : (
            <Grid
              container
              sx={{ justifyContent: "center", alignItems: "center" }}
            >
              {products.map((product) => (
                <Grid key={product._id} item xs={12} sm={6} md={4} lg={3}>
                  <Box sx={{ width: "100%", marginBottom: "20px" }}>
                    <VendorProductCard
                      product={product}
                      onDelete={handleDelete}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>
      <Box sx={{ height: "200vh", position: "relative" }}>
        <Grid container sx={{ height: "200vh" }}>
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
      <Footer />
    </Box>
  );
};

export default VendorProducts;
