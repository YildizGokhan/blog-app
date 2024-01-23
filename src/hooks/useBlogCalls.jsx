
import useAxios from './useAxios'
import { useDispatch } from 'react-redux'
import { fetchFail, fetchStart } from '../features/authSlice'
import { getBlogsSuccess, getDetailBlogsSuccess } from '../features/blogSlice'
import { toastErrorNotify, toastSuccessNotify } from '../helper/ToastNotify'

const useBlogCalls = () => {
    const { axiosPublic, axiosWithToken } = useAxios()
    const dispatch = useDispatch()

    const getBlogs = async () => {
        dispatch(fetchStart())
        try {
            const { data } = await axiosPublic("/blogs")
            dispatch(getBlogsSuccess(data))
            toastSuccessNotify("Blogs fetched successfully")
        } catch (error) {
            dispatch(fetchFail())
            toastErrorNotify("Blogs fetch failed")
        }
    }
    const getDetailBlogs = async (id) => {
        dispatch(fetchStart())
        try {
            const { data } = await axiosWithToken.get(`/blogs/${id}`)
            dispatch(getDetailBlogsSuccess(data))
            toastSuccessNotify("Blogs details fetched successfully")
        } catch (error) {
            dispatch(fetchFail())
            toastErrorNotify("Blogs details fetch failed")
        }
    }

    const postComment = async (info) => {
        dispatch(fetchStart())
        try {
            const { data } = await axiosWithToken.post("/comments", info)
            getDetailBlogs()
            toastSuccessNotify("Comment sent succesfully")
            window.location.reload()
        } catch (error) {
            dispatch(fetchFail())
            toastErrorNotify("Comment sent failed")
        }
    }
    const postLike = async (id) => {
        dispatch(fetchStart())
        try {
            const { data } = await axiosWithToken.post(`/blogs/${id}/postLike`)
            dispatch(getDetailBlogsSuccess(data))
            toastSuccessNotify("Like sent succesfully")
            window.location.reload()
        } catch (error) {
            dispatch(fetchFail())
            toastErrorNotify("Like sent failed")
        }
    }

    return {
        getBlogs, getDetailBlogs,
        postComment, postLike
    }
}

export default useBlogCalls