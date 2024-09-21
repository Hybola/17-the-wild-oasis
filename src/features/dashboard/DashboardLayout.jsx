import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;
function DashboardLayout() {
  const { bookings, isLoading1 } = useRecentBookings();
  const { stays, confirmedStays, isLoading2 } = useRecentStays();
  if (isLoading1 || isLoading2) return <Spinner />;
  console.log(bookings);
  return (
    <StyledDashboardLayout>
      <div>Statistic</div>
      <div>Today activitis</div>
      <div>Chart stay durations</div>
      <div>Chart sales</div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
