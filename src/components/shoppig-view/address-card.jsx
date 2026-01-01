import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentAddress,
}) {
  return (
    <>
      <Card
        onClick={() => {
          setCurrentAddress(addressInfo);
        }}
        className="cursor-pointer hover:border-blue-400 hover:bg-gray-200"
      >
        <CardContent className="grid gap-4 grid-cols-1 font-normal">
          <Label>
            {" "}
            <span className="font-bold text-[16px]">Address :</span>{" "}
            {addressInfo?.address}
          </Label>
          <Label>
            {" "}
            <span className="font-bold text-[16px]">City :</span>{" "}
            {addressInfo?.city}
          </Label>
          <Label>
            <span className="font-bold text-[16px]">PinCode :</span>{" "}
            {addressInfo?.pincode}
          </Label>
          <Label>
            <span className="font-bold text-[16px]">Phone :</span>{" "}
            {addressInfo?.phone}
          </Label>
          <Label className="flex items-start ">
            <span className="font-bold text-[16px]">Notes:</span>{" "}
            {addressInfo?.notes}
          </Label>
        </CardContent>
        <CardFooter className="p-2 flex items-center justify-between">
          <Button
            onClick={() => {
              handleEditAddress(addressInfo);
            }}
          >
            Edit
          </Button>
          <Button
            onClick={() => {
              handleDeleteAddress(addressInfo);
            }}
          >
            Delete
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
export default AddressCard;
