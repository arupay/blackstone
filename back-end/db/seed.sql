\c blackstone;
INSERT INTO users (email) VALUES
('admin@gmail.com'),
('joe@gmail.com'),
('mike@gmail.com');

INSERT INTO meeting_room (name, floor, capacity) VALUES
('Conference Room A', 1, 10),
('Board Room', 2, 15),
('Training Room', 1, 25),
('Briefing Room', 3, 8),
('Main Hall', 1, 50);

-- Seed data with backdated 'created_on' timestamps
INSERT INTO booking (start_date, end_date, attendees, meeting_name, meeting_room_id, created_on) VALUES
('2023-11-01 10:00:00+00', '2023-11-01 11:00:00+00', 'john.doe@example.com', 'Project Kickoff', 1, '2023-11-01 08:00:00+00'),
('2023-11-02 12:00:00+00', '2023-11-02 13:00:00+00', 'alice.smith@example.com;bob.jones@example.com', 'Board Review', 2, '2023-11-01 08:30:00+00'),
('2023-11-03 14:00:00+00', '2023-11-03 16:00:00+00', 'charlie.brown@example.com', 'Design Discussion', 3, '2023-11-01 09:00:00+00'),
('2023-11-04 09:00:00+00', '2023-11-04 10:30:00+00', 'eve.adams@example.com;dave.clark@example.com', 'Team Sync-up', 4, '2023-11-01 09:30:00+00'),
('2023-11-05 17:00:00+00', '2023-11-05 18:30:00+00', 'frank.white@example.com', 'Training Session', 5, '2023-11-01 10:00:00+00'),
('2023-11-06 10:30:00+00', '2023-11-06 11:30:00+00', 'george.allen@example.com', 'Sales Review', 2, '2023-11-02 10:30:00+00'),
('2023-11-07 14:00:00+00', '2023-11-07 15:30:00+00', 'helen.carter@example.com;ian.frank@example.com', 'New Product Launch', 3, '2023-11-02 11:00:00+00'),
('2023-11-08 09:15:00+00', '2023-11-08 10:45:00+00', 'jane.gray@example.com', 'Client Presentation', 1, '2023-11-02 11:30:00+00'),
('2023-11-09 12:45:00+00', '2023-11-09 14:15:00+00', 'kevin.hill@example.com;lucy.miller@example.com;nancy.owen@example.com', 'Q&A Session', 5, '2023-11-01 12:00:00+00'),
('2023-11-10 16:00:00+00', '2023-11-10 17:00:00+00', 'paul.parker@example.com', 'Software Demo', 4, '2023-11-01 12:30:00+00'),
('2023-10-28 09:00:00+00', '2023-10-28 10:30:00+00', 'olivia.jackson@example.com', 'Weekly Review', 1, '2023-11-01 13:00:00+00'),
('2023-10-29 11:00:00+00', '2023-10-29 12:00:00+00', 'liam.johnson@example.com', 'Product Planning', 2, '2023-11-01 13:30:00+00'),
('2023-10-30 13:00:00+00', '2023-10-30 14:30:00+00', 'emma.wilson@example.com', 'Marketing Strategy', 3, '2023-11-01 14:00:00+00'),
('2023-10-31 15:00:00+00', '2023-10-31 16:00:00+00', 'noah.miller@example.com', 'Financial Review', 4, '2023-11-01 14:30:00+00'),
('2023-11-01 10:00:00+00', '2023-11-01 11:30:00+00', 'ava.smith@example.com', 'IT Infrastructure Update', 5, '2023-11-01 15:00:00+00');