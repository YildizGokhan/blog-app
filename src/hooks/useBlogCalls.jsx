
import useAxios from './useAxios'
import { useDispatch } from 'react-redux'
import { fetchFail, fetchStart } from '../features/authSlice'
import { getBlogsSuccess, getDetailBlogsSuccess } from '../features/blogSlice'

const useBlogCalls = () => {
    const { axiosPublic, axiosWithToken } = useAxios()
    const dispatch = useDispatch()

    const getBlogs = async () => {
        dispatch(fetchStart())
        try {
            const { data } = await axiosPublic.get('/blogs')
            dispatch(getBlogsSuccess(data))
        } catch (error) {
            dispatch(fetchFail())
        }
    }
    const getDetailBlogs = async (item) => {
        dispatch(fetchStart())
        try {
            const { data } = await axiosWithToken.get(`/blogs/${item}`)
            dispatch(getDetailBlogsSuccess(data))
        } catch (error) {
            dispatch(fetchFail())
        }
    }
    return { getBlogs, getDetailBlogs }
}

export default useBlogCalls