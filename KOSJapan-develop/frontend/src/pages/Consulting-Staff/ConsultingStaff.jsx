// ConsultingStaff.js
import React from "react";
import { useTable } from "react-table";
import axios from "axios";
import { useGetConsultingBooking } from "@/query/BookingQuery";
import LayoutAdmin from "@/components/layout-admin";

const ConsultingStaff = () => {
    const { data, isLoading, isError } = useGetConsultingBooking();

    const columns = React.useMemo(
        () => [
            {
                Header: "Customer Name",
                accessor: "customer.name",
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
                Header: "Fish Orders",
                accessor: "fishOrders",
                Cell: ({ cell: { value } }) => (
                    <ul>
                        {value.map((order) => (
                            <li key={order.id}>
                                {order.fishOrderDetails
                                    .map((fish) => fish.fish.variety.name)
                                    .join(", ")}
                            </li>
                        ))}
                    </ul>
                ),
            },
            {
                Header: "Payment Status",
                accessor: "tripPayment.amount",
                Cell: ({ cell: { value } }) => (
                    <span>{value ? "Paid" : "Pending"}</span>
                ),
            },
            {
                Header: "Tour Status",
                accessor: "status",
                Cell: ({ cell: { value } }) => (
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={() =>
                            handleUpdateTourStatus(cell.row.original.id)
                        }
                    >
                        Update Status
                    </button>
                ),
            },
        ],
        []
    );

    const handleUpdateTourStatus = async (id) => {
        try {
            await axios.post(`/api/updateTourStatus/${id}`);
        } catch (error) {
            console.error("Error updating tour status:", error);
        }
    };

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data: data || [] });

    if (isLoading) return <div className="text-center">Loading...</div>;
    if (isError)
        return (
            <div className="text-red-500 text-center">Error fetching data.</div>
        );

    return (
        <LayoutAdmin>
            <div className="container mx-auto p-6">
                <h1 className="text-2xl font-bold mb-4">Consulting Staff</h1>
                {data && (
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
                )}
            </div>
        </LayoutAdmin>
    );
};

export default ConsultingStaff;
