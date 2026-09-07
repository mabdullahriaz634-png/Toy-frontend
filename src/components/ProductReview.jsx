import { useState, useEffect } from "react";
import { authAPI } from "../Api";
import { toast } from "react-toastify";
import ReviewLoader from "./ReviewLoader";

export default function ProductReviews({ id, reviewsProp = [] }) {
  // console.log('review prop', reviewsProp);

  const [reviews, setReviews] = useState(reviewsProp);
  // console.log("Review", reviews);

  const [showModal, setShowModal] = useState(false);
  const [visibleReviews, setVisibleReviews] = useState(2);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    rating: 5,
    review: "",
  });

  // ================= UPDATE REVIEWS FROM BACKEND =================

  // useEffect(() => {
  //     if (Array.isArray(reviewsProp)) {
  //       const formattedReviews = reviewsProp.map((item) => ({
  //         _id: item?._id || item?.id,
  //       rating: Number(item?.rating ?? item?.formData?.rating ?? 0),
  //       review: item?.review ?? item?.formData?.review ?? "",
  //       date: item?.date || "Just Now",
  //     }));

  //     setReviews(formattedReviews);
  //   } else {
  //     setReviews([]);
  //   }
  // }, [reviewsProp]);

  useEffect(() => {
    if (Array.isArray(reviewsProp)) {
      const formattedReviews = reviewsProp.map((item) => ({
        _id: item?._id,
        rating: Number(item?.rating || 0),
        comment: item?.comment || "",
        name: item?.user?.name || "Customer",
        email: item?.user?.email || "",
        date: item?.createdAt
          ? new Date(item.createdAt).toLocaleDateString()
          : "Just Now",
      }));

      setReviews(formattedReviews);
    } else {
      setReviews([]);
    }
  }, [reviewsProp]);

  // ================= SAVE REVIEW =================

  const handleSave = async () => {
    if (!formData.review.trim()) {
      toast.info("Please write your review");
      return;
    }

    try {
      setSubmitting(true);

      const { data } = await authAPI.post("products/reviews", {
        formData,
        id,
      });

      console.log("Review response:", data);

      // Backend response:
      // {
      //   formData: {
      //     rating: 4,
      //     review: "Best"
      //   },
      //   id: "..."
      // }

      const createdReview = {
        _id: data?.id || Date.now(),
        rating: Number(data?.formData?.rating ?? formData.rating),
        review: data?.formData?.review ?? formData.review,
        date: "Just Now",
      };

      // New review ko sab se upar show karo
      setReviews((prev) => [createdReview, ...prev]);

      setFormData({
        rating: 5,
        review: "",
      });

      setVisibleReviews((prev) => prev + 1);

      setShowModal(false);

      toast.success("Review added successfully");
    } catch (error) {
      console.error(
        "Failed to add review:",
        error?.response?.data || error.message
      );

      toast.error(
        error?.response?.data?.message || "Failed to add review"
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ================= STARS =================

  const renderStars = (count) => {
    const rating = Number(count) || 0;

    return (
      <div className="flex items-center gap-1 text-yellow-400 text-lg">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star}>
            {star <= rating ? "★" : "☆"}
          </span>
        ))}
      </div>
    );
  };

  // ================= JSX =================

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-10">

      {/* ================= HEADER ================= */}

      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Product Reviews
        </h2>

        <p className="text-sm sm:text-base text-gray-500 mt-2">
          Read customer reviews or write your own.
        </p>
      </div>

      {/* ================= WRITE REVIEW ================= */}

      {reviews.length > 0 && (
        <div className="mt-4">
          <button
            onClick={() => setShowModal(true)}
            className="
        w-full sm:w-auto
        bg-blue-600 hover:bg-blue-700
        active:scale-95
        transition-all
        text-white
        px-5 sm:px-6
        py-2.5 sm:py-3
        rounded-lg
        font-medium
      "
          >
            Write Review
          </button>
        </div>
      )}


      {/* ================= REVIEWS ================= */}

      {reviews.length === 0 ? (

        <div className="w-full py-8 sm:py-10 flex flex-col items-center justify-center text-center">

          <ReviewLoader />

          <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mt-2">
            No Reviews Found
          </h3>

          <p className="text-sm sm:text-base text-gray-500 mt-1">
            Be the first person to review this product.
          </p>

          <button
            onClick={() => setShowModal(true)}
            className="
        mt-4
        bg-blue-600
        hover:bg-blue-700
        text-white
        px-5
        py-2.5
        rounded-lg
        transition
      "
          >
            Write First Review
          </button>

        </div>

      ) : (

        <div className="space-y-4 sm:space-y-5 mt-6">

          {reviews.slice(0, visibleReviews).map((item, index) => (
            <div
              key={item?._id || index}
               className=" border   border-gray-200 rounded-xl p-4 sm:p-5 shadow-sm bg-white">

              <div className="flex justify-between items-start gap-3">

                <div className="min-w-0">

                  <h3 className="font-semibold text-lg text-gray-800">
                    {item?.name}
                  </h3>

                  <p className="text-sm text-gray-400">
                    {item?.email}
                  </p>

                  <div className="mt-1">
                    {renderStars(item?.rating)}
                  </div>

                  <p className="mt-3 text-gray-700 break-words">
                    {item?.comment}
                  </p>

                </div>

                <span className="text-gray-500 text-sm whitespace-nowrap">
                  {item?.date || "Just Now"}
                </span>

              </div>

            </div>
          ))}

        </div>

      )}

      {/* ================= LOAD MORE ================= */}

      {reviews.length > visibleReviews && (
        <div className="flex justify-center mt-6">

          <button
            onClick={() => setVisibleReviews(reviews.length)}
            className="
              w-full
              sm:w-auto
              border
              border-gray-300
              px-5
              sm:px-6
              py-2.5
              rounded-lg
              text-sm
              sm:text-base
              font-medium
              hover:bg-gray-100
              transition
            "
          >
            Load More Reviews
          </button>

        </div>
      )}

      {/* ================= REVIEW MODAL ================= */}

      {showModal && (
        <div
          className="
            fixed
            inset-0
            z-50
            bg-black/50
            flex
            items-center
            justify-center
            p-3
            sm:p-4
            overflow-y-auto
          "
        >

          <div
            className="
              bg-white
              rounded-xl
              w-full
              max-w-lg
              p-4
              sm:p-6
              shadow-xl
              my-4
            "
          >

            {/* MODAL HEADER */}

            <div
              className="
                flex
                items-center
                justify-between
                gap-3
                mb-5
              "
            >

              <h2
                className="
                  text-xl
                  sm:text-2xl
                  font-bold
                  text-gray-900
                "
              >
                Write Review
              </h2>

              <button
                onClick={() => setShowModal(false)}
                disabled={submitting}
                className="
                  w-8
                  h-8
                  flex
                  items-center
                  justify-center
                  rounded-full
                  bg-gray-100
                  hover:bg-gray-200
                  text-gray-600
                  text-lg
                "
              >
                ×
              </button>

            </div>

            {/* RATING LABEL */}

            <label
              className="
                block
                text-sm
                font-medium
                text-gray-700
                mb-2
              "
            >
              Rating
            </label>

            {/* RATING */}

            <select
              value={formData.rating}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  rating: Number(e.target.value),
                })
              }
              className="
                w-full
                border
                border-gray-300
                rounded-lg
                p-3
                mb-4
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            >
              <option value="5">⭐⭐⭐⭐⭐ (5)</option>
              <option value="4">⭐⭐⭐⭐ (4)</option>
              <option value="3">⭐⭐⭐ (3)</option>
              <option value="2">⭐⭐ (2)</option>
              <option value="1">⭐ (1)</option>
            </select>

            {/* REVIEW LABEL */}

            <label
              className="
                block
                text-sm
                font-medium
                text-gray-700
                mb-2
              "
            >
              Your Review
            </label>

            {/* REVIEW TEXTAREA */}

            <textarea
              rows={5}
              placeholder="Write your review..."
              value={formData.review}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  review: e.target.value,
                })
              }
              className="
                w-full
                border
                border-gray-300
                rounded-lg
                p-3
                resize-none
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />

            {/* BUTTONS */}

            <div
              className="
                flex
                flex-col-reverse
                sm:flex-row
                justify-end
                gap-3
                mt-6
              "
            >

              <button
                onClick={() => setShowModal(false)}
                disabled={submitting}
                className="
                  w-full
                  sm:w-auto
                  px-5
                  py-2.5
                  rounded-lg
                  border
                  border-gray-300
                  hover:bg-gray-100
                  transition
                  disabled:opacity-50
                "
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                disabled={submitting}
                className="
                  w-full
                  sm:w-auto
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  px-5
                  py-2.5
                  rounded-lg
                  transition
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
              >
                {submitting ? "Saving..." : "Save Review"}
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}