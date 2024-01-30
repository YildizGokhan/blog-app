import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useBlogCalls from '../hooks/useBlogCalls';
import CardBlog from '../components/blog/CardBlog';
import { Grid, Pagination, Stack } from '@mui/material';
import SideList from '../components/blog/SideList';

const DashBoard = () => {
  const { blogs, details, bloglist } = useSelector((state) => state.blog);
  const { getBlogs, getBlogsList } = useBlogCalls();
  const limit = 8;

  useEffect(() => {
    getBlogs(`blogs/?page=${details?.page}&limit=${limit}`);
    getBlogsList("blogs")
  }, []);

  const handleChange = (event, newPage) => {
    getBlogs(`blogs/?page=${newPage}&limit=${limit}`);
  };

  const blogList = [...bloglist].sort((a, b) => b.countOfVisitors - a.countOfVisitors);


  return (
    <div
      style={{
        paddingBottom: '40px',
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: "#FDFAF6",
      }}
    >
      <Stack style={{ width: '50%', maxWidth: "350px", objectFit: "contain", marginTop: "70px" }}>
        <SideList blogList={blogList} />
      </Stack>
      <Stack style={{ marginLeft: '5%' }}>
        <Grid container gap={2}  justifyContent={'center'} sx={{ marginBottom: 5, minHeight: '100vh', marginTop: "80px" }}>
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


    </div>
  );
};

export default DashBoard;
