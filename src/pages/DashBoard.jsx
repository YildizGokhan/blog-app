import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useBlogCalls from '../hooks/useBlogCalls';
import CardBlog from '../components/blog/CardBlog';
import { Grid, Pagination, Stack } from '@mui/material';

const DashBoard = () => {
  const { blogs, details } = useSelector(state => state.blog);
  const { getBlogs } = useBlogCalls();
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 8;

  useEffect(() => {
    getBlogs();
  }, [currentPage]);

  const handlePageChange = (e, value) => {
    setCurrentPage(value);
  };

  const pageCount = Math.ceil(details.totalRecords / blogsPerPage);
  const startBlog = (currentPage - 1) * blogsPerPage;
  const endBlog = startBlog + blogsPerPage;
  const displayedBlogs = blogs.slice(startBlog, endBlog);

  return (
    <div style={{ paddingBottom: '50px' }}>
      <Grid container gap={3} mt={1} justifyContent={"center"} sx={{ backgroundColor: "#f5f5f5", marginBottom: 5 }}>
        {displayedBlogs && displayedBlogs.length > 0 ? (
          displayedBlogs.map((blog) => (
            <Grid item key={blog?._id}>
              <CardBlog blog={blog} />
            </Grid>
          ))
        ) : (
          <p>No blogs available</p>
        )}
      </Grid>
      <Stack spacing={2} direction="column" justifyContent="center" alignItems="center">
        <Pagination
          count={pageCount}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          size="large"
        />
      </Stack>
    </div>
  );
}

export default DashBoard;
