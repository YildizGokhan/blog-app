import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useBlogCalls from '../hooks/useBlogCalls';
import CardBlog from '../components/blog/CardBlog';
import { Grid, Pagination, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import SideList from '../components/blog/SideList';
import FilterBlogs from '../components/blog/FilterBlogs';

const DashBoard = () => {
  const { blogs, details, bloglist, categories } = useSelector((state) => state.blog);
  const { getBlogs, getBlogsList, getCategories } = useBlogCalls();
  const limit = 8;

  useEffect(() => {
    getCategories();
    getBlogs(`blogs/?page=${details?.page}&limit=${limit}`);
    getBlogsList("blogs");
  }, []);

  const handleChange = (event, newPage) => {
    getBlogs(`blogs/?page=${newPage}&limit=${limit}`);
  };

  const blogList = [...bloglist].sort((a, b) => b.countOfVisitors - a.countOfVisitors);

  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Stack
      direction={isMdScreen ? 'row' : 'column'}
      justifyContent={isMdScreen ? 'flex-start' : 'center'}
      alignItems={isMdScreen ? 'flex-start' : 'center'}
      sx={{
        paddingBottom: '40px',
        backgroundColor: "#FDFAF6",
        marginTop: "40px",
      }}
    >
      <Stack style={{  width: '50%', maxWidth: "350px",minWidth: "300px", objectFit: "contain", marginTop: "70px" }}>
        <Typography sx={{ textAlign: "center", fontWeight: "bold", mt: 2 }}>Most Visited Blogs</Typography>
        <SideList blogList={blogList} />
      </Stack>

      {isMdScreen && (
        <Stack style={{ marginLeft: '5%' }}>
          <Grid container gap={2} justifyContent={'center'} sx={{ marginBottom: 5, minHeight: '100vh', marginTop: "80px" }}>
            {blogs && blogs?.length > 0 ? (
              blogs?.map((blog) => (
                <Grid item key={blog?._id}>
                  <CardBlog blog={blog} />
                </Grid>
              ))
            ) : (
              <p>No blogs available</p>
            )}
          </Grid>
          <Stack spacing={2} direction="column" justifyContent="center" alignItems="center" sx={{ backgroundColor: '#FDFAF6' }}>
            <Pagination
              count={Math.ceil(details?.totalRecords / limit)}
              page={details?.pages ? details?.pages?.current : 1}
              onChange={handleChange}
              color="primary"
              size="large"
            />
          </Stack>
        </Stack>
      )}

      <Stack sx={{ width: '50%', maxWidth: "350px",minWidth: "300px", objectFit: "contain", marginTop: "70px", alignItems: "center" }}>
        <FilterBlogs categories={categories} />
      </Stack>

      {!isMdScreen && (
        <Stack style={{ marginLeft: '5%' }}>
          {blogs && blogs?.length > 0 ? (
            blogs?.map((blog) => (
              <CardBlog key={blog?._id} blog={blog} />
            ))
          ) : (
            <p>No blogs available</p>
          )}
          <Stack spacing={2} direction="column" justifyContent="center" alignItems="center" sx={{ backgroundColor: '#FDFAF6' }}>
            <Pagination
              count={Math.ceil(details?.totalRecords / limit)}
              page={details?.pages ? details?.pages?.current : 1}
              onChange={handleChange}
              color="primary"
              size="large"
            />
          </Stack>
        </Stack>
      )}

    </Stack>
  );
};

export default DashBoard;
