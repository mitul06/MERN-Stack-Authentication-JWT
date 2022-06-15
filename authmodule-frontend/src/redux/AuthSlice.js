import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    token: null
}

export const authSlice = createSlice({
    name: 'auth_token',
    initialState,
    reducers: {
        setUserToken: (state, action) => {
            state.token = action.payload.token
        },

        unSetUserToken: (state) => {
            state.token = null
        }
    }
})

export const { setUserToken, unSetUserToken } = authSlice.actions

export default authSlice.reducer