import useAxios from "./useAxios";
import { useDispatch } from "react-redux";
import { fetchFail, fetchStart } from "../features/authSlice";
import {
  getBlogsListSuccess,
  getBlogsSuccess,
  getCommentSuccess,
  getDetailBlogsSuccess,
  getUserBlogsSuccess,
} from "../features/blogSlice";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import {useNavigate} from "react-router-dom"
const useBlogCalls = () => {
  const { axiosPublic, axiosWithToken } = useAxios();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const getBlogs = async (url) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic(url);
      const pagination = data.details
      const apiData = data.data
      dispatch(getBlogsSuccess({pagination, apiData}));
      toastSuccessNotify("Blogs fetched successfully");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Blogs fetch failed");
    }
  };

  const getBlogsList = async (url) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic(url);
      dispatch(getBlogsListSuccess(data));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Blogs fetch failed");
    }
  };

  const getUserBlogs = async (id) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(`/blogs?author=${id}`);
      dispatch(getUserBlogsSuccess(data));
      toastSuccessNotify("Blogs details fetched successfully");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Blogs details fetch failed");
      console.log(error);
    }
  };

  const getCategories = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic("/categories");
      dispatch(getDetailBlogsSuccess(data));
      toastSuccessNotify("Category fetched successfully");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Category fetch failed");
    }
  };

  const getDetailBlogs = async (id) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(`/blogs/${id}`);
      dispatch(getDetailBlogsSuccess(data));
      toastSuccessNotify("Blogs details fetched successfully");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Blogs details fetch failed");
    }
  };

  const getSingleComments = async (id) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(`/comments/${id}`);
      dispatch(getCommentSuccess(data));
      toastSuccessNotify("Blogs details fetched successfully");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Blogs details fetch failed");
    }
  };

  const postComment = async (info) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.post("/comments", info);
      getDetailBlogs(info.blogId);
      toastSuccessNotify("Comment sent succesfully");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Comment sent failed");
    }
  };

  const postBlog = async (info) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.post("/blogs", info);
      getBlogs("blogs");
      toastSuccessNotify("Blog sent succesfully");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Blog sent failed");
    }
  };

  const postLike = async (id, card = false) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.post(`/blogs/${id}/postLike`);
      if (card) {//! fonksiyon dashboarddan yada myblogtan çağırılırsa
        getBlogs("blogs");
      } else {
        getDetailBlogs(id);
      }
      toastSuccessNotify("Like sent succesfully");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Like sent failed");
    }
  };

  const putBlog = async ({ id, data }) => {
    dispatch(fetchStart());
    try {
     await axiosWithToken.put(
        `/blogs/${id}`,
        data
      );
      getDetailBlogs(id)
      toastSuccessNotify("Blog başarıyla güncellendi");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Blog güncelleme başarısız");
    }
  };

  const putComment = async (id, data) => {
    dispatch(fetchStart());
    try {
      const { data: updatedData } = await axiosWithToken.put(
        `/comments/${id}`,
        data
      );
      toastSuccessNotify("Yorum başarıyla güncellendi");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Yorum güncelleme başarısız");
      console.log(error);
    }
  };

  const deleteBlog = async (id) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.delete(`/blogs/${id}`);
      toastSuccessNotify("Blog başarıyla silindi");
    navigate("/")
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Blog silme başarısız");
    }
  };

  const deleteComment = async (info) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.delete(`/comments/${info._id}`);
      getDetailBlogs(info.blogId)
      toastSuccessNotify("silme başarılı");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("silme başarısız");
      console.log(error);
    }
  };

  return {
    getBlogs,
    getDetailBlogs,
    getCategories,
    getSingleComments,
    getUserBlogs,
    getBlogsList,
    postComment,
    postLike,
    postBlog,
    putBlog,
    putComment,
    deleteBlog,
    deleteComment,
  };
};

export default useBlogCalls;
