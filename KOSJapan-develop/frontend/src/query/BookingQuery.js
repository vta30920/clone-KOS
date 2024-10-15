import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BaseQuery } from "./BaseQuery";

export function useGetBooking() {
    return useQuery({
        queryKey: ["booking/fetch_entity"],
        queryFn: () =>
            BaseQuery.Get(`/booking/sale-staff/AC0002`).then((res) => res.data),
    });
}
