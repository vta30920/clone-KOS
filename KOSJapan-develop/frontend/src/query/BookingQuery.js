import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8082/api/";

export function useGetBooking() {
    return useQuery({
        queryKey: ["booking/fetch_entity"],
        queryFn: () =>
            axios.get(`/booking/sale-staff/AC0002`).then((res) => res.data),
    });
}

export function useGetConsultingBooking() {
    return useQuery({
        queryKey: ["booking/consulting_staff"],
        queryFn: () =>
            axios
                .get(`/booking/consulting-staff/AC0004`)
                .then((res) => res.data),
    });
}
