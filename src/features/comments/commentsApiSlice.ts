import { apiSlice } from "@/src/api/apiSlice";

interface Comments {
    author: string;
    text: string;
    createdAt: string;
}

interface CommentsResponse {
    comments: Comments[];
}

export const commentsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createComment: builder.mutation({
            query: ({authorId, recipeId, text}) => ({
                url: "/comments",
                method: "POST",
                body: {
                    authorId,
                    recipeId,
                    text,
                }
            }),
        }),
        getComment: builder.query<CommentsResponse, number>({
            query: (recipeId) => ({
                url: `/comments/recipes/${recipeId}`,
                method: "GET"
            }),

        })
    })
})

export const {
    useCreateCommentMutation,
    useGetCommentQuery
} = commentsApiSlice;