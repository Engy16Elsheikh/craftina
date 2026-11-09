import header2 from "../assets/Header2.jpeg"
export const imgStyle = {
    backgroundImage: `linear-gradient(rgba(9, 18, 66, 0.5), rgba(9, 18, 66, 0.5)), url(${header2})`,
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    height:{xs:"15vh",md:"10vh"},
    objectFit: "cover",
    padding: "10%",
}

export const positionBox = {
    position: "absolute",
    borderRadius: "5%",
    backgroundColor: "white",
    top: "65%",
    // right: "5%",
    width: "80%",
    // bottom: "10%",
    padding: "6%",
    // height: "5vh",
    // position: "absolute",
    // width: "70vw",
    // backgroundColor: "white",
    // borderRadius: "30px",
    // top: "20vh",
    left: "50%",
    height: "75vh",
    transform: "translateX(-50%)",
    zIndex: 1,
    overflow: "auto",
    // padding: "20px",
}

export const mainBox = {
    position: "relative",
    textAlign: "right",
    direction: "rtl",
    marginBottom:{

        lg:"35%",md:"48%", xs:"85%"
    }
    
}

export default { imgStyle, positionBox, mainBox }
