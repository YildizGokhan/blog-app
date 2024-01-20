
import React, { useEffect, useState } from 'react'
import CardBlog from '../components/blog/CardBlog'
import { useSelector } from 'react-redux'
import useBlogCalls from '../hooks/useBlogCalls'

const DashBoard = () => {
  const { blogs } = useSelector(state => state.stock)
  const { getBlogs } = useBlogCalls()

  const [info, setInfo] = useState({
    _id: "",
    image: "",
    title: "",
    content: "",
    createdAt: "",
  })

  useEffect(() => {
    getBlogs("blogs")
  }, [])

  return (
    <div>
      {blogs.map((blog) => (
        <CardBlog key={blog.id} info={info} setInfo={setInfo} blog={blog} />
      ))}

    </div>
  )
}

export default DashBoard