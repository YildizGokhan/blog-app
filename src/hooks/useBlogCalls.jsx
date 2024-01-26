
import useAxios from './useAxios'
import { useDispatch } from 'react-redux'
import { fetchFail, fetchStart } from '../features/authSlice'
import { getBlogsSuccess, getCommentSuccess, getDetailBlogsSuccess, getUserBlogsSuccess } from '../features/blogSlice'
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

    const getUserBlogs = async (id) => {
        dispatch(fetchStart())
        try {
            const { data } = await axiosWithToken.get(`/blogs?author=${id}`)
            dispatch(getUserBlogsSuccess(data))
            toastSuccessNotify("Blogs details fetched successfully")
        } catch (error) {
            dispatch(fetchFail())
            toastErrorNotify("Blogs details fetch failed")
            console.log(error)
        }
    }


    const getCategories = async () => {
        dispatch(fetchStart())
        try {
            const { data } = await axiosPublic("/categories")
            dispatch(getBlogsSuccess(data))
            toastSuccessNotify("Category fetched successfully")
        } catch (error) {
            dispatch(fetchFail())
            toastErrorNotify("Category fetch failed")
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

    const getSingleComments = async (id) => {
        dispatch(fetchStart())
        try {
            const { data } = await axiosWithToken.get(`/comments/${id}`)
            dispatch(getCommentSuccess(data))
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

    const postBlog = async (info) => {
        dispatch(fetchStart())
        try {
            const { data } = await axiosWithToken.post("/blogs", info)
            getDetailBlogs()
            toastSuccessNotify("Blog sent succesfully")
            dispatch(getDetailBlogsSuccess(data))
        } catch (error) {
            dispatch(fetchFail())
            toastErrorNotify("Blog sent failed")
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

    const putBlog = async ({ id, data }) => {
        dispatch(fetchStart());
        try {
            const { data: updatedData } = await axiosWithToken.put(`/blogs/${id}`, data);
            await getBlogs();
            dispatch(getDetailBlogsSuccess(updatedData))
            toastSuccessNotify("Blog başarıyla güncellendi");
        } catch (error) {
            dispatch(fetchFail());
            toastErrorNotify("Blog güncelleme başarısız");
        }
    };

    const putComment = async (id, data) => {
        dispatch(fetchStart());
        try {
            const { data: updatedData } = await axiosWithToken.put(`/comments/${id}`, data);
            await getBlogs();
            dispatch(getDetailBlogsSuccess(updatedData))
            toastSuccessNotify("Yorum başarıyla güncellendi");
        } catch (error) {
            dispatch(fetchFail());
            toastErrorNotify("Yorum güncelleme başarısız");
            console.log(error)
        }
    };


    const deleteBlog = async (id) => {
        dispatch(fetchStart())
        try {
            await axiosWithToken.delete(`/blogs/${id}`)
            toastSuccessNotify("Blog başarıyla silindi")
            window.location.reload()
        } catch (error) {
            dispatch(fetchFail())
            toastErrorNotify("Blog silme başarısız")
        }
    }

    const deleteComment = async (id) => {
        dispatch(fetchStart())
        try {
            await axiosWithToken.delete(`/comments/${id}`)
            toastSuccessNotify("Yorum başarıyla silindi")
            window.location.reload()
        } catch (error) {
            dispatch(fetchFail())
            toastErrorNotify("Yorum silme başarısız")
            console.log(error);
        }
    }
    return {
        getBlogs, getDetailBlogs, getCategories, getSingleComments, getUserBlogs,
        postComment, postLike, postBlog,
        putBlog, putComment,
        deleteBlog, deleteComment
    }
}

export default useBlogCalls