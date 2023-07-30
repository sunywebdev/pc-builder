import { apiSlice } from "../api/apiSlice";

const reviewsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductReviews: builder.query({
      query: (id) => ({
        url: `/reviews?id=${id}`,
        method: "GET",
      }),
      providesTags: ["reviews"],
    }),

    postNewReview: builder.mutation({
      query: (data) => ({
        url: "/reviews",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["reviews"],
    }),
  }),
});

export const { useGetProductReviewsQuery, usePostNewReviewMutation } =
  reviewsApi;
