import { TbClockPlay, TbClockStop } from "react-icons/tb";
import { BsBuilding } from "react-icons/bs";
import { formatDate } from "../utilities/formatDate";
import { getMonthAbbreviation } from "../utilities/formatDate";
import { getDayOfWeekAbbreviation } from "../utilities/formatDate";
import { getDayOfMonth } from "../utilities/formatDate";

function BookingInfoCardLarge(props) {
  const { start_date, name, floor, end_date, meeting_name } = props.booking;
  const dayOfMonth = getDayOfMonth(start_date);
  const monthAbbreviation = getMonthAbbreviation(start_date);
  const weekdayAbrev = getDayOfWeekAbbreviation(start_date);
  console.log(props.booking);
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
        <h3>{meeting_name}</h3>
        <div className="text-none small text-muted">{name}</div>
        <div className="text-none small text-muted">
          <BsBuilding />
          {floor}
        </div>

        <div className="even-date">
          <div style={{ textTransform: "none", fontSize: "13px" }}>
            <TbClockPlay size="1.1em" style={{ marginRight: "10px" }} />
            Start: {formatDate(start_date)}
          </div>
          <div style={{ textTransform: "none", fontSize: "13px" }}>
            <TbClockStop size="1.1em" style={{ marginRight: "10px" }} />
            End: {formatDate(end_date)}
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
