import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";
import { subDays } from "date-fns";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();
  //By default, display the last 7 days
  const numDays = searchParams.get("last") || 7;
  const queryDate = subDays(new Date(), numDays).toISOString();
  const { data: bookings, isLoading } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ["bookings", `last-${numDays}`],
  });
  return { bookings, isLoading };
}
