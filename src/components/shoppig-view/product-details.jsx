import { addCartItems, getCartItems } from "@/store/shop/cart-slice";
import {
  getProductDetails,
  setProductDetails,
} from "@/store/shop/product-slice";
import { addProductReviews } from "@/store/shop/review-slice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import StarRatingComponent from "../commen/star-rating";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  //console.log(open)
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);
  // console.log("reviews",reviews)
  function handleRatingChange(getRating) {
    // console.log(getRating, "getRating");
    setRating(getRating);
  }
  const navigate = useNavigate();
  const handleBuyNow = async () => {
    await handleAddToCart(productDetails._id, productDetails.totalStock);
    navigate("/shop/checkout");
  };

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    let getCartItem = cartItems.items || [];
    if (getCartItem.length) {
      const indexOfCurrentItem = getCartItem.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItem[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast.success(
            `Only ${getQuantity} quantity can be added for this item`
          );
          return;
        }
      }
    }
    dispatch(
      addCartItems({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getCartItems(user?.id));
        toast.success("Product is added to cart");
      }
    });
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
  }

  // function handleAddReview() {
  //   dispatch(
  //     addProductReviews({
  //       productId: productDetails?._id,
  //       userId: user?.id,
  //       userName: user?.name,
  //       reviewMessage: reviewMsg,
  //       reviewValue: rating,
  //     })
  //   ).then((data) => {
  //     if (data?.payload?.success) {
  //       setRating(0);
  //       setReviewMsg("");
  //       dispatch(getProductDetails(productDetails?._id));
  //       toast.success(data.payload.msg);
  //     }
  //   });
  // }

  // useEffect(() => {
  //   if (productDetails !== null) dispatch(getProductDetails(productDetails?._id));
  // }, [productDetails]);
  

  function handleAddReview(){
    dispatch(getProductDetails(productDetails?._id));
  }
  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  return (
    // <Dialog open={open} onOpenChange={handleDialogClose}>
    //   <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
    //     <div className="relative overflow-hidden rounded-lg">
    //       <img
    //         src={productDetails?.image}
    //         alt={productDetails?.title}
    //         width={600}
    //         height={600}
    //         className="aspect-square w-full object-cover"
    //       />
    //     </div>
    //     <div className="">
    //       <div>
    //         <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
    //         <p className="text-muted-foreground text-2xl mb-5 mt-4">
    //           {productDetails?.description}
    //         </p>
    //       </div>
    //       <div className="flex items-center justify-between">
    //         <p
    //           className={`text-3xl font-bold text-primary ${
    //             productDetails?.salePrice > 0 ? "line-through" : ""
    //           }`}
    //         >
    //           ${productDetails?.price}
    //         </p>
    //         {productDetails?.salePrice > 0 ? (
    //           <p className="text-2xl font-bold text-muted-foreground">
    //             ${productDetails?.salePrice}
    //           </p>
    //         ) : null}
    //       </div>
    //       <div className="flex items-center gap-2 mt-2">
    //         <div className="flex items-center gap-0.5">
    //           <StarRatingComponent
    //             rating={averageReview}
    //           />
    //         </div>
    //         <span className="text-muted-foreground">
    //           ({averageReview.toFixed(2)})

    //         </span>
    //       </div>
    //       <div className="mt-5 mb-5">
    //         {productDetails?.totalStock === 0 ? (
    //           <Button className="w-full opacity-60 cursor-not-allowed">
    //             Out of Stock
    //           </Button>
    //         ) : (
    //           <Button
    //             className="w-full"
    //             onClick={() =>
    //               handleAddToCart(
    //                 productDetails?._id,
    //                 productDetails?.totalStock
    //               )
    //             }
    //           >
    //             Add to Cart
    //           </Button>
    //         )}
    //       </div>
    //       <Separator />
    //       <div className="max-h-[300px] overflow-auto">
    //         <h2 className="text-xl font-bold mb-4">Reviews</h2>
    //         <div className="grid gap-6">
    //           {reviews && reviews.length > 0 ? (
    //             reviews.map((reviewItem) => (
    //           <div className="flex gap-4">
    //             <Avatar className="w-10 h-10 border">
    //               <AvatarFallback>
    //                 {reviewItem?.userName[0].toUpperCase()}
    //               </AvatarFallback>
    //             </Avatar>
    //             <div className="grid gap-1">
    //               <div className="flex items-center gap-2">
    //                 <h3 className="font-bold">
    //                   {reviewItem?.userName}
    //                   hello
    //                 </h3>
    //               </div>
    //               <div className="flex items-center gap-0.5">
    //                 <StarRatingComponent
    //                 rating={reviewItem?.reviewValue}
    //                 />
    //               </div>
    //               <p className="text-muted-foreground">
    //                 {reviewItem.reviewMessage}

    //               </p>
    //             </div>
    //           </div>
    //         ))
    //           ) : (
    //             <h1>No Reviews</h1>
    //           )}
    //         </div>
    //         <div className="mt-10 flex-col flex gap-3">
    //           <Label>Write a review</Label>
    //           <div className="flex gap-1">
    //             <StarRatingComponent
    //               rating={rating}
    //               handleRatingChange={handleRatingChange}
    //             />
    //           </div>
    //           <Input
    //             name="reviewMsg"
    //             value={reviewMsg}
    //             onChange={(event) => setReviewMsg(event.target.value)}
    //             placeholder="Write a review..."
    //           />
    //           <Button
    //           onClick={handleAddReview}
    //           disabled={reviewMsg.trim() === ""}
    //           className="bg-blue-600 hover:bg-blue-700 text-[15px] "
    //           >
    //             Submit
    //           </Button>
    //         </div>
    //       </div>
    //     </div>
    //   </DialogContent>
    // </Dialog>
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-[85vw] lg:max-w-[75vw] p-0 overflow-hidden rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 p-6 sm:p-10">
          {/* LEFT : PRODUCT IMAGE */}
          <div className="relative flex items-center justify-center bg-muted rounded-xl overflow-hidden">
        <img
          src={productDetails?.image}
          alt={productDetails?.title}
          className="w-full max-h-[420px] object-contain transition-transform duration-300 hover:scale-105"
        />
      </div>
        
          {/* RIGHT : PRODUCT DETAILS */}
          <div className="flex flex-col gap-4">
            {/* TITLE & DESCRIPTION */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                {productDetails?.title}
              </h1>
              <p className="text-muted-foreground mt-2 leading-relaxed">
                {productDetails?.description}
              </p>
            </div>

            {/* PRICE */}
            <div className="flex items-center gap-4 mt-2">
              <p
                className={`text-3xl font-bold ${
                  productDetails?.salePrice > 0
                    ? "line-through text-muted-foreground"
                    : "text-primary"
                }`}
              >
                ${productDetails?.price}
              </p>

              {productDetails?.salePrice > 0 && (
                <p className="text-3xl font-bold text-green-600">
                  ${productDetails?.salePrice}
                </p>
              )}
            </div>

            {/* RATING */}
            <div className="flex items-center gap-2">
              <StarRatingComponent rating={averageReview} />
              <span className="text-sm text-muted-foreground">
                {averageReview.toFixed(1)} / 5
              </span>
            </div>

            {/* ADD TO CART */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              {productDetails?.totalStock === 0 ? (
                <Button disabled className="w-full">
                  Out of Stock
                </Button>
              ) : (
                <Button
                  className="w-full text-lg  cursor-pointer border-primary bg-blue-600 hover:bg-blue-700"
                  onClick={() =>
                    handleAddToCart(
                      productDetails?._id,
                      productDetails?.totalStock
                    )
                  }
                >
                  Add to Cart
                </Button>
              )}
              <Button
                variant="outline"
                className="w-full text-lg cursor-pointer  bg-yellow-400 text-black hover:bg-yellow-500 "
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>
            </div>

            <Separator className="my-4" />

            {/* REVIEWS */}
            <div className="flex-1 overflow-hidden">
              <h2 className="text-lg font-semibold mb-3">Customer Reviews</h2>
              <div className="max-h-[220px] overflow-y-auto pr-2 space-y-5">
                {reviews && reviews.length > 0 ? (
                  reviews.map((reviewItem) => (
                    <div key={reviewItem._id} className="flex gap-3">
                      <Avatar className="w-10 h-10 border">
                        <AvatarFallback> 
                          {reviewItem?.userName?.[0]?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <p className="font-semibold">{reviewItem?.userName}</p>
                        <StarRatingComponent rating={reviewItem?.reviewValue} />
                        <p className="text-sm text-muted-foreground mt-1">
                          {reviewItem?.reviewMessage}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-sm">
                    No reviews yet
                  </p>
                )}
              </div>
            </div>

            {/* WRITE REVIEW */}
            <div className="mt-6 space-y-3">
              <Label className="font-semibold">Write a review</Label>

              <StarRatingComponent
                rating={rating}
                handleRatingChange={handleRatingChange}
              />

              <Input
                name="reviewMsg"
                value={reviewMsg}
                onChange={(e) => setReviewMsg(e.target.value)}
                placeholder="Share your experience..."
              />

              <Button
                onClick={handleAddReview}
                disabled={reviewMsg.trim() === ""}
                className="text-lg bg-blue-600 cursor-pointer hover:bg-blue-700"
              >
                Submit Review
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
