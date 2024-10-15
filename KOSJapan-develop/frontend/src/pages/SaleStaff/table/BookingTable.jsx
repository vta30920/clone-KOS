import React, { useMemo, useState } from "react";
import { useTable } from "react-table";
import DetailModal from "../modal/DetailModal";
import UpdateStatusModal from "../modal/UpdateStatusModal";

const BookingTable = ({ data, onStatusUpdate }) => {
    const [selectedTrip, setSelectedTrip] = useState(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isUpdateStatusModalOpen, setIsUpdateStatusModalOpen] =
        useState(false);

    const columns = useMemo(
        () => [
            {
                Header: "Booking ID",
                accessor: "id",
            },
            {
                Header: "Customer Name",
                accessor: "customer.name",
            },
            {
                Header: "Customer Email",
                accessor: "customer.email",
            },
            {
                Header: "Trip ID",
                accessor: "trip.id",
            },
            {
                Header: "Trip Start Date",
                accessor: "trip.startDate",
            },
            {
                Header: "Trip End Date",
                accessor: "trip.endDate",
            },
            {
                Header: "Status",
                accessor: "status",
            },
            {
                Header: "Actions",
                Cell: ({ row }) => (
                    <div>
                        <button
                            onClick={() => {
                                setSelectedTrip(row.original);
                                setIsDetailModalOpen(true);
                            }}
                            className="bg-blue-500 text-white px-3 py-2 rounded mr-2"
                        >
                            Xem chi tiết
                        </button>
                        <button
                            onClick={() => {
                                setSelectedBooking(row.original); // Lưu booking được chọn
                                setIsUpdateStatusModalOpen(true); // Mở modal cập nhật trạng thái
                            }}
                            className="bg-yellow-500 text-white px-3 py-2 rounded"
                        >
                            Cập nhật trạng thái
                        </button>
                    </div>
                ),
            },
        ],
        []
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data });

    return (
        <div>
            <table
                {...getTableProps()}
                style={{ border: " solid 1px blue" }}
                className="w-full"
            >
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th
                                    {...column.getHeaderProps()}
                                    style={{
                                        borderBottom: "solid 3px red",
                                        background: "aliceblue",
                                        color: "black",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {column.render("Header")}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <td
                                        {...cell.getCellProps()}
                                        style={{
                                            padding: "10px",
                                            border: "solid 1px gray",
                                            background: "papayawhip",
                                        }}
                                    >
                                        {cell.render("Cell")}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {selectedTrip && (
                <DetailModal
                    isOpen={isDetailModalOpen}
                    onClose={() => setIsDetailModalOpen(false)}
                    booking={selectedTrip}
                />
            )}

            {/* Hiển thị modal cập nhật trạng thái */}
            {selectedBooking && (
                <UpdateStatusModal
                    isOpen={isUpdateStatusModalOpen}
                    onClose={() => setIsUpdateStatusModalOpen(false)}
                    booking={selectedBooking}
                    onUpdate={(newStatus) => {
                        onStatusUpdate(selectedBooking.id, newStatus);
                        setIsUpdateStatusModalOpen(false);
                    }}
                />
            )}
        </div>
    );
};

export default BookingTable;
