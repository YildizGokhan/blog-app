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
  const limit = 4;

  useEffect(() => {
    getCategories();
    getBlogs(`blogs/?page=${details?.page}&limit=${limit}`);
    getBlogsList("blogs");
  }, []);

  const handleChange = (event, newPage) => {
    getBlogs(`blogs/?page=${newPage}&limit=${limit}`);
  };

  const blogList = bloglist ? [...bloglist].sort((a, b) => b?.countOfVisitors - a?.countOfVisitors) : [];


  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Stack
      direction={isMdScreen ? 'row' : 'column'}
      justifyContent={isMdScreen ? 'flex-start' : 'center'}
      alignItems={isMdScreen ? 'flex-start' : 'center'}
      sx={{
        paddingBottom: '40px',
        background: "radial-gradient(circle, rgba(236,240,220,1) 3%, rgba(201,208,117,0.9753151260504201) 99%)",
        marginTop: "30px",

      }}
    >
      <Stack style={{ width: '50%', maxWidth: "350px", minWidth: "300px", objectFit: "contain", marginTop: "70px" }}>
        <Typography sx={{ textAlign: "center", fontWeight: "bold", mt: 2, fontFamily: "monospace", fontSize: "1.2rem" }}>Most Visited Blogs</Typography>
        <SideList blogList={blogList} />
      </Stack>

      {isMdScreen && (
        <Stack style={{ marginLeft: '5%' }}>
          <Typography
            sx={{
              marginTop: 8,
              fontFamily: 'Roboto',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              fontStyle: 'italic',
              color: '#333',
              letterSpacing: '0.05em',
              lineHeight: 1.5,
            }}
          >
            Every word can turn into an adventure, every sentence can open a door. In this blog, embark on a journey into the enchanting world of words, explore stories, and freely roam your thoughts.
          </Typography>

          <Grid container gap={2} justifyContent={'center'} sx={{ marginBottom: 5, minHeight: '100vh', marginTop: "40px" }}>
            {blogs && blogs?.length > 0 ? (
              blogs?.map((blog) => (
                <Grid item key={blog?._id} lg={12} md={12} xs={12} sx={{ width: "100%" }}>
                  <CardBlog blog={blog} />
                </Grid>
              ))
            ) : (
              <p>No blogs available</p>
            )}
          </Grid>
          <Stack spacing={2} direction="column" justifyContent="center" alignItems="center" sx={{
            background: "rgb(131,58,180)",
            background: "linear-gradient(90deg, rgba(253,232,29,0.5803571428571428) 0%, rgba(253,232,29,0.5803571428571428) 50%, rgba(252,176,69,1) 100%)",
            borderRadius: "15px",
          }}>
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

      <Stack sx={{ width: '50%', maxWidth: "350px", minWidth: "300px", objectFit: "contain", marginTop: "70px", alignItems: "center" }}>
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
          <Stack spacing={2} direction="column" justifyContent="center" alignItems="center" sx={{
            background: "linear-gradient(90deg, rgba(253,232,29,0.5803571428571428) 0%, rgba(253,232,29,0.5803571428571428) 50%, rgba(252,176,69,1) 100%)",
            borderRadius: "15px",
          }}>
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
