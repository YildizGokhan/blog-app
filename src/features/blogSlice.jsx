import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    blogs: [],
    loading: false,
    error: false,
    token: "",
    detail: [],
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
            state.blogs = payload.data
        },
        getDetailBlogsSuccess: (state, { payload }) => {
            state.loading = false
            state.detail = payload.data
            state.blogs = payload.data
        },
        fetchFail: (state) => {
            state.loading = false
            state.error = true
        },
    }
});

export const { fetchStart, getBlogsSuccess, fetchFail, getDetailBlogsSuccess, postCommentSuccess } = blogSlice.actions

export default blogSlice.reducer