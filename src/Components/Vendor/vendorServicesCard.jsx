import React, { useState, useEffect } from 'react';
import { deleteService} from '../../api/vendor';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import UpdateServiceModel from './updateServicesModel';
import { CardMedia } from "@mui/material";
import { getMainCatogry, getSubService } from '../../api/categories';
const VendorServiceCard = ({ service, onDelete }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editedService, setEditedService] = useState(service);
  const [newPhoto, setNewPhoto] = useState(null);
  const [mainCategories, setMainCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [errors, setErrors] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    totalOrders: "",
    avgRating: "",
  });
  useEffect(() => {
    fetchMainCategories();
  }, []);
  useEffect(() => {
    if (editedService.category.main) {
      fetchSubCategories(editedService.category.main);
    }
  }, [editedService.category.main]);
  const handleEdit = () => {
    setIsEditOpen(true);
  };
  const fetchMainCategories = async () => {
    try {
      const response = await getMainCatogry();
      setMainCategories(response.data);
    } catch (error) {
      console.error("Error fetching main categories:", error);
    }
  };
  const fetchSubCategories = async (categoryId) => {
    try {
      const response = await getSubService(categoryId);
      setSubCategories(response.data);
    } catch (error) {
      console.error("Error fetching sub categories:", error);
    }
  };

  const handleCloseEdit = () => {
    setIsEditOpen(false);
    setEditedService(service);
    setErrors({});
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await deleteService(service._id, token);
      onDelete(service._id);
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

   

  return (
    <Box sx={{ direction: 'rtl' }} width={200}>
      <Card mb={10}>
      {service.photos.map((photo, index) => (
            <CardMedia
              key={index}
              component="img"
              height="140"
              image={photo}
              alt={service.name}
            />
          ))}
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            {service.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {service.description}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Main Category: {service.category.main}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Sub Category: {service.category.sub}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Price: {service.price}
          </Typography>
          {/* Display photo */}


          {/* Edit and Delete buttons */}
          <Box mt={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" color="primary" onClick={handleEdit}>
              تعديل
            </Button>
            <Button variant="contained" color="error" onClick={handleDelete}>
              حذف
            </Button>
          </Box>
        </CardContent>
      </Card>
      {/* Update Service Model */}
      <UpdateServiceModel
             open={isEditOpen}
             handleClose={handleCloseEdit}
             service={editedService}
             newPhoto={newPhoto}
             setNewPhoto={setNewPhoto}
             mainCategories={mainCategories}
             subCategories={subCategories}
             errors={errors}
             setErrors={setErrors}
            />
    </Box>
  );
};

export default VendorServiceCard;
