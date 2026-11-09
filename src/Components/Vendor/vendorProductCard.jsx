import React, { useState, useEffect } from "react";
import { deleteProduct, updateProduct } from "../../api/vendor";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import UpdateProductModel from "../Vendor/updateProductModel";
import { CardMedia } from "@mui/material";
import { getMainCatogryProducts, getSubProducts } from "../../api/categories";

const VendorProductCard = ({ product, onDelete }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editedProduct, setEditedProduct] = useState(product);
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
    if (editedProduct.category.main) {
      fetchSubCategories(editedProduct.category.main);
    }
  }, [editedProduct.category.main]);

  const fetchMainCategories = async () => {
    try {
      const response = await getMainCatogryProducts();
      setMainCategories(response.data);
    } catch (error) {
      console.error("Error fetching main categories:", error);
    }
  };

  const fetchSubCategories = async (categoryId) => {
    try {
      const response = await getSubProducts(categoryId);
      setSubCategories(response.data);
    } catch (error) {
      console.error("Error fetching sub categories:", error);
    }
  };

  const handleMainCategoryChange = (e) => {
    const categoryId = e.target.value;
    fetchSubCategories(categoryId);
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      category: {
        main: categoryId,
        sub: "", // Reset sub-category when main category changes
      },
    }));
  };

  const handleSubCategoryChange = (e) => {
    const subCategoryId = e.target.value;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      category: {
        ...prevProduct.category,
        sub: subCategoryId,
      },
    }));
  };
  const getMainCategoryName = (categoryId) => {
    const category = mainCategories.find((cat) => cat._id === categoryId);
    return category ? category.name : "غير محدد"; // Return the category name or a default value if not found
  };
  const getSubCategoryName = (subCategoryId) => {
    const subCategory = subCategories.find(
      (subCat) => subCat._id === subCategoryId
    );
    return subCategory ? subCategory.name : "غير محدد"; // Return the subcategory name or a default value if not found
  };
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await deleteProduct(product._id, token);
      onDelete(product._id);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = () => {
    setIsEditOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditOpen(false);
    setEditedProduct(product);
    setNewPhoto(null);
    setErrors({
      name: "",
      price: "",
      description: "",
      category: "",
      totalOrders: "",
      avgRating: "",
    });
  };

  return (
    <Box sx={{ direction: "rtl" }} width={200}>
      <Card mb={10}>
        <CardContent>
          {product.photos.map((photo, index) => (
            <CardMedia
              key={index}
              component="img"
              height="140"
              image={photo}
              alt={product.name}
            />
          ))}
          <Typography variant="h5" component="div" gutterBottom>
            {product.name}
          </Typography>
          
          <Box sx={{display:"flex",justifyContent:"space-around"}}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {product.category.main}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
              {product.category.sub}
          </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {product.description}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
             السعر: {product.price}
          </Typography>
          {/* Display photo */}

          {/* Edit and Delete buttons */}
          <Box mt={2} sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="contained" color="primary" onClick={handleEdit}>
              تعديل
            </Button>
            <Button variant="contained" color="error" onClick={handleDelete}>
              حذف
            </Button>
          </Box>
        </CardContent>
      </Card>
      {/* Update Product Model */}
      <UpdateProductModel
        open={isEditOpen}
        handleClose={handleCloseEdit}
        product={editedProduct}
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

export default VendorProductCard;
