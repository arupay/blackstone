\c blackstone;

INSERT INTO meeting_room (name, floor, capacity) VALUES
('Conference Room A', 1, 10),
('Board Room', 2, 15),
('Training Room', 1, 25),
('Briefing Room', 3, 8),
('Main Hall', 1, 50);


INSERT INTO booking (start_date, end_date, attendees, meeting_name, meeting_room_id) VALUES
('2023-11-01 10:00:00 UTC', '2023-11-01 11:00:00 UTC', 'john.doe@example.com', 'Project Kickoff', 1),
('2023-11-02 12:00:00 UTC', '2023-11-02 13:00:00 UTC', 'alice.smith@example.com;bob.jones@example.com', 'Board Review', 2),
('2023-11-03 14:00:00 UTC', '2023-11-03 16:00:00 UTC', 'charlie.brown@example.com', 'Design Discussion', 3),
('2023-11-04 09:00:00 UTC', '2023-11-04 10:30:00 UTC', 'eve.adams@example.com;dave.clark@example.com', 'Team Sync-up', 4),
('2023-11-05 17:00:00 UTC', '2023-11-05 18:30:00 UTC', 'frank.white@example.com', 'Training Session', 5),
('2023-11-06 10:30:00 UTC', '2023-11-06 11:30:00 UTC', 'george.allen@example.com', 'Sales Review', 2),
('2023-11-07 14:00:00 UTC', '2023-11-07 15:30:00 UTC', 'helen.carter@example.com;ian.frank@example.com', 'New Product Launch', 3),
('2023-11-08 09:15:00 UTC', '2023-11-08 10:45:00 UTC', 'jane.gray@example.com', 'Client Presentation', 1),
('2023-11-09 12:45:00 UTC', '2023-11-09 14:15:00 UTC', 'kevin.hill@example.com;lucy.miller@example.com;nancy.owen@example.com', 'Q&A Session', 5),
('2023-11-10 16:00:00 UTC', '2023-11-10 17:00:00 UTC', 'paul.parker@example.com', 'Software Demo', 4);
