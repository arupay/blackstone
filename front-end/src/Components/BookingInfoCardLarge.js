import { TbClockPlay, TbClockStop } from "react-icons/tb";
import { BsBuilding } from "react-icons/bs";
import { formatDate } from "../utilities/formatDate";
import { getMonthAbbreviation } from "../utilities/formatDate";
import { getDayOfWeekAbbreviation } from "../utilities/formatDate";
import { getDayOfMonth } from "../utilities/formatDate";
import { useNavigate } from "react-router-dom";

function BookingInfoCardLarge(props) {
  const navigate = useNavigate();
  const { booking } = props;
  const dayOfMonth = getDayOfMonth(booking.start_date);
  const monthAbbreviation = getMonthAbbreviation(booking.start_date);
  const weekdayAbrev = getDayOfWeekAbbreviation(booking.start_date);
  console.log(booking);
  return (
    <article className="bkcard fl-left" style={{ maxWidth: "800px" }}>
      <section className="bkdate">
        <time>
          <span className="bkdate-weekday">{weekdayAbrev}</span>
          <span className="bkdate-day">{dayOfMonth}</span>
          <span className="bkdate-month">{monthAbbreviation}</span>
        </time>
      </section>
      <section className="bkcard-cont">
        <h3>{booking.meeting_name}</h3>
        <div className="text-none small text-muted">{booking.name}</div>
        <div className="text-none small text-muted">
          <BsBuilding />
          {booking.floor}
        </div>

        <div className="even-date">
          <div style={{ textTransform: "none", fontSize: "13px" }}>
            <TbClockPlay size="1.1em" style={{ marginRight: "10px" }} />
            Start: {formatDate(booking.start_date)}
          </div>
          <div style={{ textTransform: "none", fontSize: "13px" }}>
            <TbClockStop size="1.1em" style={{ marginRight: "10px" }} />
            End: {formatDate(booking.end_date)}
          </div>
        </div>
      </section>
    </article>
  );
}

export default BookingInfoCardLarge;

/** <div className="mt-3">
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
    </div> */
