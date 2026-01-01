import { shoppingViewHeaderMenuItems } from "@/config";
import { logoutUser } from "@/store/auth-slice";
// import { fetchCartItems } from "@/store/shop/cart-slice";
import {
  CircleStar,
  HousePlug,
  LogOut,
  Menu,
  ShoppingCart,
  UserCog,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
// import { Label } from "../ui/label";
import { getCartItems } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import UserCartWrapper from "./cart-wrapper";

function MenuItems() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleNavigate = (getCurrentMenuItem) => {
    sessionStorage.removeItem("filters");
    const currentFilter = getCurrentMenuItem.id !== "home";
    getCurrentMenuItem.id !== "products" && getCurrentMenuItem.id !== "search"
      ? {
          category: [getCurrentMenuItem.id],
        }
      : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(getCurrentMenuItem.path);
    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(
          new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
        )
      : navigate(getCurrentMenuItem.path);
  };

  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label
          onClick={() => handleNavigate(menuItem)}
          className="text-md font-medium p-3  rounded-2xl cursor-pointer hover:bg-gray-100 hover:text-gray-900"
          key={menuItem.id}
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  );
}

function HeaderRightContent({ setOpenHeadrerSheet }) {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  // console.log(cartItems)
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  useEffect(() => {
    dispatch(getCartItems(user?.id));
  }, [dispatch]);

  console.log(cartItems, "catItem");

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      {/* cart option */}
      <Sheet
        open={openCartSheet}
        onOpenChange={() => setOpenCartSheet(false)}
        className="w-5/6"
      >
          <Button
            onClick={() => setOpenCartSheet(true)}
            variant="outline"
            size="icon"
            className="relative p-4 cursor-pointer"
          >
            <ShoppingCart className="w-9 h-9 " />
            <span className="absolute top-[-5px] right-0.5 font-bold text-sm">
              {cartItems?.items?.length || 0}
            </span>
            <span className="sr-only">User cart</span>
          </Button>
     

        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          setOpenHeadrerSheet={setOpenHeadrerSheet}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>
      {/* profile account */}
      <DropdownMenu className="m-5">
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-gray-900">
            <AvatarFallback className="bg- text text-white font-extrabold">
              {user?.email[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent side="top" className="w-56 mt-2 mr-5">
          <DropdownMenuLabel className="font-extrabold text-17px">
            Logged in as {user?.role}
          </DropdownMenuLabel>

          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/shop/account")}>
            <UserCog className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/shop/order")}>
            <CircleStar className="mr-2 h-4 w-4" />
            MyOrder
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ShoppingHeader() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [opeHeaderSheet, setOpenHeadrerSheet] = useState(false);
  return (
    <header className="w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2">
          <HousePlug className="h-6 w-6" />
          <span className="font-bold text-xl">ServeSmart</span>
        </Link>

        {/* small devices */}
        <Sheet
          open={opeHeaderSheet}
          onOpenChange={() => setOpenHeadrerSheet(true)}
        >
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-60 max-w-xs px-7 py-8">
            <MenuItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>

        {/* middle */}
        <div className="hidden lg:block">
          <MenuItems />
        </div>

        {/* right */}
        <div className="hidden lg:block">
          <HeaderRightContent setOpenHeadrerSheet={setOpenHeadrerSheet} />
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;
