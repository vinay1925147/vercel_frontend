import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import ShoppingOrderDetailsView from "./order-details";


function ShippingOrder() {
  const [openDetailsDialog,setOpenDetailsDialog] = useState(false)
  return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Order History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Order Status</TableHead>
                <TableHead>Order Price</TableHead>
                <TableHead>
                  <span className="sr-only">Details</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell>id1</TableCell>
                <TableCell>
                  {/* <Badge
                        className={`py-1 px-3 ${
                          orderItem?.orderStatus === "confirmed"
                            ? "bg-green-500"
                            : orderItem?.orderStatus === "rejected"
                            ? "bg-red-600"
                            : "bg-black"
                        }`}
                      >
                        {orderItem?.orderStatus}
                      </Badge> */}
                      id3
                </TableCell>
                <TableCell>jhk</TableCell>
                <TableCell>
                      <Dialog
                        open={openDetailsDialog}
                        onOpenChange={() => {
                          setOpenDetailsDialog(false);
                          // dispatch(resetOrderDetails());
                        }}
                      >
                        <Button
                          onClick={() =>
                             setOpenDetailsDialog(true)
                          }
                        >
                          View Details
                        </Button>
                        <ShoppingOrderDetailsView />                       
                      </Dialog>
                    </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
  )
}
export default ShippingOrder;
