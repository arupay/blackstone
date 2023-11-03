import { TbClockPlay, TbClockStop } from "react-icons/tb";
import { formatDate } from "../utilities/formatDate";
import { getMonthAbbreviation } from "../utilities/formatDate";
import { getDayOfWeekAbbreviation } from "../utilities/formatDate";
import { getDayOfMonth } from "../utilities/formatDate";
import { useNavigate } from "react-router-dom";
import "./BookingInfoCardSmall.scss";

function BookingInfoCardSmall(props) {
  const { meeting } = props;
  const navigate = useNavigate();

  const dayOfMonth = getDayOfMonth(meeting.start_date);
  const monthAbbreviation = getMonthAbbreviation(meeting.start_date);
  const weekdayAbrev = getDayOfWeekAbbreviation(meeting.start_date);

  return (
    <article className="bkcard fl-left">
      <section className="bkdate">
        <time>
          <span className="bkdate-weekday">{weekdayAbrev}</span>
          <span className="bkdate-day">{dayOfMonth}</span>
          <span className="bkdate-month">{monthAbbreviation}</span>
        </time>
      </section>
      <section className="bkcard-cont">
        <h3 style={{ paddingBottom: "10px" }}>{meeting.meeting_name}</h3>
        <div className="even-date">
          <time>
            <span>
              <TbClockPlay size="1.5em" />
              {"   "}
              Start: {formatDate(meeting.start_date)}
            </span>
            <span>
              <TbClockStop size="1.5em" />
              {"   "}
              End: {formatDate(meeting.end_date)}
            </span>
          </time>
        </div>
        <div
          onClick={() => navigate(`/bookings/${meeting.id}`)}
          className="even-info"
        >
          View
        </div>
      </section>
    </article>
  );
}
export default BookingInfoCardSmall;
