import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "60ba12c4af83d6c58608a97020683cca"
const BASE_URL = "https://api.themoviedb.org/3"

export const fetchMovies = createAsyncThunk('movies/fetchMovies',async({category="now_playing",page=1,query=""})=>{
    let url = ''
    if(query){
        url = `${BASE_URL}/search/movie?query=${query}&page=${page}&api_key=${API_KEY}`
    }else{
        url = `${BASE_URL}/movie/${category}?page=${page}&api_key=${API_KEY}`
    }
    const {data} = await axios.get(url)
    console.log(data)
    return {results:data.results,page,query,category}
})

const movieSlice = createSlice({
    name:"movies",
    initialState:{
        list:[],
        loading:false,
        error:null,
        page:1,
        query:"",
        category:"now_playing"
    },
    reducers:{
        resetMovies:(state)=>{
            state.list = []
            state.page = 1
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(fetchMovies.pending,(state)=>{
                state.loading = true
            })
            .addCase(fetchMovies.fulfilled,(state,action)=>{
                state.loading = false
                state.list = [...state.list,...action.payload.results]
                state.page = action.payload.page 
                state.category = action.payload.category
                state.query = action.payload.query
            })
            .addCase(fetchMovies.rejected,(state,action)=>{
                state.loading = false
                state.error = action.error.message
            })
    }

})


export const {resetMovies} = movieSlice.actions
export default movieSlice.reducer