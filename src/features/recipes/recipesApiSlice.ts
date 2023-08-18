import { apiSlice } from "../../api/apiSlice";

interface Recipe {
  authorId: number;
  photo?: string;
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
        keepUnusedDataFor: 30,
      }),
    }),
    getRecipesById: builder.query<SingleRecipeResponse, number>({
      query: (id) => ({
        url: `/recipes/${id}`,
        method: "GET",
        keepUnusedDataFor: 30,
      }),
    }),
    getRecipesByUserId: builder.query<RecipeResponseByUserId, number>({
      query: (id) => ({
        url: `/recipes/author/${id}`,
        method: "GET",
      }),
    }),
    create: builder.mutation<SingleRecipeResponse, number>({
      query: (recipe) => ({
        url: `/recipes`,
        method: "POST",
        body: recipe,
      }),
    }),
  }),
});

export const {
  useGetRecipesQuery,
  useGetRecipesByIdQuery,
  useGetRecipesByUserIdQuery,
  useCreateMutation,
} = recipesApiSlice;
