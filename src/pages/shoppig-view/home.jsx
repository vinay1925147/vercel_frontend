import ProductDetailsDialog from "@/components/shoppig-view/product-details";
import ShoppingProductTile from "@/components/shoppig-view/product-tile";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { addCartItems, getCartItems } from "@/store/shop/cart-slice";
import {
  getAllFilterProduct,
  getProductDetails,
} from "@/store/shop/product-slice";
import {
  Airplay,
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  Heater,
  Images,
  Shirt,
  ShirtIcon,
  ShoppingBasket,
  UmbrellaIcon,
  WashingMachineIcon,
  WatchIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import banner1 from "../../assets/banner-1.webp";
import banner2 from "../../assets/banner-2.webp";
import banner3 from "../../assets/banner-3.webp";
import ShoppingHeader from "@/components/shoppig-view/header";

function Shoppinghome() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productList, productDetails } = useSelector(
    (state) => state.shopProduct
  );
  const { user } = useSelector((state) => state.auth);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [banner1, banner2, banner3];

  const categoriesWithIcon = [
    { id: "men", label: "Men", icon: ShirtIcon },
    { id: "women", label: "Women", icon: CloudLightning },
    { id: "kids", label: "Kids", icon: BabyIcon },
    { id: "accessories", label: "Accessories", icon: WatchIcon },
    { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
  ];

  const brandsWithIcon = [
    { id: "nike", label: "Nike", icon: Shirt },
    { id: "adidas", label: "Adidas", icon: WashingMachineIcon },
    { id: "puma", label: "Puma", icon: ShoppingBasket },
    { id: "levi", label: "Levi's", icon: Airplay },
    { id: "zara", label: "Zara", icon: Images },
    { id: "h&m", label: "H&M", icon: Heater },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  useEffect(() => {
    dispatch(getAllFilterProduct({ filterParams: {}, sortParms: "" }));
  }, [dispatch]);

  const handleGetProductDetails = (getCurrentProductId) => {
    dispatch(getProductDetails(getCurrentProductId));
  };
  const handleAddtoCart = (getCurrentProductId) => {
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
  };
  const handleNavigateToListingPage = (getcurrentItem, type) => {
    sessionStorage.removeItem("filters");
    const currentFIlters = {
      [type]: [getcurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFIlters));
    navigate("/shop/list");
  };
  useEffect(() => {
    if (productDetails != null) {
      setOpenDetailsDialog(true);
    }
  }, [productDetails]);

 

  return (
    <div className="flex flex-col min-h-screen">
      
      <div className="relative w-full h-[600px]">
        {slides.map((slide, index) => (
          <img
            src={slide}
            alt="banner1"
            className={`${
              index === currentSlide ? "block" : "hidden"
            } absolute top-0 left-0 w-full h-full object-cover `}
          />
        ))}
        <Button
          variant="outline"
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 cursor-pointer"
          onClick={() => {
            setCurrentSlide(
              (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
            );
          }}
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          className="absolute top-1/2 right-6 transform -translate-y-1/2 bg-white cursor-pointer"
          onClick={() => {
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1 + slides.length) % slides.length
            );
          }}
        >
          <ChevronRightIcon className="w-4 h-4 " />
        </Button>
      </div>

      {/* section part by category */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                className="cursor-pointer hover:shadow-lg transition-shadow hover:bg-blue-400"
              >
                <CardContent className="flex flex-col items-center justify-center p-6 ">
                  <categoryItem.icon className="w-12 h-12 mb-4 text-primary " />
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* section part by brand */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandsWithIcon.map((brandItem) => (
              <Card
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                className="cursor-pointer transition-shadow  hover:bg-blue-400 "
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <brandItem.icon className="w-12 h-12 mb-4 text-primary " />
                  <span className="font-bold">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* section part by product */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Feature Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                  <ShoppingProductTile
                    product={productItem}
                    handleGetProductDetails={handleGetProductDetails}
                    handleAddtoCart={handleAddtoCart}
                  />
                ))
              : null}
          </div>
        </div>
      </section>

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default Shoppinghome;
