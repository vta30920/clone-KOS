import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "../../../components/ui/dialog";

const EditTripDestinationModal = ({ isOpen, onClose, destination, onSave }) => {
    const [formData, setFormData] = useState(destination);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            farm: {
                ...formData.farm,
                [name]: value,
            },
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData); // Gọi hàm lưu điểm đến đã chỉnh sửa
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Chỉnh sửa điểm đến</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">
                            Farm Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.farm.name || ""}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">
                            Address
                        </label>
                        <input
                            type="text"
                            name="address"
                            value={formData.farm.address || ""}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.farm.phoneNumber || ""}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Lưu thay đổi
                    </button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditTripDestinationModal;
