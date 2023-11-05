import { TbClockPlay, TbClockStop } from "react-icons/tb";
import { formatDate } from "../utilities/formatDate";
import { getMonthAbbreviation } from "../utilities/formatDate";
import { getDayOfWeekAbbreviation } from "../utilities/formatDate";
import { getDayOfMonth } from "../utilities/formatDate";
import "./BookingInfoCardSmall.scss";
import { useState } from "react";
import Modal from "react-modal";
import BookingInfoCardLarge from "./BookingInfoCardLarge";
import { WiStars } from "react-icons/wi";

function BookingInfoCardSmall(props) {
  const { meeting, isMostRecent } = props;
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  const dayOfMonth = getDayOfMonth(meeting.start_date);
  const monthAbbreviation = getMonthAbbreviation(meeting.start_date);
  const weekdayAbrev = getDayOfWeekAbbreviation(meeting.start_date);
  //GALLERY MODAL LOGIC
  Modal.setAppElement("#root");
  function openMeetingModal() {
    document.body.style.overflow = "hidden"; // Disable scroll
    setIsMeetingModalOpen(true);
  }
  function afterOpenModal() {}
  function closeMeetingModal() {
    document.body.style.overflow = "visible"; // Disable scroll
    setIsMeetingModalOpen(false);
  }

  const modalStyles = {
    overlay: {
      position: "fixed",
      zIndex: 1020,
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(50, 50, 50, .9)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    content: {
      background: "white",
      width: "50rem",
      maxWidth: "calc(100vw)",
      maxHeight: "calc(100vh)",
      overflowY: "auto",
      position: "relative",
      border: "1px solid #ccc",
      borderRadius: "1rem",
    },
  };

  return (
    <article className="bkcard fl-left">
      {isMostRecent && (
        <div className="recent-ribbon ">
          <div className="recent-ribbon__text">New</div>
          <WiStars size="2.5em" />
        </div>
      )}

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
        <div onClick={openMeetingModal} className="even-info">
          View
        </div>
      </section>
      <Modal
        isOpen={isMeetingModalOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeMeetingModal}
        className={`shadow p-4`}
        style={modalStyles}
      >
        <BookingInfoCardLarge booking={meeting} />
      </Modal>
    </article>
  );
}
export default BookingInfoCardSmall;
