import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, Container, TextField } from "@mui/material";
import { axiosInstance } from "../../api/config";

const ServiceModel = ({ open, handleClose, Id}) => {
  const [phoneError, setPhoneError] = useState("");
  const [messageError, setMessageError] = useState("");
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [messageTouched, setMessageTouched] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const token = localStorage.getItem("token");

  const [orderData, setOrderData] = useState({
    phone: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setOrderData({
      ...orderData,
      [name]: value,
    });

    if (name === "phone") {
      setPhoneTouched(true);
      setPhoneError("");
    } else if (name === "message") {
      setMessageTouched(true);
      setMessageError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        await axiosInstance.post(`/services/${Id}/order`, orderData, {
          headers: {
            token,
          },
        });
        setSubmitMessage("طلبك تم إرساله بنجاح!");
      } catch (error) {
        setSubmitMessage("حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.");
        console.error("Error submitting order:", error);
      }
    }
  };

  const validateForm = () => {
    let isValid = true;

    if (!/^\d{10}$/g.test(orderData.phone)) {
      setPhoneError("رقم الهاتف يجب أن يتكون من 10 أرقام");
      isValid = false;
    } else {
      setPhoneError("");
    }

    if (orderData.message.length < 10 || orderData.message.length > 500) {
      setMessageError("الرسالة يجب أن تكون من 10 إلى 500 حرف");
      isValid = false;
    } else {
      setMessageError("");
    }

    return isValid;
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "55%",
    height: "75%",
    bgcolor: "background.paper",
    borderRadius: "30px",
    boxShadow: 24,
    p: 4,
    direction: "rtl",
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Container>
          <Typography variant="h5" sx={{ fontFamily: "Rubik" }}>
            {" "}
            ارسال الطلب الى البائع{" "}
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box mt={5}>
              <TextField
                id="standard-basic"
                name="phone"
                value={orderData.phone}
                onChange={handleChange}
                label="رقم الهاتف"
                variant="standard"
                placeholder="أدخل رقم الهاتف"
                sx={{ width: "40vw", direction: "rtl", mb: "5vh" }}
              />
              <br />
              {phoneTouched && phoneError && (
                <Typography variant="caption" color="error">
                  {phoneError}
                </Typography>
              )}
              <br />
              <TextField
                name="message"
                value={orderData.message}
                onChange={handleChange}
                id="outlined-multiline-static"
                label="رسالة صغيرة"
                multiline
                rows={6}
                sx={{ width: "40vw", direction: "rtl", mb: "5vh" }}
              />
              <br />
              {messageTouched && messageError && (
                <Typography variant="caption" color="error">
                  {messageError}
                </Typography>
              )}
            </Box>
            {submitMessage && (
              <Typography
                variant="body1"
                color={submitMessage.includes("خطأ") ? "error" : "primary"}
              >
                {submitMessage}
              </Typography>
            )}
            <Box
              sx={{
                display: "flex",
                marginTop: 1,
                justifyContent: "space-evenly",
                marginLeft: "20%",
              }}
            >
              <Button
                type="submit"
                sx={{
                  background:
                    "linear-gradient(90deg, #1F2A69  0%, #091242 100%)",
                  border: 0,
                  color: "White",
                  height: 48,
                  padding: "0 2vw",
                  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
                  marginTop: "2vh",
                  position: "relative",
                  borderRadius: 0,
                  textWrap: "nowrap",
                  fontSize: "1.5vw",
                }}
              >
                ارسال
                <Box
                  sx={{
                    position: "absolute",
                    background: "#1F2A69",
                    width: "20%",
                    borderRadius: "50% 0 0",
                    bottom: "0",
                    height: "40%",
                    opacity: "70%",
                    right: "0",
                  }}
                ></Box>
              </Button>
              <Button
                onClick={handleClose}
                sx={{
                  background:
                    "linear-gradient(45deg, #FFB629 0%, #FFDA56 50%, #FFD7A6 100%)",
                  border: 0,
                  color: "black",
                  height: 48,
                  padding: "0 2vw",
                  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
                  marginTop: "2vh",
                  position: "relative",
                  borderRadius: 0,
                  textWrap: "nowrap",
                  fontSize: "1.5vw",
                }}
              >
                الغاء
                <Box
                  sx={{
                    position: "absolute",
                    background: "#1F2A69",
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
          </form>
        </Container>
      </Box>
    </Modal>
  );
};

export default ServiceModel;
