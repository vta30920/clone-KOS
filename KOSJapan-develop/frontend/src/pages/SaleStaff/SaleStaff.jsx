import LayoutAdmin from "@/components/layout-admin";
import React, { useMemo } from "react";
import BookingTable from "./table/BookingTable";
import { useGetBooking } from "@/query/BookingQuery";
export default function SaleStaff() {
    const { data } = useGetBooking();
    return <LayoutAdmin>{data && <BookingTable data={data} />}</LayoutAdmin>;
}
