
import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE={
    favirot:[],
    product_item:[]
}

const favirotSlice =createSlice({
  name: "favirot",
  initialState: INITIAL_STATE,
  reducers: {
  
    addToFavirot: (state, action) => {
       state.favirot.push(action.payload);
    },
    removeFavirot:(state,action)=>{
        state.favirot = state.favirot.filter(product => product.id !== action.payload.id);

    }
   
  },



})

export const {
   
    addToFavirot,
    removeFavirot
  } = favirotSlice.actions;
  
  export default favirotSlice.reducer;