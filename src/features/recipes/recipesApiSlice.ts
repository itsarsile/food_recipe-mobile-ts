import { apiSlice } from "../../api/apiSlice";

interface Recipe {
  authorId: number;
  photo?: string;
  video?: string;
  description: string;
  id: number;
  title: string;
}

interface RecipeResponse {
  recipes: Recipe[];
}

interface SingleRecipeResponse {
  recipe: Recipe[];
}

interface RecipeResponseByUserId {
  recipes: Recipe[];
}

export const recipesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRecipes: builder.query<RecipeResponse, void>({
      query: () => ({
        url: "/recipes",
        method: "GET",
        provideTags: ["Recipes"],
      }),
      keepUnusedDataFor: 5,
    }),
    getRecipesById: builder.query<SingleRecipeResponse, number>({
      query: (id) => ({
        url: `/recipes/${id}`,
        method: "GET",
        provideTags: ["Recipes"],
      }),
      keepUnusedDataFor: 5,

    }),
    getRecipesByUserId: builder.query<RecipeResponseByUserId, number>({
      query: (id) => ({
        url: `/recipes/author/${id}`,
        method: "GET",
        provideTags: ["Recipes"],
      }),
      keepUnusedDataFor: 5,
    }),
    create: builder.mutation<SingleRecipeResponse, number>({
      query: (recipe) => ({
        url: `/recipes`,
        method: "POST",
        body: recipe,
        invalidateTags: ["Recipes"],
      }),
    }),
    updateRecipe: builder.mutation({
      query: ({ id, title, description, photo }) => ({
        url: `/recipes/${id}`,
        method: "PUT",
        body: { title, description, photo },
      }),
    }),
    deleteRecipe: builder.mutation({
      query: (recipeId) => ({
        url : `/recipes/${recipeId}`,
        method: "DELETE",
      })
    })
  }),
});

export const {
  useGetRecipesQuery,
  useGetRecipesByIdQuery,
  useGetRecipesByUserIdQuery,
  useUpdateRecipeMutation,
  useCreateMutation,
  useDeleteRecipeMutation
} = recipesApiSlice;
