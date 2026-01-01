import ProductDetailsDialog from "@/components/shoppig-view/product-details";
import ShoppingProductTile from "@/components/shoppig-view/product-tile";
import { Input } from "@/components/ui/input";
import { addCartItems } from "@/store/shop/cart-slice";
import { getProductDetails } from "@/store/shop/product-slice";
import {
  getSearchResults,
  resetSearchResults,
} from "@/store/shop/search-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

function SearchProduct() {
  const [keyword, setKeyword] = useState("");
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { searchResults } = useSelector((state) => state.shopSearch);
  const { productDetails } = useSelector((state) => state.shopProduct);
  console.log(productDetails,"productDetails123456789");
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);

  useEffect(() => {
    if (keyword && keyword.trim() !== "") {
      setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
        dispatch(getSearchResults(keyword));
      }, 100);
    } else {
      setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
      dispatch(resetSearchResults());
    }
  }, [keyword]);
  
  const handleAddtoCart = (getCurrentProductId, getTotalStock) => {
    console.log(cartItems);
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
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
        toast({
          title: "Product is added to cart",
        });
      }
    });
  };

  const handleGetProductDetails = (getCurrentProductId) => {
    console.log(getCurrentProductId);
    dispatch(getProductDetails(getCurrentProductId));
  };

  useEffect(() => {
    if (productDetails !== null) {
      setOpenDetailsDialog(true);
    }

  }, [productDetails]);

  return (
    <div className="container mx-auto md:px-6 px-4 py-8 ">
      <div className="flex justify-center mb-8">
        <div className="w-full flex items-center ">
          <Input
            placeholder="search Products...."
            value={keyword}
            name="keyword"
            onChange={(event) => {
              setKeyword(event.target.value);
            }}
            className="py-6 font-bold text-[20px] outline-1"
          />
        </div>
      </div>

      {!searchResults.length ? (
        <h1 className="text-5xl font-extrabold">No result found!</h1>
      ) : null}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {searchResults.map((item) => (
          <ShoppingProductTile
            handleAddtoCart={handleAddtoCart}
            product={item}
            handleGetProductDetails={handleGetProductDetails}
          />
        ))}
      </div>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default SearchProduct;
