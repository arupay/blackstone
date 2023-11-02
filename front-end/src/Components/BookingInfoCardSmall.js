import { TbClockPlay, TbClockStop } from "react-icons/tb";
import { formatDate } from "../utilities/formatDate";
import { useNavigate } from "react-router-dom";

function BookingInfoCardSmall(props) {
  const { meeting } = props;
  const navigate = useNavigate();

  return (
    <div className="mt-3">
      <div
        className="card mb-2 room-card"
        onClick={() => navigate(`/bookings/${meeting.id}`)}
      >
        <div className="card-body">
          <h5 className="card-title">{meeting.meeting_name}</h5>
          <div className="d-flex align-items-center mb-2">
            <TbClockPlay size="2em" />
            <span className="mx-2">
              Start Time: {formatDate(meeting.start_date)}
            </span>
          </div>
          <div className="d-flex align-items-center">
            <TbClockStop size="2em" />
            <span className="mx-2">
              End Time: {formatDate(meeting.end_date)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BookingInfoCardSmall;
