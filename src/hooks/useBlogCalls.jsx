
import useAxios from './useAxios'
import { useDispatch } from 'react-redux'
import { fetchFail, fetchStart } from '../features/authSlice'
import { getBlogSuccess } from '../features/blogSlice'

const useBlogCalls = () => {
    const { axiosWithToken } = useAxios()
    const dispatch = useDispatch()

    const getBlogs = async () => {
        dispatch(fetchStart())
        try {
            const { data } = await axiosWithToken.get('/blogs')
            dispatch(getBlogSuccess(data))
        } catch (error) {
            dispatch(fetchFail())
        }
    }
    return {getBlogs}
}

export default useBlogCalls