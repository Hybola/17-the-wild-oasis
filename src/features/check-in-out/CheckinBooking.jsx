import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";
import { useState, useEffect } from "react";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useCheckin } from "./useCheckin";
import { useBooking } from "../bookings/useBooking";
import { useSettings } from "../settings/useSettings";
import Spinner from "../../ui/Spinner";
import { formatCurrency } from "../../utils/helpers";
const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { booking, isLoading } = useBooking();
  const { settings, isLoading: isLoadingSettings } = useSettings();
  const { checkin, isCheckingin } = useCheckin();
  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false);
  }, [booking]);
  const moveBack = useMoveBack();

  if (isLoading || isLoadingSettings) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
    status,
    isPaid,
  } = booking;

  const optionalBreakPrice = settings.breakfastPrice * numGuests * numNights;
  function handleCheckin() {
    if (!confirmPaid) return;
    if (addBreakfast)
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakPrice,
          totalPrice: totalPrice + optionalBreakPrice,
        },
      });
    else checkin({ bookingId, breakfast: {} });
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            disabled={isCheckingin}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
            id="addBreakfast">
            Want to add breakfast for
            {formatCurrency(optionalBreakPrice)}
          </Checkbox>
        </Box>
      )}
      <Box>
        <Checkbox
          disabled={(isPaid && !addBreakfast) || isCheckingin}
          checked={confirmPaid || (isPaid && !addBreakfast)}
          onChange={() => {
            setConfirmPaid((confirm) => !confirm);
          }}
          id="confirm">
          i confirm that {guests.fullName} has paid the total amount
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalBreakPrice
              )}(${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakPrice
              )})`}
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button
          onClick={handleCheckin}
          disabled={!confirmPaid || isCheckingin || status === "checked-in"}>
          {status === "checked-in"
            ? "Already checked in"
            : `Check in booking #${bookingId}`}
        </Button>

        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
