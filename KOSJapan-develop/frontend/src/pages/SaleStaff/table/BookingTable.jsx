import { convertTime } from "@/helper";
import React, { useMemo } from "react";
import { useTable } from "react-table";

const BookingTable = ({ data }) => {
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
                Cell: ({ cell }) => {
                    const value = cell.value;
                    return convertTime(value);
                },
            },
            {
                Header: "Trip End Date",
                accessor: "trip.endDate",
                Cell: ({ cell }) => {
                    const value = cell.value;
                    return convertTime(value);
                },
            },
            {
                Header: "Departure Airport",
                accessor: "trip.departureAirport",
            },
            {
                Header: "Trip Price",
                accessor: "trip.price",
            },
            {
                Header: "Trip Status",
                accessor: "trip.status",
            },
            {
                Header: "Booking Status",
                accessor: "status",
            },
            {
                Header: "Payment Method",
                accessor: "tripPayment.paymentMethodName",
            },
        ],
        []
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data });

    return (
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
    );
};

export default BookingTable;
