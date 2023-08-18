import { createSlice } from "@reduxjs/toolkit";

const recipesSlice = createSlice({
    name: "recipes",
    initialState: { recipes: [] },
    reducers: {
        setRecipes: (state, action) => {
            const { recipes } = action.payload;
            state.recipes = recipes;
        },
    }
})

export const { setRecipes } = recipesSlice.actions;

export default recipesSlice.reducer;