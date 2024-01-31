import { TextField, Button, Box, Typography, Select, MenuItem, FormControl, InputLabel, Stack, } from '@mui/material';
import { useSelector } from 'react-redux';
import useBlogCalls from '../hooks/useBlogCalls';
import { useEffect, useState } from 'react';
import { toastErrorNotify } from '../helper/ToastNotify';
import { useNavigate } from 'react-router';

const statuses = ['Draft', 'Published'];



const renderSelectOptions = (options, isCategory = true) => {
  return options?.map((item) => (
    <MenuItem key={item?.id} value={isCategory ? item?._id : item}>
      {isCategory ? item?.name : item}
    </MenuItem>
  ));
};

const NewBlog = () => {
  const { categories } = useSelector((state) => state.blog);
  const { getCategories, postBlog } = useBlogCalls();
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    category: '',
    status: '',
    title: '',
    image: '',
    content: '',
    isPublish: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("first")
    // content min 1  satır olsun yoksa düzen bozuluyor
    if (formData?.content.length < 100) {
      toastErrorNotify("This blog is too short to published.");
      return;
    }
    postBlog({
      title: formData?.title,
      content: formData?.content,
      image: formData?.image,
      categoryId: formData?.category,
      status: formData.status
    })
    navigate("/")
  };
  useEffect(() => {
    getCategories();
  }, []);
 

  return (
    <Stack sx={{ mt: "10px", height: '100vh' , backgroundColor: "#8EC5FC",
    backgroundImage: "linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)", }} >
      <Box
        sx={{
          '& .MuiTextField-root, & .MuiFormControl-root': {
            m: 1,
            width: '100%',
          },
          maxWidth: '500px',
          margin: 'auto',
          padding: '20px',
          boxShadow: 3,
          borderRadius: '12px',
        }}
        component="form"
        onSubmit={handleSubmit}
      >
        <Typography variant="h4" gutterBottom textAlign={"center"}>
          New Blog
        </Typography>
        <TextField
          required
          id="title"
          name="title"
          label="Title"
          margin="normal"
          type="text"
          value={formData?.title}
          onChange={handleInputChange}
        />
        <TextField
          required
          id="image"
          name="image"
          label="Image"
          margin="normal"
          type="url"
          value={formData?.image}
          onChange={handleInputChange}
        />
        <FormControl fullWidth>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category"
            name="category"
            required
            value={formData?.category}
            label="Category *"
            onChange={handleInputChange}
          >
            {renderSelectOptions(categories)}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            id="status"
            name="status"
            required
            value={formData?.status}
            label="Status *"
            onChange={handleInputChange}
          >
            {renderSelectOptions(statuses, false)}
          </Select>
        </FormControl>
        <TextField
          required
          id="content"
          name="content"
          label="Content"
          margin="normal"
          value={formData?.content}
          multiline
          inputProps={{ minLength: 100 }}
          onChange={handleInputChange}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            mt: 2,
            px: 7,
            marginLeft: 5,
            backgroundColor: 'black',
            cursor: 'pointer',
            '&:hover': {
              background: 'darkslateblue',
              color: 'white',
              transform: 'scale(1.1)',
            },
          }}
        >
          New Blog
        </Button>
      </Box>
    </Stack>
  );
};

export default NewBlog;
