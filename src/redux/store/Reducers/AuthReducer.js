import { createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {jwtDecode} from 'jwt-decode'
import axios from 'axios'


export const login_user = createAsyncThunk('auth/login_user', async(info,{rejectWithValue,fulfillWithValue})=>{
    // console.log(info);
    try {
        const {data} = await axios.post(`/api/login`,info)
        return fulfillWithValue(data)
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
export const register_user = createAsyncThunk('auth/register_user', async(info,{rejectWithValue,fulfillWithValue})=>{
    // console.log(info);
    try {
        const {data} = await axios.post(`/api/register`,info)
        return fulfillWithValue(data)
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
export const post_content = createAsyncThunk('auth/post_content', async(info,{rejectWithValue,fulfillWithValue})=>{
    // console.log(info);
    try {
        const {data} = await axios.post(`/api/postcontent`,info)
        return fulfillWithValue(data)
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


const AuthReducer = createSlice({
    name:'auth',
    initialState:{
        loader:false,
        errorMessage:"",
        successMessage:"",
        userInfo: [],
    },
    reducers:{
        messageReset: (state,_) =>{
            state.errorMessage = ''
            state.successMessage = ''
        },
        decodeToken : (state,action) =>{
            const token = action.payload
            if(token){
                const decodedToken = jwtDecode(token)
                const expireTime = new Date(state.userInfo.exp * 1000)
                if(new Date() > expireTime){
                    localStorage.removeItem('blogToken')
                }else{
                    state.userInfo = decodedToken
                }
            }
        }
    },
    extraReducers:(builder) =>{
        builder
            .addCase(register_user.pending, (state,action)=>{
                state.loader = true
            })
            .addCase(register_user.rejected, (state,action)=>{
                console.log(action);
                state.loader = false
                state.errorMessage = action.payload.message && action.payload.message
            })
            .addCase(register_user.fulfilled, (state,action)=>{
                const token = action.payload.token
                localStorage.setItem('blogToken',token)
                state.loader = false
                state.successMessage =  action.payload.message
            })

            .addCase(login_user.pending, (state,action)=>{
                state.loader = true
            })
            .addCase(login_user.rejected, (state,action)=>{
                console.log(action);
                state.loader = false
                state.errorMessage = action.payload.message && action.payload.message
            })
            .addCase(login_user.fulfilled, (state,action)=>{
                const token = action.payload.token
                localStorage.setItem('blogToken',token)
                state.loader = false
                state.successMessage =  action.payload.message
            })
            
            .addCase(post_content.pending, (state,action)=>{
                state.loader = true
            })
            .addCase(post_content.rejected, (state,action)=>{
                console.log(action);
                state.loader = false
                state.errorMessage = action.payload.message && action.payload.message
            })
            .addCase(post_content.fulfilled, (state,action)=>{
                state.loader = false
                state.successMessage = action.payload.message
            })
    }
})

export const { messageReset, decodeToken } = AuthReducer.actions
export default AuthReducer.reducer