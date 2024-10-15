import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "../../../components/ui/dialog";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "../../../components/ui/select";
const UpdateStatusModal = ({ isOpen, onClose, booking, onUpdate }) => {
    const [newStatus, setNewStatus] = useState(booking.status);

    const handleUpdate = () => {
        onUpdate(newStatus);
        onClose();
    };

    useEffect(() => {
        if (isOpen) {
            setNewStatus(booking.status);
        }
    }, [isOpen]);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Cập nhật trạng thái booking</DialogTitle>
                </DialogHeader>
                <div>
                    <p>
                        <strong>Booking ID:</strong> {booking.id}
                    </p>
                    <p>
                        <strong>Trạng thái hiện tại:</strong> {booking.status}
                    </p>

                    <label className="block mt-4">
                        Chọn trạng thái mới:
                        <Select
                            defaultValue="Chọn trạng thái"
                            value={newStatus}
                            onValueChange={setNewStatus}
                        >
                            <SelectTrigger className="w-full mt-2">
                                <SelectValue placeholder="Chọn trạng thái" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Pending">Pending</SelectItem>
                                <SelectItem value="In Progress">
                                    In Progress
                                </SelectItem>
                                <SelectItem value="Completed">
                                    Completed
                                </SelectItem>
                                <SelectItem value="Cancelled">
                                    Cancelled
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </label>

                    <div style={{ marginTop: "20px" }}>
                        <button
                            onClick={handleUpdate}
                            className="bg-green-500 text-white px-3 py-2 rounded"
                        >
                            Cập nhật
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateStatusModal;
