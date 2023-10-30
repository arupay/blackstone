import { TbClockPlay, TbClockStop } from "react-icons/tb";
import { BsBuilding } from "react-icons/bs";
import formatDate from "../utilities/formatDate";
import { useNavigate } from "react-router-dom";

function BookingInfoCardLarge(props) {
  const navigate = useNavigate();
  const { booking } = props;
  return (
    <div className="mt-3">
      <div
        className="card mb-2 room-card"
        onClick={() => navigate(`/bookings/${booking.id}`)}
      >
        <div className="card-body">
          <h4 className="card-title mb-3">{booking.meeting_name} </h4>
          <h6 className=" mb-2">{booking.name} </h6>
          <div className="d-flex align-items-center mb-2">
            <TbClockPlay size="2em" />
            <span className="mx-2">
              Start Time: {formatDate(booking.start_date)}
            </span>
          </div>
          <div className="d-flex align-items-center  mb-2">
            <TbClockStop size="2em" />
            <span className="mx-2">
              End Time: {formatDate(booking.end_date)}
            </span>
          </div>
          <div className="d-flex align-items-center  mb-2">
            <BsBuilding size="2em" />
            <span className="mx-2">Floor: {booking.floor}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingInfoCardLarge;
