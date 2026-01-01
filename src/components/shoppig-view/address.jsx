import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addressFormControls } from "../../config/index.js";

import CommonForm from "../commen/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import AddressCard from "./address-card.jsx";
import { addNewAddress, deleteAddress, editAddress, getAllAddress } from "@/store/shop/address-slice/index.js";

const initialFormData = {
  address: "",
  city: "",
  pincode: "",
  phone: "",
  notes: "",
};
function Address({ setCurrentAddress }) {
  const [formData, setFormData] = useState(initialFormData);
  const [currentDataId, setCurrentDataId] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);
  //  console.log(user,user?.id)
  const handleAddOnSubmit = (e) => {
    e.preventDefault();

    if (addressList.length >= 4) {
      toast.warning("You have max Two password");
      return;
    }
    try {
      currentDataId !== null
        ? dispatch(
            editAddress({
              userId: user?.id,
              addressId: currentDataId,
              formData,
            })
          ).then((data) => {
            if (data?.payload?.success) {
              dispatch(getAllAddress(user?.id));
              setCurrentDataId(null);
              setFormData(initialFormData);
              toast.success(data?.payload?.msg);
            }
          })
        : dispatch(
            addNewAddress({
              ...formData,
              userId: user?.id,
            })
          ).then((data) => {
            if (data?.payload?.success) {
              dispatch(getAllAddress(user?.id));
              setFormData(initialFormData);
              toast.success(data?.payload?.msg);
            }
          });
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteAddress = (getCurrentAddress) => {
    dispatch(
      deleteAddress({ userId: user?.id, addressId: getCurrentAddress._id })
    ).then((data) => {
      if (data.payload.success) {
        dispatch(getAllAddress(user?.id));
        toast.success(data.payload.msg);
      }
    });
  };
  const handleEditAddress = (getCurrentAddress) => {
    console.log(getCurrentAddress);

    setCurrentDataId(getCurrentAddress._id);
    setFormData({
      ...formData,
      address: getCurrentAddress?.address,
      city: getCurrentAddress?.city,
      pincode: getCurrentAddress?.pincode,
      phone: getCurrentAddress?.phone,
      notes: getCurrentAddress?.notes,
    });
  };

  console.log("addressList", addressList);

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  useEffect(() => {
    if (user?.id) {
      dispatch(getAllAddress(user?.id));
    }
  }, [dispatch, user?.id]);

  return (
    <Card>
      <div className="mb-5 p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {addressList && addressList.length > 0
          ? addressList.map((singleAddress) => (
              <AddressCard
                handleDeleteAddress={handleDeleteAddress}
                handleEditAddress={handleEditAddress}
                addressInfo={singleAddress}
                setCurrentAddress={setCurrentAddress}
              />
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle className="text-2xl">
          {currentDataId != null ? "Edit Address" : "Add New Address"}
        </CardTitle>
      </CardHeader>
      <CardContent className="spa">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentDataId != null ? "Edit Address" : "Add Address"}
          onSubmit={handleAddOnSubmit}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
}
export default Address;
