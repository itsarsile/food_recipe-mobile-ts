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
        provideTags: ["Recipes"],
      }),
    }),
    getRecipesById: builder.query<SingleRecipeResponse, number>({
      query: (id) => ({
        url: `/recipes/${id}`,
        method: "GET",
        keepUnusedDataFor: 5,
        provideTags: ["Recipes"],
      }),
    }),
    getRecipesByUserId: builder.query<RecipeResponseByUserId, number>({
      query: (id) => ({
        url: `/recipes/author/${id}`,
        method: "GET",
        keepUnusedData: 5,
        provideTags: ["Recipes"],
      }),
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
      async onQueryStarted(
        { id, title, description, photo },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          recipesApiSlice.util.updateQueryData(
            "getRecipesById",
            id,
            (draft) => {
              Object.assign(draft, title, description, photo);
            }
          )
        );
        console.log(
          "🚀 ~ file: recipesApiSlice.ts:72 ~ patchResult:",
          patchResult
        );
        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetRecipesQuery,
  useGetRecipesByIdQuery,
  useGetRecipesByUserIdQuery,
  useUpdateRecipeMutation,
  useCreateMutation,
} = recipesApiSlice;
