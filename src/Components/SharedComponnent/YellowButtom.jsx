import React from 'react'
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link } from 'react-router-dom';
const YellowButtom = (props) => {
  return (
    <Button
            sx={{
              background:
                "linear-gradient(45deg, #FFB629 0%, #FFDA56 50%, #FFD7A6 100%)",
              border: 0,
              color: "black",
              height: 48,
              padding: "0 30px",
              boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
              fontFamily:'Rubik',
              position: "relative",
            }}
          >
            <Link to="/home"> {props.buttomData}</Link>
           
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
  )
}

export default YellowButtom