import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import header from "../../assets/header.jpeg";

const HomeHeader = ({ onButtonClick }) => {
  return (
    <Box sx={{ direction: "rtl", color: "black" }}>
      <Box
        sx={{
          backgroundImage: `url(${header})`,
          width: "100vw",
          height: "90vh",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box>
          <Box>
            <Typography
              variant="h3"
              sx={{
                textAlign: "right",
                marginRight: "13vw",
                fontSize: {xs:"1.4rem",md:"2rem"},
                fontFamily: "Rubik",
              }}
            >
              صناعات محلية وخدمات اكتشف
            </Typography>
            <Typography
              variant="h3"
              sx={{
                textAlign: "right",
                marginBottom: "20px",
                marginRight: "13vw",
                fontSize: {xs:"1.4rem",md:"2rem"},
                fontFamily: "Rubik",
                marginTop:"5px"
              }}
            >
              معنا الإبداع المحلي
            </Typography>
          </Box>

          <Typography
            sx={{
              fontSize: "1em",
              textAlign: "start",
              width:{xs:"80%",md:"40%"} ,
              marginRight: "13vw",
              fontWeight: "700",
              // fontFamily: "Rubik",
            }}
          >
            موقعنا يساعدك في طلب العديد من الخدمات والمنتجات التي تناسب أحتياجك
            وأنت في المنزل لأنه يحتوي علي العديد من ذوي الحرف الماهرين الذين
            يعرضون أعمالهم ويمكن تصفح جميع هذه الحرف والمنتجات واختيار ما يناسبك
            منها وأختيار أفضل سعر.
          </Typography>
          <Button
            onClick={onButtonClick}
            sx={{
              background:
                "linear-gradient(45deg, #FFB629 0%, #FFDA56 50%, #FFD7A6 100%)",
              border: 0,
              color: "black",
              height: 48,
              padding: "0 30px",
              boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
              marginRight: "13vw",
              marginTop: "5vh",
              position: "relative",
              fontFamily: "Rubik",
             
            }}
          >
            أكتشف أكثر
            <Box
              sx={{
                position: "absolute",
                background: "#DCE4E7",
                width: "20%",
                borderRadius: "50% 0 0",
                bottom: "0",
                height: "40%",
                opacity: "70%",
                right: "0",
              }}
            ></Box>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default HomeHeader;
