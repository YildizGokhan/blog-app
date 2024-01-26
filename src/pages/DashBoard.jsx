import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import useBlogCalls from '../hooks/useBlogCalls'
import CardBlog from '../components/blog/CardBlog'
import { Grid } from '@mui/material'

const DashBoard = () => {
  const { blogs } = useSelector(state => state.blog)
  const { getBlogs } = useBlogCalls()

  useEffect(() => {
    // sürekli map hatası alıyordum. Bu sebepele asenkron yapı ekledim.
    // const fetchData = async () => {
    //   await getBlogs()
    // }

    // fetchData()
    getBlogs()
  }, [])

  console.log(blogs);

  return (
    <Grid container gap={3} mt={1} justifyContent={"center"} sx={{ backgroundColor: "#f5f5f5", marginBottom: 5 }}>
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <Grid item key={blog?._id}>
            <CardBlog blog={blog} />
          </Grid>
        ))
      ) : (
        <p>No blogs available</p>
      )}
    </Grid>
  );
}

export default DashBoard
