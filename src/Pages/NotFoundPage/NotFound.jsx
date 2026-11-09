import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import { imgStyle, positionBox, mainBox } from '../../Styles/detailsPageStyle'
import YellowButtom from '../../Components/SharedComponnent/YellowButtom'


const NotFound = () => {
    const [buttomData,setData]=useState("العودة للرئيسية")
    return (
        <Box sx={{position:"relative"}} >
            <Box sx={imgStyle} >

            </Box>
            <Box sx={{position:"absolute",top:"110%",left:"35%"}}>
                <Box sx={{display:'flex'}}>
                    <Typography variant='h1' sx={{fontSize:"15rem",color:"rgba(18, 27, 72, 1)",fontFamily:"Rubik"}}>
                        4
                    </Typography>
                    <Typography variant='h1' sx={{fontSize:"15rem",color:"rgba(229, 152, 25, 1)",fontFamily:"Rubik"}}>
                        0
                    </Typography>
                    <Typography variant='h1' sx={{fontSize:"15rem",color:"rgba(18, 27, 72, 1)",fontFamily:"Rubik"}}>
                        4
                    </Typography>
                </Box>
                <Box sx={{direction:"rtl", textAlign:"center"}}>
                    <Typography mb={2} variant='h4' fontFamily={"Rubik"} fontWeight={"bold"} >
                        الصفحة غير موجودة

                    </Typography>
                    <Typography variant='p' fontWeight={"bold"} fontSize={".8rem"} sx={{color:"rgba(153, 153, 153, 1)"}}>
                        دعنا نساعدك تصل الى حيث ما يجب ان تكون

                    </Typography>
                  
                </Box> 
                <Box mb={10} mt={3} sx={{textAlign:"center",display:"flex",justifyContent:"center"}}>
                    <YellowButtom buttomData={buttomData} />
                </Box>
                 
               

            </Box>



        </Box>
    )
}

export default NotFound