import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import useBlogCalls from '../../hooks/useBlogCalls';
import { useEffect, useState } from 'react';
import { toastErrorNotify } from '../../helper/ToastNotify';



export default function UpdateModal({ open, handleClose }) {
  const { categories,detail } = useSelector((state) => state.blog);
  const { getCategories, getDetailBlogs, putBlog} = useBlogCalls();
  const statuses = ['Draft', 'Published'];

  const renderSelectOptions = (options, isCategory = true) => {
    return options?.map((item) => (
      <MenuItem key={item?._id} value={isCategory ? item?._id : item}>
        {isCategory ? item?.name : item}
      </MenuItem>
    ));
  };

  const [formData, setFormData] = useState({
    categoryId: detail.categoryId || '',
    status: detail.status || '',
    title: detail.title || '',
    image: detail.image || '',
    content: detail.content || '',
    isPublish: true,
    _id: detail?._id || '',
    userId: detail?.userId?._id || '',
  });

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getDetailBlogs(detail?._id);
  }, []);

  useEffect(() => {
    setFormData({
      categoryId: detail?.categoryId || '',
      status: detail?.status || '',
      title: detail?.title || '',
      image: detail?.image || '',
      content: detail?.content || '',
      isPublish: true,
      _id: detail?._id || '',
      userId: detail?.userId?._id || '',
    });

  }, [detail]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData?.content.length < 100) {
      toastErrorNotify("This blog is too short to be published.");
      return;
    }
    if (formData?.status === 'Published') {
      await putBlog({ id: formData._id, data: formData });
      handleClose();
    }
  };

  return (
    <Stack sx={{ mt: 6, justifyContent: 'center', alignItems: 'center' }}>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          sx: { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
        }}
      >
        <Fade in={open}>
          <Stack sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: windowSize.width > 600 ? '60%' : '90%',
          }}>
            <Box
              sx={{
                '& .MuiTextField-root, & .MuiFormControl-root': {
                  m: 1,
                  width: '80%',
                },
                maxWidth: '60%',
                width: '60%',
                backgroundColor: '#fff',
                color: '#000000',
                borderRadius: '12px',
                boxShadow: 3,
                margin: 'auto',
                overflowY: 'auto',
              }}
              noValidate
              autoComplete="off"
              component="form"
              onSubmit={handleSubmit}
            >
              <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', mt: 2 }}>
                Update Blog
              </Typography>
              <TextField
                required
                id="title"
                name="title"
                label="Title"
                margin="normal"
                type="text"
                value={formData.title}
                onChange={handleInputChange}
              />
              <TextField
                required
                id="image"
                name="image"
                label="Image"
                margin="normal"
                type="url"
                value={formData.image}
                onChange={handleInputChange}
              />
              <FormControl fullWidth>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="categoryId"
                  name="categoryId"
                  label="Category *"
                  value={formData.categoryId._id || ''}
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
                  label="Status *"
                  value={formData.status || ""}
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
                multiline
                inputProps={{ minLength: 100 }}
                sx={{ overflowY: 'scroll', maxHeight: '200px' }}
                onChange={handleInputChange}
                value={formData.content}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  mx: 1,
                  my: 1,
                  px: 3,
                  backgroundColor: '#000010',
                  cursor: 'pointer',
                  '&:hover': {
                    background: 'darkslateblue',
                    color: 'white',
                    transform: 'scale(1.1)',
                  },
                }}
              >
                Update Blog
              </Button>
            </Box>
          </Stack>
        </Fade>
      </Modal>
    </Stack>
  );
}
