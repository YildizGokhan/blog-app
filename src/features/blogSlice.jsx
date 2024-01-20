import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    blogs: []
}

const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {
        fetchStart: (state) => {
            state.error = false
            state.loading = true
        },
        getBlogSuccess: (state, { payload }) => {
            state.loading = false
            state.blogs = payload.data
        },
        fetchFail: (state) => {
            state.loading = false
            state.error = true
        },
    }
});

export const { fetchStart, getBlogSuccess, fetchFail } = blogSlice.actions

export default blogSlice.reducer