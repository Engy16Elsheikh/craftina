import React, { useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import ServiceCard from '../serviceCard';
import { getProductList } from '../../api/Products'; 
import ProductCard from './ProductCard';

const CardPagination = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const cardsPerPage = 8;
    useEffect(() => {
       
        const fetchProductList = async () => {
            try {
                const response = await getProductList(); 
                setProducts(response.data.data);
                setTotalPages(response.data.meta.pageCount);
            } catch (error) {
                console.error('Error fetching product list:', error);
            }
        };
        fetchProductList();
    }, [currentPage]);

//     const handleChange = (event, value) => {
//         setCurrentPage(value);
//     };

//     const startIndex = (currentPage - 1) * cardsPerPage;
//     const endIndex = startIndex + cardsPerPage;

    return (
        <Box mt={10}>
            <Grid container spacing={4} sx={{ width: "90%" }}>
                {products.slice(startIndex, endIndex).map(product => (
                    <Grid item key={product.id} xs={12} md={6} lg={3} mb={5}>
                        <ProductCard data={product} />
                    </Grid>
                ))}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination
                    color='primary'
                    count={totalPages}
                    page={currentPage}
                    onChange={handleChange}
                />
            </Box>
        </Box>
    );
};

export default CardPagination;














// import React, { useEffect, useState } from 'react';
// import { Box, Grid } from '@mui/material';
// import Pagination from '@mui/material/Pagination';
// import ServiceCard from '../serviceCard'; 
// import { getProductList } from "../../api/Products";

// const CardPaggenation = () => {
//     const [products, setProducts] = useState([]);

//     useEffect(() => {
//         getProductList()
//         .then((res) => {
//             setProducts(res.data)
//         })
//         .catch((err) => console.log(err));
//     }, []);
    
//     const [currentPage, setCurrentPage] = useState(1);
//     const cardsPerPage = 8; 
//     const totalCards = 30; 

//     const handleChange = (event, value) => {
//         setCurrentPage(value);
//     };

//     const startIndex = (currentPage - 1) * cardsPerPage;
//     const endIndex = startIndex + cardsPerPage;

//     return (
//         <Box mt={10}>
//             <Grid container spacing={4}  sx={{ width: "90%" }}>
//                 {Array.from({ length: totalCards }).slice(startIndex, endIndex).map((_, index) => (
//                     <Grid item key={index} xs={12} md={6} lg={3} mb={5}>
//                         <ServiceCard />
//                     </Grid>
//                 ))}
//             </Grid>
//             <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
//                 <Pagination color='primary' count={Math.ceil(totalCards / cardsPerPage)} page={currentPage} onChange={handleChange} />
//             </Box>
//         </Box>
//     );
// };

// export default CardPaggenation;
