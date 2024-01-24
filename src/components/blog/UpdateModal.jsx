import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
// import { TextField } from '@mui/joy';
import { useSelector } from 'react-redux';
import useBlogCalls from '../../hooks/useBlogCalls';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function UpdateModal({ open, handleClose }) {
  const { categories } = useSelector((state) => state.blog);
  const { getCategories, getDetailBlogs } = useBlogCalls();
  const { detail } = useSelector(state => state.blog)
  const statuses = ['Draft', 'Published'];

  const renderSelectOptions = (options, isCategory = true) => {
    return options.map((item) => (
      <MenuItem key={item._id} value={isCategory ? item._id : item}>
        {isCategory ? item.name : item}
      </MenuItem>
    ));
  };

  const [formData, setFormData] = React.useState({
    category: detail.categoryId,
    status: detail.status,
    title: detail.title,
    image: detail.image,
    content: detail.content,
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  React.useEffect(() => {
    getCategories()
  }, [])
  console.log(detail)
  return (
    <Stack sx={{ mt: 5, }}>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition

        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',

        }}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          sx: { backgroundColor: 'rgba(255, 255, 255, 0.1)', }
        }}
      >
        <Fade in={open}>
          <Stack sx={{ mt: 5, margin: "auto", width: "80%", justifyContent: "center", alignItems: "center" }} >
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
                margin: "auto"

              }}
              noValidate
              autoComplete="off"
              component="form"
            // onSubmit={handleSubmit}
            >
              <Typography variant="h4" gutterBottom sx={{ textAlign: "center", mt: 2 }}>
                Update Blog
              </Typography>
              <TextField
                required
                id="title"
                name="title"
                label="Title"
                margin="normal"
                type="text"
                value={detail?.title}
                onChange={handleInputChange}
              />
              <TextField
                required
                id="image"
                name="image"
                label="Image"
                margin="normal"
                type="url"
                value={detail?.image}
                onChange={handleInputChange}
              />
              <FormControl fullWidth>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category"
                  name="category"
                  label="Category *"
                  value={detail?.category}
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
                  value={detail?.status}
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
                minRows={4}
                onChange={handleInputChange}
                value={detail?.content}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  mx: 1,
                  my: 1,
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
                Update Blog
              </Button>
            </Box>
          </Stack>
        </Fade>
      </Modal>
    </Stack>
  );
}