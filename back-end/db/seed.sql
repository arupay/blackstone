\c freedbone

INSERT INTO meeting_room (name, floor, capacity) VALUES
('Conference Room A', 1, 10),
('Board Room', 2, 15),
('Training Room', 1, 25),
('Briefing Room', 3, 8),
('Main Hall', 1, 50);


INSERT INTO booking (start_date, end_date, attendees, meeting_room_id) VALUES
('2023-10-28 10:00:00', '2023-10-28 11:00:00', 'john.doe@example.com', 1),
('2023-10-28 12:00:00', '2023-10-28 13:00:00', 'alice.smith@example.com;bob.jones@example.com', 2),
('2023-10-29 14:00:00', '2023-10-29 16:00:00', 'charlie.brown@example.com', 3),
('2023-10-30 09:00:00', '2023-10-30 10:30:00', 'eve.adams@example.com;dave.clark@example.com', 4),
('2023-10-30 17:00:00', '2023-10-30 18:30:00', 'frank.white@example.com', 5),
('2023-11-01 10:30:00', '2023-11-01 11:30:00', 'george.allen@example.com', 2),
('2023-11-02 14:00:00', '2023-11-02 15:30:00', 'helen.carter@example.com;ian.frank@example.com', 3),
('2023-11-03 09:15:00', '2023-11-03 10:45:00', 'jane.gray@example.com', 1),
('2023-11-04 12:45:00', '2023-11-04 14:15:00', 'kevin.hill@example.com;lucy.miller@example.com;nancy.owen@example.com', 5),
('2023-11-05 16:00:00', '2023-11-05 17:00:00', 'paul.parker@example.com', 4);
