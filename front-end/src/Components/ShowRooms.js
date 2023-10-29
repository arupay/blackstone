import React from 'react';
import { BsPeople, BsBuilding} from "react-icons/bs";

function ShowRooms(props) {
    const { rooms } = props;

    return (
        <div className="mt-3" >
            {rooms.map(room => (
                <div key={room.id} className="card mb-2 room-card">
                  <div className="card-body">
                       <h5 className="card-title">{room.name}</h5>
                        <div className="d-flex align-items-center mb-2">
                            <BsPeople size="2em"/>
                            <span className="mx-2">Capacity: {room.capacity}</span>
                        </div>
                        <div className="d-flex align-items-center">
                            <BsBuilding size="2em"/>
                            <span className="mx-2">Floor: {room.floor}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ShowRooms;
