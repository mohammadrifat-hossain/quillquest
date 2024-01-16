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
export const get_content = createAsyncThunk('auth/get_content', async(info,{rejectWithValue,fulfillWithValue})=>{
    // console.log(info);
    try {
        const {data} = await axios.post(`/api/getcontent`,info)
        return fulfillWithValue(data)
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
export const get_my_posts = createAsyncThunk('auth/get_my_posts', async(info,{rejectWithValue,fulfillWithValue})=>{
    // console.log(info);
    try {
        const {data} = await axios.post(`/api/getmyposts`,info)
        return fulfillWithValue(data)
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

//
export const add_comment = createAsyncThunk('auth/add_comment', async(info,{rejectWithValue,fulfillWithValue})=>{
    // console.log(info);
    try {
        const {data} = await axios.post(`/api/addcomment`,info)
        return fulfillWithValue(data)
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
export const add_like = createAsyncThunk('auth/add_like', async(info,{rejectWithValue,fulfillWithValue})=>{
    // console.log(info);
    try {
        const {data} = await axios.post(`/api/addlike`,info)
        return fulfillWithValue(data)
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
//
export const upload_image = createAsyncThunk('auth/upload_image', async(info,{rejectWithValue,fulfillWithValue})=>{
    // console.log(info);
    try {
        const {data} = await axios.post(`/api/uploadimage`,info)
        return fulfillWithValue(data)
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
//
export const get_authors = createAsyncThunk('auth/get_authors', async(info,{rejectWithValue,fulfillWithValue})=>{
    // console.log(info);
    try {
        const {data} = await axios.post(`/api/getauthors`,info)
        return fulfillWithValue(data)
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
//
export const follow = createAsyncThunk('auth/follow', async(info,{rejectWithValue,fulfillWithValue})=>{
    // console.log(info);
    try {
        const {data} = await axios.post(`/api/follow`,info)
        return fulfillWithValue(data)
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
//
export const get_profile_info = createAsyncThunk('auth/get_profile_info', async(info,{rejectWithValue,fulfillWithValue})=>{
    // console.log(info);
    try {
        const {data} = await axios.post(`/api/getprofileinfo`,info)
        return fulfillWithValue(data)
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
//
export const get_current_user = createAsyncThunk('auth/get_current_user', async(info,{rejectWithValue,fulfillWithValue})=>{
    // console.log(info);
    try {
        const {data} = await axios.post(`/api/getcurrentuser`,info)
        return fulfillWithValue(data)
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
//
export const get_blogs = createAsyncThunk('auth/get_blogs', async(info,{rejectWithValue,fulfillWithValue})=>{
    // console.log(info);
    try {
        const {data} = await axios.post(`/api/getblogs`,info)
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
        currentContent:[],
        myPosts:[],
        authors:[],
        currentUser:[],
        profileInfo:[],
        allBlogs:[]
    },
    reducers:{
        messageReset: (state,_) =>{
            state.errorMessage = ''
            state.successMessage = ''
        },
        decodeToken : (state,action) =>{
            const token = action.payload
            if(token !== undefined){
                const decodedToken = jwtDecode(token)
                const expireTime = new Date(state.userInfo.exp * 1000)
                if(new Date() > expireTime){
                    localStorage.removeItem('blogToken')
                }else{
                    state.userInfo = decodedToken
                }
            }else{
                location.replace('/login')
            }
        }
    },
    extraReducers:(builder) =>{
        builder
            .addCase(register_user.pending, (state,action)=>{
                state.loader = true
            })
            .addCase(register_user.rejected, (state,action)=>{
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
                state.loader = false
                state.errorMessage = action.payload.message && action.payload.message
            })
            .addCase(post_content.fulfilled, (state,action)=>{
                state.loader = false
                state.successMessage = action.payload.message
            })

            .addCase(get_content.pending, (state,action)=>{
                state.loader = true
            })
            .addCase(get_content.rejected, (state,action)=>{
                state.loader = false
                state.errorMessage = action.payload.message && action.payload.message
            })
            .addCase(get_content.fulfilled, (state,action)=>{
                state.loader = false
                state.currentContent = action.payload
            })

            .addCase(get_my_posts.pending, (state,action)=>{
                state.loader = true
            })
            .addCase(get_my_posts.rejected, (state,action)=>{
                state.loader = false
                state.errorMessage = action.payload.message && action.payload.message
            })
            .addCase(get_my_posts.fulfilled, (state,action)=>{
                state.loader = false
                state.myPosts = action.payload.posts
            })

            .addCase(add_comment.pending, (state,action)=>{
                state.loader = true
            })
            .addCase(add_comment.rejected, (state,action)=>{
                state.loader = false
                state.errorMessage = action.payload.message && action.payload.message
            })
            .addCase(add_comment.fulfilled, (state,action)=>{
                state.loader = false
                state.successMessage = action.payload.message
            })

            .addCase(add_like.pending, (state,action)=>{
                state.loader = true
            })
            .addCase(add_like.rejected, (state,action)=>{
                state.loader = false
                state.errorMessage = action.payload.message && action.payload.message
            })
            .addCase(add_like.fulfilled, (state,action)=>{
                state.loader = false
                state.successMessage = action.payload.message
            })

            .addCase(upload_image.pending, (state,action)=>{
                state.loader = true
            })
            .addCase(upload_image.rejected, (state,action)=>{
                state.loader = false
                state.errorMessage = action.payload.message && action.payload.message
            })
            .addCase(upload_image.fulfilled, (state,action)=>{
                state.loader = false
                state.successMessage = action.payload.message
                const token = action.payload.token
                localStorage.setItem('blogToken',token)
            })

            .addCase(get_authors.fulfilled, (state,action)=>{
                state.authors = action.payload.authors
            })

            .addCase(get_profile_info.fulfilled, (state,action)=>{
                state.profileInfo = action.payload.info
            })

            .addCase(follow.pending, (state,action)=>{
                state.loader = true
            })
            .addCase(follow.rejected, (state,action)=>{
                state.loader = false
                state.errorMessage = action.payload.message && action.payload.message
            })
            .addCase(follow.fulfilled, (state,action)=>{
                state.loader = false
                state.successMessage = action.payload.message
                const token = action.payload.token
                localStorage.setItem('blogToken',token)
            })


            
            .addCase(get_current_user.fulfilled, (state,action)=>{
                state.loader = false
                state.currentUser = action.payload.user
            })
            
            .addCase(get_blogs.fulfilled, (state,action)=>{
                state.loader = false
                state.allBlogs = action.payload.data
            })
    }
})

export const { messageReset, decodeToken } = AuthReducer.actions
export default AuthReducer.reducer