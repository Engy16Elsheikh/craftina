import React, { useEffect, useState } from 'react'
import { Avatar, Box ,Typography } from '@mui/material'
import Rating from '@mui/material/Rating';
import { formatDistanceToNow } from 'date-fns';
import { axiosInstance } from '../../api/config';
const value = 4.5;

const CommentCard = ({data}) => {
    const createdAt = formatDistanceToNow(new Date(data.createdAt), { addSuffix: true });
    const [userData,setUserData]=useState({})
    const token = localStorage.getItem("token");
    useEffect(() => {
        const token = localStorage.getItem("token");
        const fetchUserData = async () => {
            try {
                const response = await axiosInstance.get(`/users/${data.customer}`, {
                    headers: {
                       token
                    }
                });
                setUserData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUserData();
    }, [data.customer]);
    
    return (
        <>
            <Box mt={10}>
                <Box sx={{ display: "flex", }} mb={3}>
                    {userData.photo?
                    <Avatar src={userData.photo}/>:
                        <Box sx=
                            {{
                                borderRadius: "50%",
                                backgroundColor: "#164C96",
                                width: "30px",
                                height: "25px",
                                padding: "2%",
                                textAlign: "center",
                                color: "white",
                                fontSize: ".9rem"
                            }}>
                            <Box variant='p' mt={.5}>A . A</Box>

                        </Box>
                    }
                    
                    <Box mt={1} sx={{ marginRight: "2%" ,marginLeft:"5%" }} >
                        <Typography variant='p'>  {userData.name} </Typography>
                        <Box>
                            <Rating name="read-only" value={value} readOnly />
                        </Box>
                    </Box>
                    <Typography mt={1.5} variant='p'>  {createdAt} </Typography>

                </Box>
                <Typography variant='p' mb={3}>التقيم : {data.rating}</Typography>

                <Box sx={{ width: "70%" }} mt={2}>
                    <Typography variant='p' sx={{ color: "#4F547B" }}>
                        {data.comment}
                    </Typography>
                </Box>
            </Box>




        </>
    )
}

export default CommentCard