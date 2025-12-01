import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { FileIcon, SkipBack, Skull, UploadCloudIcon, XIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { FaStickerMule } from "react-icons/fa";


function ProductImageUploads({
  imageFiles,
  uploadedImageUrls,
  imageLoading,
  setImageFiles,
  setUploadedImageUrls,
  setImageLoading,
  isEditmode
}) {
  const inputRef = useRef(null);
  const handleImageChange = (e) => {
    // file objact with --> name, size, type, lastModified
    const selectedFiles = e.target.files?.[0];
    if (selectedFiles) {
      setImageFiles(selectedFiles);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files?.[0];
    if (droppedFiles) {
      setImageFiles(droppedFiles);
    }
  };
  const handleRemoveImage = () => {
    setImageFiles(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };
  const uploadImageToCloudinary = async ()=>{
    setImageLoading(true)
    const formData = new FormData();
    formData.append("file-name",imageFiles);
    const response = await axios.post("http://localhost:8000/api/admin/product/upload-image",formData)
    console.log(response)
    if(response.data.success){
      setUploadedImageUrls(response.data.result.url)
      setImageLoading(false)
    }
  }
  useEffect(() =>{
    if(imageFiles !==null){
      uploadImageToCloudinary()
    }
  },[imageFiles])
  return (
    <div className="w-full max-w-md mx-auto">
      <Label className="text-lg font-semibold mb-2 block">Uploads image</Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={` ${isEditmode ? " opacity-95 " : "" }border-2 border-dashed rounded-lg p-4`}
      >
        <Input
          className="hidden"
          id="image-upload"
          type="file"
          ref={inputRef}
          onChange={handleImageChange}
          disabled={isEditmode}
        />

        {!imageFiles ? (
          <Label
            htmlFor="image-upload"
            className={`${isEditmode ? "": ""}cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-md p-10 text-center hover:bg-gray-50 `}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground m-2" />
            <span className="font-bold text-gray-700">Drag and Drop & upload image</span>
          </Label>
        ) : (
          imageLoading ? <SkipBack/> : <> <h1></h1>
       
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="text-primary mr-4 w-8 h-8" />
            </div>
            <p className="text-sm font-medium ">{imageFiles.name} </p>
            <Button
              varient="ghost"
              size="icon"
              className=""
              onClick={handleRemoveImage}
            >
              <XIcon className="w-3 h-4" />
              <span className="sr-only">Reamove file</span>
            </Button>
          </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductImageUploads;
