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

const ProductCard = ({ data }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const refIcon = useRef();
  const favirot = useSelector((state) => state.favirot.favirot);

  const HandleViewVendor = () => {
    navigate(`/userViewVendor/${data.vendor.id}`);
  };
  const isProductInFavirot = favirot.some((product) => product.id === data.id);

  useState(() => {
    setIsFavorite(isProductInFavirot);
  }, [isProductInFavirot]);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavirot(data));
    } else {
      dispatch(addToFavirot(data));
    }
    setIsFavorite(!isFavorite);
  };
  return (
    <Box sx={{ direction: "rtl" }} width={200}>
      <Card mb={10} sx={{ height: 450 }}>
        <CardMedia
          component="img"
          height={200}
          image={data.photos[0]}
          alt="Random"
        />
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Box sx={{ borderRadius: "50%" }}>
              {data.vendor.photo ? (
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
            </Box>

            <Typography
              mt={2}
              gutterBottom
              variant="p"
              component="div"
              style={{ cursor: "pointer" }}
              onClick={() =>
                navigate(`/productDetails/${data.id ? data.id : data._id}`)
              }
              sx={{ fontWeight: "bold" }}
            >
              {data.name}
            </Typography>
            <Box onClick={toggleFavorite} mt={2}>
              {isFavorite ? (
                <FavoriteIcon
                  style={{
                    cursor: "pointer",
                    color: "red",
                    fontSize: "1.5rem",
                  }}
                />
              ) : (
                <FavoriteBorderIcon
                  style={{ cursor: "pointer", fontSize: "1.5rem" }}
                />
              )}
            </Box>
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
              {data.category.main}
            </Typography>
            <Typography
              gutterBottom
              variant="p"
              sx={{ fontFamily: " 'Rubik', sans-serif" }}
            >
              {data.category.sub}
            </Typography>
          </Box>

          <Typography
            mt={2}
            variant="body2"
            mr={2}
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/productDetails/${data.id}`)}
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
            <Typography
              gutterBottom
              variant="p"
              sx={{ fontFamily: " 'Rubik', sans-serif" }}
            >
              السعر : {data.price} ج
            </Typography>
            <Box mt={0.5}>
              {/* <StarBorderIcon sx={{ fontSize: "1rem" }} />
              <StarBorderIcon sx={{ fontSize: "1rem" }} />
              <StarBorderIcon sx={{ fontSize: "1rem" }} />
              <StarBorderIcon sx={{ fontSize: "1rem" }} /> */}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductCard;
