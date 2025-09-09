-- Insert sample trains
INSERT INTO train (train_name, source, destination, departure_time, arrival_time, seats_available, price) VALUES
('Express 101', 'New York', 'Boston', '08:00', '12:00', 45, 89.99),
('Metro 202', 'Boston', 'Washington DC', '14:30', '20:15', 32, 125.50),
('Coast Runner 303', 'Los Angeles', 'San Francisco', '07:45', '15:20', 28, 110.75),
('Mountain Express 404', 'Denver', 'Salt Lake City', '16:00', '22:30', 55, 95.25),
('Desert Wind 505', 'Phoenix', 'Las Vegas', '10:15', '15:45', 40, 75.00),
('City Connect 606', 'Chicago', 'Detroit', '09:30', '14:45', 60, 68.50),
('Coastal Express 707', 'Seattle', 'Portland', '11:00', '14:30', 35, 52.75);

-- Insert sample customers (passwords are BCrypt encoded for 'password123', 'password456', 'password789')
INSERT INTO customer (name, email, phone_number, password) VALUES
('John Doe', 'john@example.com', '555-0123', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iYqiSfFDYZZ5Ik6UzO6tRcKzAeyC'),
('Jane Smith', 'jane@example.com', '555-0456', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.'),
('Bob Johnson', 'bob@example.com', '555-0789', '$2a$10$fFLij9aI9pzKwwNF8o1.AuVZmcESqZAfU4OrgAn0X8kJbBXt8ykji'),
('Alice Brown', 'alice@example.com', '555-0321', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iYqiSfFDYZZ5Ik6UzO6tRcKzAeyC'),
('Charlie Wilson', 'charlie@example.com', '555-0654', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.');