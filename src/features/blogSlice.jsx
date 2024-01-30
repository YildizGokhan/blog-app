import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    blogs: [],
    loading: false,
    error: false,
    token: "",
    detail: [],
    categories: [],
    comment: [],
    myblogs: [],
    details: [],
    bloglist: [],

}

const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {
        fetchStart: (state) => {
            state.error = false
            state.loading = true
        },
        getBlogsSuccess: (state, { payload }) => {
            state.loading = false
            state.blogs = payload.apiData
            state.categories = payload.data
            state.details = payload.pagination
        },
        getBlogsListSuccess: (state, { payload }) => {
            state.loading = false
            state.bloglist = payload.data
        },
        getDetailBlogsSuccess: (state, { payload }) => {
            state.loading = false
            state.detail = payload.data
            state.blogs = payload
        },
        getUserBlogsSuccess: (state, { payload }) => {
            state.loading = false
            state.myblogs = payload.data         
        },
        getCommentSuccess: (state, { payload }) => {
            state.loading = false
            state.comment = payload.data
        },
        fetchFail: (state) => {
            state.loading = false
            state.error = true
        },
    }
});

export const { fetchStart, getBlogsSuccess, fetchFail, getDetailBlogsSuccess, postCommentSuccess,
    getCommentSuccess, getUserBlogsSuccess, getBlogsListSuccess } = blogSlice.actions

export default blogSlice.reducer