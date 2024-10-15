import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "../../../components/ui/dialog";
import EditTripDestinationModal from "./EditTripDestinationsModal";

const DetailModal = ({ isOpen, onClose, booking }) => {
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Trạng thái modal chỉnh sửa

    const handleEditClick = (destination) => {
        setSelectedDestination(destination); // Lưu điểm đến đang được chỉnh sửa
        setIsEditModalOpen(true); // Mở modal chỉnh sửa
    };

    console.log(booking);

    // Kiểm tra nếu booking hoặc trip hoặc tripDestinations không tồn tại
    if (!booking || !booking.trip || !booking.trip.tripDestinations) {
        return <div>Loading...</div>;
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Thông tin Booking</DialogTitle>
                </DialogHeader>
                <div>
                    <p>
                        <strong>Booking ID:</strong> {booking.id}
                    </p>
                    <p>
                        <strong>Customer Name:</strong>{" "}
                        {booking.customer?.name || "N/A"}
                    </p>
                    <p>
                        <strong>Customer Email:</strong>{" "}
                        {booking.customer?.email || "N/A"}
                    </p>
                    <p>
                        <strong>Trip ID:</strong> {booking.trip?.id || "N/A"}
                    </p>
                    <p>
                        <strong>Start Date:</strong>{" "}
                        {booking.trip?.startDate || "N/A"}
                    </p>
                    <p>
                        <strong>End Date:</strong>{" "}
                        {booking.trip?.endDate || "N/A"}
                    </p>

                    {/* Hiển thị bảng Trip Destinations */}
                    <h3 className="mt-4">Trip Destinations</h3>
                    <table className="w-full mt-2 border">
                        <thead>
                            <tr>
                                <th className="border px-2 py-1">Farm Name</th>
                                <th className="border px-2 py-1">Address</th>
                                <th className="border px-2 py-1">
                                    Phone Number
                                </th>
                                <th className="border px-2 py-1">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {booking.trip.tripDestinations?.map(
                                (destination, index) => (
                                    <tr key={index}>
                                        <td className="border px-2 py-1">
                                            {destination.farm?.name || "N/A"}
                                        </td>
                                        <td className="border px-2 py-1">
                                            {destination.farm?.address || "N/A"}
                                        </td>
                                        <td className="border px-2 py-1">
                                            {destination.farm?.phoneNumber ||
                                                "N/A"}
                                        </td>
                                        <td className="border px-2 py-1">
                                            <button
                                                onClick={() =>
                                                    handleEditClick(destination)
                                                }
                                                className="bg-yellow-500 text-white px-3 py-2 rounded"
                                            >
                                                Chỉnh sửa
                                            </button>
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Hiển thị modal chỉnh sửa Trip Destination */}
                {selectedDestination && (
                    <EditTripDestinationModal
                        isOpen={isEditModalOpen}
                        onClose={() => setIsEditModalOpen(false)}
                        destination={selectedDestination}
                        onSave={(updatedDestination) => {
                            // Cập nhật thông tin điểm đến đã chỉnh sửa
                            const updatedDestinations =
                                booking.trip.tripDestinations.map((dest) =>
                                    dest.id === updatedDestination.id
                                        ? updatedDestination
                                        : dest
                                );
                            booking.trip.tripDestinations = updatedDestinations; // Cập nhật thông tin booking tại chỗ
                            setIsEditModalOpen(false); // Đóng modal
                        }}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
};

export default DetailModal;
