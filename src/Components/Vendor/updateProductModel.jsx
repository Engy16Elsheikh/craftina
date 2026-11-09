import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Button,
  Container,
  TextField,
  MenuItem,
  Grid,
  Avatar,
} from "@mui/material";
import { updateProduct } from "../../api/vendor";
import EditIcon from "@mui/icons-material/Edit";
import { Camera } from "@mui/icons-material";
import { getMainCatogryProducts, getSubProducts } from "../../api/categories";
const UpdateProductModel = ({
  open,
  handleClose,
  product,
  newPhoto,
  setNewPhoto,
}) => {
  const [editedProduct, setEditedProduct] = useState({
    ...product,
    category: {
      main: product.category?.main || "",
      sub: product.category?.sub || "",
    },
  });

  const [mainCategories, setMainCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedMainCategory, setSelectedMainCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [errors, setErrors] = useState("");
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
  useEffect(() => {
    fetchMainCategories();
  }, []);

  useEffect(() => {
    if (editedProduct.category.main) {
      fetchSubCategories(editedProduct.category.main);
    }
  }, [editedProduct.category.main]);
  const handleMainCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedMainCategory(categoryId); // Update selectedMainCategory
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
    setSelectedSubCategory(subCategoryId); // Update selectedSubCategory
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      category: {
        ...prevProduct.category,
        sub: subCategoryId,
      },
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));
  };
  const validateInput = (name, value) => {
    let error = "";
    switch (name) {
      case "name":
        error =
          value.length < 2 || value.length > 50
            ? "الاسم يجب أن يكون بين 2 و 50 حرفًا"
            : "";
        break;
      case "price":
        error =
          isNaN(value) || parseFloat(value) <= 0
            ? "السعر يجب أن يكون أكبر من صفر ويجب أن يكون رقمًا"
            : "";
        break;
      case "description":
        error =
          value.length < 20 || value.length > 500
            ? "الوصف يجب أن يكون بين 20 و 500 حرفًا"
            : "";
        break;
      case "category.main":
        error =
          typeof value !== "string" ? "الفئة الرئيسية يجب أن تكون نصًا" : "";
        break;
      case "category.sub":
        error =
          typeof value !== "string" ? "الفئة الفرعية يجب أن تكون نصًا" : "";
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };
  const handleFileChange1 = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "LocalCrafts");

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dbtaj8rn6/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        setImageURL(data.secure_url);
        setNewPhoto(data.secure_url);
        setEditedProduct((prevProduct) => ({
          ...prevProduct,
          photos: [data.secure_url, prevProduct.photos[1] || ""],
        }));
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleFileChange2 = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "LocalCrafts");

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dbtaj8rn6/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        setImageURL(data.secure_url);
        setNewPhoto(data.secure_url);
        setEditedProduct((prevProduct) => ({
          ...prevProduct,
          photos: [prevProduct.photos[0] || "", data.secure_url],
        }));
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      // Validate all fields before submission
      Object.keys(editedProduct).forEach((key) =>
        validateInput(key, editedProduct[key])
      );

      // Check if there are any errors
      if (Object.values(errors).some((error) => error !== "")) {
        console.log("Form has errors");
        return;
      }

      const token = localStorage.getItem("token");

      // Map selected IDs to category and subcategory names
      const mainCategoryName = mainCategories.find(
        (category) => category._id === selectedMainCategory
      )?.name;
      const subCategoryName = subCategories.find(
        (subcategory) => subcategory._id === selectedSubCategory
      )?.name;

      // Construct updatedFields object with the latest data
      const updatedFields = {
        name: editedProduct.name,
        price: parseFloat(editedProduct.price),
        description: editedProduct.description,
        photos: editedProduct.photos,
        category: {
          main: mainCategoryName || editedProduct.category.main,
          sub: subCategoryName || editedProduct.category.sub,
        },
        totalOrders: editedProduct.totalOrders,
        avgRating: editedProduct.avgRating,
      };

      // Send the update request to the server
      const response = await updateProduct(
        editedProduct._id,
        updatedFields,
        token
      );
      console.log("Update Response:", response.data);

      // Update the editedProduct state with the updated data
      setEditedProduct(response.data);

      // Close the modal
      handleClose();
      window.location.reload();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "55%",
    height: "90%",
    bgcolor: "background.paper",
    borderRadius: "30px",
    boxShadow: 24,
    p: 4,
    direction: "rtl",
    overflow: "auto",
  };
  const filteredSubCategories = subCategories.filter(
    (subCategory) => subCategory.parent === selectedMainCategory
  );
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Container>
          {/* <Grid
                mt={3}
                item
                xs={12}
                md={2}
                sx={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                }}
              > */}
          {/* <label htmlFor="file-upload">
                  {editedProduct.photos[0] ? (
                    <Avatar
                      key={editedProduct.photos}
                      src={editedProduct.photos}
                      alt="صوره المنتج"
                      sx={{
                        width: 150,
                        height: 150,
                        mr: "2vw",
                        mt: "7vh",
                      }}
                    />
                  ) : (
                    <Camera
                      sx={{
                        fontSize: "15vw",
                        color: "black",
                        mr: "2vw",
                        mt: "7vh",
                      }}
                    />
                  )}
                </label>
                <EditIcon
                  style={{
                    position: "absolute",

                    top: { md: "13%", xs: "4%" },
                    bottom: { xs: "40%", md: "0%" },
                    right: "10%",
                    color: "blue",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    borderRadius: "50%",
                    padding: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => document.getElementById("file-upload").click()}
                />
               
              </Grid> */}

          <Typography variant="h5" sx={{ fontFamily: "Rubik" }}>
            {" "}
            تعديل المنتج{" "}
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box mt={5}>
              <input
                type="file"
                id="file-upload1"
                accept="image/*"
                onChange={handleFileChange1}
              />
              <input
                type="file"
                id="file-upload2"
                accept="image/*"
                onChange={handleFileChange2}
              />
              <TextField
                id="standard-basic"
                name="name"
                value={editedProduct.name}
                error={!!errors.name}
                helperText={errors.name}
                onChange={handleInputChange}
                label="اسم المنتج"
                variant="standard"
                placeholder="أدخل اسم المنتج الجديد"
                sx={{ width: "40vw", direction: "rtl", mb: "5vh" }}
              />
              <br />
              <TextField
                name="description"
                value={editedProduct.description}
                onChange={handleInputChange}
                error={!!errors.description}
                helperText={errors.description}
                id="outlined-multiline-static"
                label="عدل الوصف"
                multiline
                rows={4}
                sx={{ width: "40vw", direction: "rtl", mb: "5vh" }}
              />
              <br />
              <TextField
                id="standard-basic"
                name="price"
                value={editedProduct.price}
                onChange={handleInputChange}
                error={!!errors.price}
                helperText={errors.price}
                label="السعر"
                variant="standard"
                placeholder="أدخل السعر"
                sx={{ width: "40vw", direction: "rtl", mb: "5vh" }}
              />
              <br />
              {/* Main and Sub Category Dropdowns */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: "5vh",
                }}
              >
                <select
                  value={selectedMainCategory}
                  onChange={handleMainCategoryChange}
                >
                  <option value="">Select Main Category</option>
                  {mainCategories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedSubCategory}
                  onChange={handleSubCategoryChange}
                >
                  <option value="">Select Sub Category</option>
                  {filteredSubCategories.map((subCategory) => (
                    <option key={subCategory._id} value={subCategory._id}>
                      {subCategory.name}
                    </option>
                  ))}
                </select>
              </Box>
              {/* Photo input field */}
            </Box>
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
                    "linear-gradient(90deg, #1F2A69 0%, #091242 100%)",
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
                حفظ
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
export default UpdateProductModel;
