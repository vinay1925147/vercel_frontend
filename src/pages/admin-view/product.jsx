import AdminProductTile from "@/components/admin-view/product-tile";
import CommonForm from "@/components/commen/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import {
  addNewProduct,
  deleteProduct,
  getAllProduct,
  updateProduct,
} from "@/store/admin/product-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ProductImageUploads from "./image-upaloads";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
};

function Adminproduct() {
  let [openCreatedProduct, setOpenCreatedProduct] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFiles, setImageFiles] = useState(null);
  const [uploadedImageUrls, setUploadedImageUrls] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const { productList } = useSelector((state) => state.adminProduct);
  const dispatch = useDispatch();
  
  const onSubmit = async (e) => {
    e.preventDefault();
    currentEditedId !== null
      ? dispatch(
          updateProduct({
            id: currentEditedId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(getAllProduct());
            setFormData(initialFormData);
            setOpenCreatedProduct(false);
            setCurrentEditedId(null);
          }
        })
      : dispatch(addNewProduct({ ...formData, image: uploadedImageUrls })).then(
          (data) => {
            console.log(data, "edit");
            if (data?.payload?.success) {
              dispatch(getAllProduct());
              setFormData(initialFormData);
              setImageFiles(null);
              setUploadedImageUrls("");
              toast.success(data?.payload?.msg);
            }
          }
        );

    console.log(productList);
  };
  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  function handleDelete(getCurrentProductId) {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getAllProduct());
      }
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .filter((currentKey) => currentKey !== "averageReview")
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }
  return (
    <>
      <div className="mb-5 flex justify-end">
        <Button
          className="cursor-pointer"
          onClick={() => setOpenCreatedProduct(true)}
        >
          Add New Products
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-10 ">
        {productList.map((productItem) => (
          <AdminProductTile
            setFormData={setFormData}
            setOpenCreatedProduct={setOpenCreatedProduct}
            setCurrentEditedId={setCurrentEditedId}
            handleDelete={handleDelete}
            product={productItem}
          />
        ))}
      </div>
      <Sheet
        open={openCreatedProduct}
        onOpenChange={() => {
          setOpenCreatedProduct(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
          setImageFiles(null);
        }}
      >
        <SheetContent
          side="right"
          className="overflow-auto w-full sm:w-[500px]"
        >
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>

          {/*image container*/}
          <ProductImageUploads
            imageFiles={imageFiles}
            setImageFiles={setImageFiles}
            uploadedImageUrls={uploadedImageUrls}
            setUploadedImageUrls={setUploadedImageUrls}
            setImageLoading={setImageLoading}
            imageLoading={imageLoading}
            isEditmode={currentEditedId !== null}
          />

          <div className="px-7 mt-3 mb-10">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Edit": "Add"}
              formControls={addProductFormElements}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default Adminproduct;
