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
                    <div className="flex space-x-2">
                        <button
                            onClick={() => {
                                setSelectedTrip(row.original);
                                setIsDetailModalOpen(true);
                            }}
                            className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
                        >
                            Xem chi tiết
                        </button>
                        <button
                            onClick={() => {
                                setSelectedBooking(row.original);
                                setIsUpdateStatusModalOpen(true);
                            }}
                            className="bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-600"
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
                className="min-w-full bg-white shadow-md rounded-lg overflow-hidden"
            >
                <thead className="bg-gray-800 text-white">
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th
                                    {...column.getHeaderProps()}
                                    className="py-3 px-4 text-left text-sm font-medium"
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
                            <tr
                                {...row.getRowProps()}
                                className="hover:bg-gray-100"
                            >
                                {row.cells.map((cell) => (
                                    <td
                                        {...cell.getCellProps()}
                                        className="border border-gray-400 bg-papayawhip p-2"
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
