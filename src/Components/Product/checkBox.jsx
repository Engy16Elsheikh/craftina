import React from 'react'
import { Box, Container, Grid, Typography } from '@mui/material'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const CheckBoxComponnent = () => {
    return (
        <Box mt={3} >
            <FormGroup >
                <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                    <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label={
                            <Box >
                                <Typography variant='p' sx={{ fontFamily: "'Rubik', sans-serif" }}>
                                    أسم المنتج
                                </Typography>

                            </Box>}
                    />
                    <Typography variant='p' mt={1}>
                        250
                    </Typography>
                </Box>

                
                {/* <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                    <FormControlLabel
                        control={<Checkbox />}
                        label={
                            <Box >
                                <Typography variant='p' sx={{ fontFamily: "'Rubik', sans-serif" }}>
                                    أسم المنتج
                                </Typography>

                            </Box>}
                    />
                    <Typography variant='p' mt={1}>
                        250
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                    <FormControlLabel
                        control={<Checkbox />}
                        label={
                            <Box >
                                <Typography variant='p' sx={{ fontFamily: "'Rubik', sans-serif" }}>
                                    أسم المنتج
                                </Typography>

                            </Box>}
                    />
                    <Typography variant='p' mt={1}>
                        250
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                    <FormControlLabel
                        control={<Checkbox />}
                        label={
                            <Box >
                                <Typography variant='p' sx={{ fontFamily: "'Rubik', sans-serif" }}>
                                    أسم المنتج
                                </Typography>

                            </Box>}
                    />
                    <Typography variant='p' mt={1}>
                        250
                    </Typography>
                </Box> */}




            </FormGroup>
        </Box>
    )
}

export default CheckBoxComponnent