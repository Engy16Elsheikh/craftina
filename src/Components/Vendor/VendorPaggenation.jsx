import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import VendorOrderCard from '../vendorOrderCard';
const VendorPaggenation = ({ data }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 2;
    const totalCards = 9;
    const handleChange = (event, value) => {
        setCurrentPage(value);
    };
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    return (
        <Box mt={10} mb={7}>
            <Grid container >
                {data.map(order => (
                    <Grid item key={order.id} xs={12} mb={5}>
                        { order && <VendorOrderCard data={order} />}
                    </Grid>
                ))}
                
            </Grid>
           
        </Box>
    );
};

export default VendorPaggenation;
