import { Row, Col } from "react-bootstrap";
import { BsPeople, BsBuilding } from "react-icons/bs";

function MeetingRoomInfoBar(props) {
  const { name, floor, capacity } = props.roomInfo;

  return (
    <Row className="align-items-center justify-content-around">
      <Col xs="auto">
        <h5>{name}</h5>
      </Col>
      <Col xs="auto">
        <BsBuilding size="2em" />
        <span className="mx-2">Capacity: {capacity}</span>
      </Col>
      <Col xs="auto">
        <BsPeople size="2em" />
        <span className="mx-2">Floor: {floor}</span>
      </Col>
    </Row>
  );
}

export default MeetingRoomInfoBar;
