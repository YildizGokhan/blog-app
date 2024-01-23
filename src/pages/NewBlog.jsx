import {
  TextField,
  Button,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
} from '@mui/material';
import { useSelector } from 'react-redux';
import useBlogCalls from '../hooks/useBlogCalls';
import { useEffect, useState } from 'react';

const statuses = ['Draft', 'Published'];

const renderSelectOptions = (options, isCategory = true) => {
  return options.map((item) => (
    <MenuItem key={item._id} value={isCategory ? item._id : item}>
      {isCategory ? item.name : item}
    </MenuItem>
  ));
};

const NewBlog = () => {
  const { categories } = useSelector((state) => state.blog);
  const { getCategories, postBlog } = useBlogCalls();
  const [formData, setFormData] = useState({
    category: '',
    status: '',
    title: '',
    image: '',
    content: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postBlog({
      title: formData?.title,
      content: formData?.content,
      image: formData?.image,
      categoryId: formData?.category,
      isPublished: formData?.status === 'Published',
    });
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Stack sx={{ mt: 5}}>
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
        noValidate
        autoComplete="off"
        component="form"
        onSubmit={handleSubmit}
      >
        <Typography variant="h4" gutterBottom>
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
          minRows={4}
          onChange={handleInputChange}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            mt: 2,
            px: 8,
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
