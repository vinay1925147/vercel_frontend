import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UseCartItemContent from "./cart-item-content";

function UseCartWrapper({ setOpenCartSheet, cartItems ,setOpenHeadrerSheet}) {
  // console.log(cartItems);
  const totalCartItem =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem.quantity,
          0
        )
      : 0;
  const navigate = useNavigate();
  return (
    <SheetContent className="px-2">
      <SheetHeader>
        <SheetTitle className="font-bold text-[22px]">Your Cart</SheetTitle>
      </SheetHeader>
      <div className=" mt-2 space-y-4">
        {cartItems && cartItems.length > 0
          ? cartItems.map((item) => <UseCartItemContent cartItem={item} />)
          : null}
      </div>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Cart</span>
          <span className="font-bold">${totalCartItem}</span>
        </div>
        <Button
          className="w-full mt-4 text-[16px] cursor-pointer bg-blue-600 hover:bg-blue-800"
          onClick={() => {
            navigate("/shop/checkout");
            setOpenCartSheet(false);
            setOpenHeadrerSheet(false)
          }}
        >
          CheckOut
        </Button>
      </div>
    </SheetContent>
  );
}

export default UseCartWrapper;
