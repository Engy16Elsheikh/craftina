 // AllComponents.js
import React from 'react';
import { Container, Grid, Paper, Typography, Checkbox, FormControlLabel, Rating, Avatar } from '@mui/material';
import '../Styles/ProductCards.css';
import image2 from './Best-Apps-To-Sell-Handmade-Items-on-Android-and-iOS.jpg';
import image1 from './Best-Apps-To-Sell-Handmade-Items-on-Android-and-iOS.jpg';

const ProductCards = () => {
  // Assume you have an array of separate images for each card
  const serviceImages = [image1, image2, image1, image2, image1, image2, image1, image2];

  return (
    <Container>
      <div>
      <img src="https://s3-alpha-sig.figma.com/img/0d66/363b/6f00d7173f94ca7d7ab6bcc39bde6406?Expires=1709510400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Y-dGzk1BZ7AzXsytxPi6tPDQGedhQNe-fnxuhUubZEHGmJGV3Mv7ViyEdH~h1mEoLCLZ8bGvOMHOac9P10gmWkZUvNbdtKWNZFPEeVUDFqS~ZRZfxiSZ-Bfn0ETk6BhRY67QaLL7ERh4Tt5XNHQJoa9j6TeSL6C5SuJc79nQ37shNjVlPVaXOzUxa5SY6cvUscKDALerDU7CDku6S5EHwZ1hlb2sUHyC6a71TKY~D00y8~YzvGecVrgd3XjbDRMF1mhq5Tgo~TxSxoDkjuf3ZxQ-wlKLEi1C30bdkPyA9ezOh37aeshkILVrPjvVBKeJKsfNXN5CUsrMZj7KM5BWoQ__" alt="Header" className="header" />
        <Typography variant="h1">قائمه الخدمات</Typography>
      </div>
      <Grid container spacing={2}>
        {/* Header Section */}
        <Grid item xs={12}>
          
        </Grid>
        <Grid item xs={9}>
          <div>
            <Typography variant="h2">الخدمات</Typography>
            <Grid container spacing={2}>
              {/* Cards */}
              {[...Array(8)].map((_, index) => (
                <Grid key={index} item xs={3}>
                  <Paper style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px' }}>
                    <img src={image2} alt="Service Image" style={{ width: '100%' }} />
                    <Avatar src={serviceImages[index]} alt="Service Image" style={{ width: '50px', height: '50px', marginBottom: '5px' }} />
                    <Typography variant="h4">عنوان الخدمة</Typography>
                    <Typography variant="body1">التصنيف: التصنيف الفرعي</Typography>
                    <Typography variant="body1">الوصف: وصف الخدمة</Typography>
                    <Typography variant="body1">LE250: السعر</Typography>
                    <Rating name="half-rating" defaultValue={3.5} precision={0.5} readOnly />
                    {/* Rating by Stars */}
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </div>
        </Grid>
        {/* Sidebar Section */}
        <Grid item xs={3}>
          <Paper style={{ backgroundColor: '#f0f0f0', padding: '50px' }}>
            <Typography variant="h3">التصنيف</Typography>
            <FormControlLabel control={<Checkbox />} label="اسم المنتج 1" />
            <FormControlLabel control={<Checkbox />} label="اسم المنتج 2" />
            <FormControlLabel control={<Checkbox />} label="اسم المنتج 3" />
            {/* More categories go here */}
            <Typography variant="h3">التصنيف الفرعي</Typography>
            <FormControlLabel control={<Checkbox />} label="اسم المنتج 1" />
            <FormControlLabel control={<Checkbox />} label="اسم المنتج 2" />
            <FormControlLabel control={<Checkbox />} label="اسم المنتج 3" />
            {/* More subcategories go here */}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductCards;






