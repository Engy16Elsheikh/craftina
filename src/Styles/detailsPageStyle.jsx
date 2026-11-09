import header2 from "../assets/Header2.jpeg";

export const imgStyle = {
  backgroundImage: `linear-gradient(rgba(9, 18, 66, 0.5), rgba(9, 18, 66, 0.5)), url(${header2})`,
  backgroundSize: "cover",
  backgroundAttachment: "fixed",
  height: { xs: "15vh", md: "10vh" },
  padding: "10%",
};

export const positionBox = {
  position: "absolute",
  borderRadius: "5%",
  backgroundColor: "white",
  top: "65%",
  width: "80%",
  padding: "6%",
  left: "50%",
  height: "75vh",
  transform: "translateX(-50%)",
  zIndex: 1,
  overflow: "auto",
};

export const mainBox = {
  position: "relative",
  textAlign: "right",
  direction: "rtl",
  marginBottom: {
    lg: "35%",
    md: "48%",
    xs: "85%",
  },
};

const detailsPageStyle = { imgStyle, positionBox, mainBox };

export default detailsPageStyle;