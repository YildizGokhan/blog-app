
import useAxios from './useAxios'
import { useDispatch } from 'react-redux'
import { fetchFail, fetchStart } from '../features/authSlice'
import { getBlogsSuccess } from '../features/blogSlice'

const useBlogCalls = () => {
    const { axiosPublic } = useAxios()
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
    return {getBlogs}
}

export default useBlogCalls