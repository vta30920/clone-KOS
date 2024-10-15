import { format, parseISO } from "date-fns";

export const convertTime = (isoString) => {
    try {
        const parsedDate = parseISO(isoString); // Chuyển chuỗi ISO thành đối tượng Date
        return format(parsedDate, "dd/MM/yyyy HH:mm:ss");
    } catch (error) {
        console.error("Failed to convert time:", error);
        return "Invalid Date";
    }
};
