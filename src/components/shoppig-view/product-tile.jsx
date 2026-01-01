import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import StarRatingComponent from "../commen/star-rating";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  return (
    <>
      {/* <Card className="w-full max-w-sm mx-auto">
        <div onClick={() => handleGetProductDetails(product?._id)}>
          <div className="relative ">
            <img
              src={product?.image}
              alt={product?.title}
              className="w-full h-[400px] object-cover rounded-t-lg"
            />
            {product?.totalStock === 0 ? (
              <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                Out Of Stock
              </Badge>
            ) : product?.totalStock < 10 ? (
              <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                {`Only ${product?.totalStock} items left`}
              </Badge>
            ) : product?.salePrice > 90 ? (
              <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                Sale
              </Badge>
            ) : null}
          </div>

          <CardContent className="p-4">
            <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
            <div className="flex justify-between items-center mb-2">
              <span className="text-[16px] text-muted-foreground">
                {categoryOptionsMap[product?.category]}
              </span>
              <span className="text-[16px] text-muted-foreground">
                {brandOptionsMap[product?.brand]}
              </span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span
                className={`${
                  product?.salePrice > 0 ? "line-through" : ""
                } text-lg font-semibold text-primary`}
              >
                ${product?.price}
              </span>
              {product?.salePrice > 0 ? (
                <span className="text-lg font-semibold text-primary">
                  ${product?.salePrice}
                </span>
              ) : null}
            </div>
          </CardContent>
        </div>

        <CardFooter>
          {product?.totalStock === 0 ? (
            <Button className="w-full opacity-60 cursor-not-allowed">
              Out Of Stock
            </Button>
          ) : (
            <Button
              onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
              className="w-full"
            >
              Add to cart
            </Button>
          )}
        </CardFooter>
      </Card> */}

      <Card className="group w-full max-w-sm mx-auto overflow-hidden rounded-xl border bg-background shadow-sm hover:shadow-lg transition-all duration-300">
  
  {/* IMAGE */}
  <div
    onClick={() => handleGetProductDetails(product?._id)}
    className="relative cursor-pointer overflow-hidden"
  >
    <img
      src={product?.image}
      alt={product?.title}
      className="h-[260px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
    />

    {/* BADGES */}
    {product?.totalStock === 0 ? (
      <Badge className="absolute top-3 left-3 bg-red-600">
        Out of Stock
      </Badge>
    ) : product?.totalStock < 10 ? (
      <Badge className="absolute top-3 left-3 bg-orange-500">
        Only {product?.totalStock} left
      </Badge>
    ) : product?.salePrice > 0 ? (
      <Badge className="absolute top-3 left-3 bg-green-600">
        {Math.round(
          ((product.price - product.salePrice) / product.price) * 100
        )}
        % OFF
      </Badge>
    ) : null}
  </div>

  {/* CONTENT */}
  <CardContent className="p-4 space-y-2">
    {/* TITLE */}
    <h2
      onClick={() => handleGetProductDetails(product?._id)}
      className="font-semibold text-lg leading-tight line-clamp-2 cursor-pointer hover:text-primary"
    >
      {product?.title}
    </h2>

    {/* CATEGORY & BRAND */}
    <div className="flex justify-between text-sm text-muted-foreground">
      <span>{categoryOptionsMap[product?.category]}</span>
      <span>{brandOptionsMap[product?.brand]}</span>
    </div>

    {/* RATING */}
    <div className="flex items-center gap-1 text-sm">
      <StarRatingComponent rating={product?.averageRating || 4} />
      <span className="text-muted-foreground">(120)</span>
    </div>

    {/* PRICE */}
    <div className="flex items-center gap-3 mt-2">
      <span
        className={`text-lg font-bold ${
          product?.salePrice > 0
            ? "line-through text-muted-foreground"
            : "text-primary"
        }`}
      >
        ${product?.price}
      </span>

      {product?.salePrice > 0 && (
        <span className="text-xl font-bold text-green-600">
          ${product?.salePrice}
        </span>
      )}
    </div>
  </CardContent>

  {/* FOOTER CTA */}
  <CardFooter className="p-4 pt-0">
    {product?.totalStock === 0 ? (
      <Button disabled className="w-full">
        Out of Stock
      </Button>
    ) : (
      <Button
        onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
        className="w-full transition-all group-hover:bg-primary/90"
      >
        Add to Cart
      </Button>
    )}
  </CardFooter>
</Card>

    </>
  );
}

export default ShoppingProductTile;
