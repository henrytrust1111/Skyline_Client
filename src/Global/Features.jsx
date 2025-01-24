import { createSlice } from "@reduxjs/toolkit";

const initialState={
    data: [],
 
};

const ProductState = createSlice({
    name:"product",
    initialState,
    reducers:{
        DB:(state, {payload})=>{
            state.data = payload
        },
        userProfile : (state, {payload}) => {
            state.userProfile = payload
        }
    }
})

export const {DB, getAllStates, userProfile} = ProductState.actions;
export default ProductState.reducer;






