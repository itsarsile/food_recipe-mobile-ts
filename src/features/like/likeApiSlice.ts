import { apiSlice } from "@/src/api/apiSlice";

export const saveApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    likeRecipe: builder.mutation({
      query: ({ recipeId, userId }) => ({
        url: "/liked",
        method: "POST",
        body: {
          recipeId,
          userId,
        },
      }),
    }),
    getLikedRecipes: builder.query({
      query: (userId) => ({
        url: `/liked/user/${userId}`,
        method: "GET",
      }),
    }),
    deleteLikedRecipes: builder.mutation({
      query: (saveId) => ({
        url: `/liked/${saveId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useLikeRecipeMutation, useGetLikedRecipesQuery, useDeleteLikedRecipesMutation } = saveApiSlice;
