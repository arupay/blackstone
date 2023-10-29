import BookRoomForm from "../Components/BookRoomForm";
import { Container, Row, Col } from "react-bootstrap";

function SingleMeetingRoom(props) {
  return (
    <Container className="mt-4">
      <Row className="align-items-center justify-content-between">
        <Col xs="auto">
          <h3>Boardroom 2</h3>
        </Col>
        <Col xs="auto">
          <h6>
            <span className="mr-2">👥</span>Capacity: 10
          </h6>
        </Col>
        <Col xs="auto">
          <h6>
            <span className="mr-2">🏢</span>Floor: floor
          </h6>
        </Col>
      </Row>
      <BookRoomForm />
    </Container>
  );
}

export default SingleMeetingRoom;
