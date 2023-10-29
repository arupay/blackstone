CREATE TABLE meeting_room (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    floor INT NOT NULL,
    capacity INT NOT NULL
);

CREATE TABLE booking (
    id SERIAL PRIMARY KEY,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    attendees VARCHAR(255) NOT NULL,
    meeting_room_id INT REFERENCES meeting_room(id) ON DELETE CASCADE
);
