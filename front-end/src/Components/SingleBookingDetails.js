import { TbClockPlay, TbClockStop } from "react-icons/tb";
import { BsBuilding } from "react-icons/bs";
import { Button } from "react-bootstrap";
import formatDate from "../utilities/formatDate";

function SingleBookingDetails(props) {
  const { meetingDetails } = props;
  return (
    <div className="mt-3">
      <div className="card mb-2 room-card">
        <div className="card-body">
          <h4 className="card-title mb-4">{meetingDetails.meeting_name} </h4>
          <div className="d-flex align-items-center mb-2">
            <TbClockPlay size="2em" />
            <span className="mx-2">
              Start Time: {formatDate(meetingDetails.start_date)}
            </span>
          </div>
          <div className="d-flex align-items-center  mb-2">
            <TbClockStop size="2em" />
            <span className="mx-2">
              End Time: {formatDate(meetingDetails.end_date)}
            </span>
          </div>
          <div className="d-flex align-items-center  mb-2">
            <BsBuilding size="2em" />
            <span className="mx-2">Floor: {meetingDetails.floor}</span>
          </div>
          <Button variant="danger">Cancel</Button>
        </div>
      </div>
    </div>
  );
}
export default SingleBookingDetails;
