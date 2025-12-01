import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UseCartItemContent from "./cart-item-content";

function UseCartWrapper({ setOpenCartSheet, cartItems }) {
  console.log(cartItems);
  return (
    <SheetContent className="px-2">
      <SheetHeader>
        <SheetTitle className="font-extrabold">Your Cart</SheetTitle>
      </SheetHeader>
      <div className=" mt-2 space-y-4">
        {cartItems && cartItems.length > 0
          ? cartItems.map((item) => <UseCartItemContent cartItem={item} />)
          : null}
      </div>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Cart</span>
          <span className="font-bold">$1000</span>
        </div>
        <Button className="w-full mt-4">CheckOut</Button>
      </div>
    </SheetContent>
  );
}

export default UseCartWrapper;
