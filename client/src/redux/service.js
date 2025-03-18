import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    addMyInfo,
    addSingle,
    addToAllPost,
    addUser,
    deleteThePost,
} from "./slice";

export const serviceApi = createApi({
    reducerPath: "serviceApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/",
        credentials: "include",
    }),
    keepUnusedDataFor: 60 * 60 * 24 * 7,
    tagTypes: ["Post", "User", "Me"],
    endpoints: (builder) => ({
        signin: builder.mutation({
            query: (data) => ({
                url: "signin",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Me"],
        }),
        login: builder.mutation({
            query: (data) => ({
                url: "login",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Me"],
        }),
        myInfo: builder.query({
            query: () => ({
                url: "me",
                method: "GET",
            }),
            providesTags: ["Me"],
            async onQueryStarted(params, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(addMyInfo(data));
                } catch (error) {
                    console.log(error);
                }
            },
        }),
        logoutMe: builder.mutation({
            query: () => ({
                url: "logout",
                method: "POST",
            }),
            invalidatesTags: ["Me"],
        }),
        userDetails: builder.query({
            query: (id) => ({
                url: `user/${id}`,
                method: "GET",
            }),
            providesTags: ["User"],
            async onQueryStarted(params, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(addUser(data));
                } catch (error) {
                    console.log(error);
                }
            },
        }),
        searchUsers: builder.query({
            query: (query) => ({
                url: `user/search/${query}`,
                method: "GET",
            }),
        }),
        updateProfile: builder.mutation({
            query: (data) => ({
                url: "update",
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Me"],
        }),
        addPost: builder.mutation({
            query: () => ({
                url: "post",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Post"],
            async onQueryStarted(params, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(addSingle(data));
                } catch (error) {
                    console.log(error);
                }
            },
        }),
        allPost: builder.query({
            query: (page) => ({
                url: `post?page=${page}`,
                method: "GET",
            }),
            providesTags: (result) => {
                return result
                    ? [
                          ...result.posts.map(({ _id }) => ({
                              type: "Post",
                              id: _id,
                          })),
                          { type: "Post", id: "LIST" },
                      ]
                    : [{ type: "Post", id: "LIST" }];
            },
            async onQueryStarted(params, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(addToAllPost(data));
                } catch (err) {
                    console.log(err);
                }
            },
        }),
        deletePost: builder.mutation({
            query: (id) => ({
                url: `post/${id}`,
                method: "DELETE",
            }),
            async onQueryStarted(params, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(deleteThePost(data));
                } catch (err) {
                    console.log(err);
                }
            },
        }),
        likePost: builder.mutation({
            query: (id) => ({
                url: `post/like/${id}`,
                method: "PUT",
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "Post", id }],
        }),
        singlePost: builder.query({
            query: (id) => ({
                url: `post/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, { id }) => [{ type: "Post", id }],
        }),
        repost: builder.mutation({
            query: (id) => ({
                url: `repost/${id}`,
                method: "PUT",
            }),
            invalidatesTags: ["User"],
        }),

        addComment: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `comment/${id}`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["User"],
        }),
        deleteComment: builder.mutation({
            query: ({ postId, id }) => ({
                url: `comment/${postId}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, { postId }) => [
                { type: "Post", id: postId },
            ],
        }),
    }),
});

export const {
    useSigninMutation,
    useLoginMutation,
    useMyInfoQuery,
    useLogoutMeMutation,
    useUserDetailsQuery,
    useLazySearchUsersQuery,
    useAllPostQuery,
    useFollowUserMutation,
    useAddCommentMutation,
    useAddPostMutation,
    useDeleteCommentMutation,
    useDeletePostMutation,
    useLikePostMutation,
    useRepostMutation,
    useSinglePostQuery,
    useUpdateProfileMutation,
} = serviceApi;
