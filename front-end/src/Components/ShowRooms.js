import React from "react";
import { BsPeople, BsBuilding } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Container, Card, Row } from "react-bootstrap";
import "./ShowRooms.scss";
import meetingroom from "../assets/stockmeetingroom.webp";

function ShowRooms(props) {
  const { rooms } = props;
  const navigate = useNavigate();
  return (
    <Container className="truckindex mt-4">
      <Row>
        {rooms && rooms.length
          ? rooms.map((room) => (
              <div className="sm-12 col-md-6 col-lg-4 mb-3" key={room.id}>
                <Card
                  className="backgroundimg"
                  style={{
                    backgroundImage: `url(${meetingroom})`,
                  }}
                >
                  <div
                    className="card-img-overlay"
                    onClick={() => navigate(`/meetingrooms/${room.id}`)}
                  >
                    <Card.Body>
                      <Card.Title className="backgroundimg__trucktitle">
                        {room.name}
                      </Card.Title>
                      <Card.Text tag="div" style={{ fontSize: "16px" }}>
                        <BsPeople size="2em" />
                        <span className="mx-2">
                          Capacity: {room.capacity} Max
                        </span>
                      </Card.Text>
                      <Card.Text tag="div" style={{ fontSize: "16px" }}>
                        <BsBuilding size="2em" />
                        <span className="mx-2">Floor: {room.floor}</span>
                      </Card.Text>
                    </Card.Body>
                  </div>
                </Card>
              </div>
            ))
          : "No Rooms To map"}
      </Row>
    </Container>
  );
}

export default ShowRooms;
