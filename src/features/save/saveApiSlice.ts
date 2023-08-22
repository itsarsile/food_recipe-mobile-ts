import { apiSlice } from "@/src/api/apiSlice";

export const saveApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    saveRecipe: builder.mutation({
      query: ({ recipeId, userId }) => ({
        url: "/saved",
        method: "POST",
        body: {
          recipeId,
          userId,
        },
      }),
    }),
    getSavedRecipes: builder.query({
      query: (userId) => ({
        url: `/saved/user/${userId}`,
        method: "GET",
      }),
    }),
    deleteSavedRecipes: builder.mutation({
      query: (saveId) => ({
        url: `/saved/${saveId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useSaveRecipeMutation, useGetSavedRecipesQuery, useDeleteSavedRecipesMutation } = saveApiSlice;
