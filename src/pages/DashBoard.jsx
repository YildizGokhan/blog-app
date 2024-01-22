
import React, { useEffect, useState } from 'react'
import CardBlog from '../components/blog/CardBlog'
import { useSelector } from 'react-redux'
import useBlogCalls from '../hooks/useBlogCalls'
import { Grid } from '@mui/material'

const DashBoard = () => {
  const { blogs } = useSelector(state => state.blog)
  const { getBlogs } = useBlogCalls()

  // const [info, setInfo] = useState({
  //   _id: "",
  //   image: "",
  //   title: "",
  //   content: "",
  //   createdAt: "",
  // })

  useEffect(() => {
    getBlogs()
  }, [])

  return (
    <Grid container justifyContent={"center"} gap={2} mt={5}>
      {blogs?.map((blog) => (
        <CardBlog key={blog.id}
          blog={blog} />
      ))}

    </Grid>
  )
}

export default DashBoard