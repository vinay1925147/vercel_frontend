import { useState } from "react";

import { Button } from "../ui/button";
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
import AdminOrderDetailsView from "./order-details";
function AdminOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  // const handleFetchOrderDetails = () => {
   
  // };
  return (
    <Card className="rounded-2xl shadow-md border border-gray-200">
  <CardHeader className="border-b bg-gray-50">
    <CardTitle className="text-lg font-semibold text-gray-800">
      Order History
    </CardTitle>
  </CardHeader>

  <CardContent className="p-4">
    <Table className="w-full border rounded-lg overflow-hidden">
      <TableHeader className="bg-gray-100">
        <TableRow>
          <TableHead className="text-gray-700 font-medium">Order ID</TableHead>
          <TableHead className="text-gray-700 font-medium">Order Date</TableHead>
          <TableHead className="text-gray-700 font-medium">Order Status</TableHead>
          <TableHead className="text-gray-700 font-medium">Order Price</TableHead>
          <TableHead>
            <span className="sr-only">Details</span>
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow className="hover:bg-gray-50 transition">
          <TableCell className="font-medium text-gray-800">id</TableCell>
          <TableCell className="text-gray-600">id1</TableCell>

          <TableCell>
            <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
              Pending
            </span>
          </TableCell>

          <TableCell className="font-semibold text-gray-800">
            $0.00
          </TableCell>

          <TableCell className="text-right">
            <Dialog
              open={openDetailsDialog}
              onOpenChange={() => {
                setOpenDetailsDialog(false);
              }}
            >
              <Button
                onClick={() => setOpenDetailsDialog(true)}
                className="bg-black text-white hover:bg-gray-800 px-4 py-2 rounded-lg"
              >
                View Details
              </Button>

              <AdminOrderDetailsView />
            </Dialog>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </CardContent>
</Card>

  );
}

export default AdminOrders;
