import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  useGetProductReviewsQuery,
  usePostNewReviewMutation,
} from "@/redux/features/reviews/reivewsApi";
import swal from "sweetalert";

const Review = ({ productId }) => {
  const [review, setReview] = useState("");
  const { data: session } = useSession();

  const [postNewReview, { isLoading, isSuccess }] = usePostNewReviewMutation();
  const { data } = useGetProductReviewsQuery(productId);

  const userName = session?.user.name;
  const time = new Date().toISOString();

  const productReview = {
    userName,
    time,
    productId,
    review,
  };

  const handelReviewSubmit = async (e) => {
    e.preventDefault();
    if (!userName) {
      swal("Failed!", "Please Login then comment!", "error");

      console.log("Please login");
    } else {
      postNewReview(productReview);
    }
  };

  useEffect(() => {
    if ((isSuccess, !isLoading)) {
      setReview("");
    }
  }, [isLoading, isSuccess]);

  return (
    <div className="my-10 bg-gray-50 shadow-md rounded-md p-4">
      <div className=" ">
        <h2 className="text-center font-bold text-xl">
          Revivew of this product...
        </h2>

        {data?.data.length ? (
          <p className="text-center">
            {data?.data?.length} Review in this product!
          </p>
        ) : (
          <p className="text-center">No Review Found!</p>
        )}
      </div>

      <div>
        {data?.data?.map((review) => {
          return (
            <div key={review?._id} className="my-4">
              <div>
                <p className="font-semibold">
                  {review?.userName} -{" "}
                  <i className="text-normal text-gray-500 text-sm">
                    {new Date(review?.time).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </i>
                </p>
              </div>
              <p className="text-xl font-semibold capitalize">
                {review?.review}
              </p>
            </div>
          );
        })}
      </div>

      <div className="my-10">
        <div>
          <form onSubmit={handelReviewSubmit}>
            <textarea
              onChange={(e) => setReview(e.target.value)}
              value={review}
              placeholder="review this product"
              className="w-full p-2 border border-black"
              rows="5"
            ></textarea>

            <div className="text-center  my-6">
              <button className="px-6 py-2 font-semibold text-white bg-purple-700 rounded-md">
                {isLoading ? "Loading..." : "Submit Review"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Review;
