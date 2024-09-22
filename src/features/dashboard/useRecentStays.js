import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";
import { subDays } from "date-fns";

export function useRecentStays() {
  const [searchParams] = useSearchParams();
  //By default, display the last 7 days
  const numDays = searchParams.get("last") || 7;
  const queryDate = subDays(new Date(), numDays).toISOString();
  const { data: stays, isLoading } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ["stays", `last-${numDays}`],
  });
  const confirmedStays = stays?.filter(
    (stay) => stay.status === "checked-in" || stays.status === "checked-out"
  );

  return { stays, confirmedStays, isLoading, numDays };
}
