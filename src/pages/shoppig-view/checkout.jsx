import Address from "@/components/shoppig-view/address";
import UseCartItemContent from "@/components/shoppig-view/cart-item-content";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import account from "../../assets/account.jpeg";
import { createNewOrder } from "@/store/shop/order-slice";


function Shoppingcheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);

  console.log("cartItems", cartItems);
  
  const { user } = useSelector((state) => state.auth);

   const { orderId, approvalURL } = useSelector((state) => state.shopOrder);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [isPayment,setIsPayment] = useState(false) 

 const dispatch = useDispatch();
  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;
      
  const handlePaypalpayment = () => {
    // Implement PayPal payment logic here
    // const orderData = {
    //   userId: user?.id,
    //   cartId: cartItems?._id,
    //   cartItems: cartItems?.items.map((singleCartItem) => ({
    //     productId: singleCartItem.productId,
    //     title: singleCartItem.title,
    //     price:
    //       singleCartItem.salePrice > 0
    //         ? singleCartItem.salePrice
    //         : singleCartItem.price,
    //     quantity: singleCartItem.quantity,
    //   })),
    //   addressInfo: {
    //     addressId: currentAddress?._id,
    //     address: currentAddress?.address,
    //     city: currentAddress?.city,
    //     pincode: currentAddress?.pincode,
    //     phone: currentAddress?.phone,
    //     notes: currentAddress?.notes,
    //   },
    //   orderStatus: "pending",
    //   paymentMethod: "Razorpay",
    //   paymentStatus: "PENDING",
    //   totalAmount: totalCartAmount,
    //   orderDate: new Date(),
    //   orderUpdateDate: new Date(),
    //   paymentId: "",
    //   payerId: "",
    // };
    const orderData = 200;
    console.log(orderData, "orderData");
    dispatch(createNewOrder(orderData)).then((data)=>{
      // if(data.payload.success){
      //   setIsPayment(true);
      // }else{
      //   setIsPayment(false);
      // }
      console.log(window)
    })
  };



  return (
    <>
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        {/* Banner Image */}
        <div className="relative h-[300px] w-full overflow-hidden rounded-lg">
          <img
            src={account}
            alt="Account"
            className="h-full w-full object-cover "
          />
        </div>

        {/* Checkout Content */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT SIDE – Address Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
            <Address setCurrentAddress={setCurrentAddress} />
          </div>

          {/* RIGHT SIDE – Cart Section */}
          <div className="bg-white rounded-lg shadow p-6 flex flex-col">
            <h2 className="text-xl font-bold mb-4">Your Cart</h2>

            {/* Cart Items */}
            <div className="flex flex-col gap-4">
              {cartItems && cartItems.items && cartItems.items.length > 0 ? (
                cartItems.items.map((item) => (
                  <UseCartItemContent key={item._id} cartItem={item} />
                ))
              ) : (
                <p className="text-gray-500">Your cart is empty</p>
              )}
            </div>

            {/* Cart Summary */}
            <div className=" border-t pt-4 space-y-4">
              <div className="flex justify-between text-lg font-semibold mt-2">
                <span>Total</span>
                <span>${totalCartAmount}</span>
              </div>
              <Button
                onClick={() => {
                  handlePaypalpayment()
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 mt-3"
              >
                Pay with PayPal
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Shoppingcheckout;
