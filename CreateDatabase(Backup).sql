CREATE TABLE accounts (
    id VARCHAR(50) PRIMARY KEY NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    role VARCHAR(20) NOT NULL,
	email VARCHAR(255) UNIQUE,
    phone VARCHAR(20),
    address VARCHAR(255),
    profile_image VARCHAR(255),
    is_deleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE farms (
    id VARCHAR(50) PRIMARY KEY NOT NULL,
    name VARCHAR(255),
    address VARCHAR(255),
    phone_number VARCHAR(20),
    image VARCHAR(255),
    is_deleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE varieties (
    id VARCHAR(50) PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255),
    is_deleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE payment_methods (
    id VARCHAR(50) PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL UNIQUE,
	is_deleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE trips (
    id VARCHAR(50) PRIMARY KEY NOT NULL,
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    departure_airport VARCHAR(50),
    price DOUBLE PRECISION,
    status VARCHAR(255),
    is_deleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE fishes (
    id VARCHAR(50) PRIMARY KEY NOT NULL,
    variety_id VARCHAR(50) NOT NULL,
    length DOUBLE PRECISION,
    weight DOUBLE PRECISION,
    description VARCHAR(255),
    is_deleted BOOLEAN DEFAULT FALSE,
    CONSTRAINT fk_variety_id FOREIGN KEY (variety_id) REFERENCES varieties(id)
);

CREATE TABLE fish_packs (
    id VARCHAR(50) PRIMARY KEY NOT NULL,
    length VARCHAR(100),
    weight VARCHAR(100),
    description VARCHAR(255),
    quantity INT,
    is_deleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE bookings (
    id VARCHAR(50) PRIMARY KEY NOT NULL,
    customer_id VARCHAR(50) NOT NULL,
    trip_id VARCHAR(50),
    description TEXT,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50),
    sale_staff_id VARCHAR(50),
    consulting_staff_id VARCHAR(50),
    delivery_staff_id VARCHAR(50),
    is_deleted BOOLEAN DEFAULT FALSE,
    CONSTRAINT fk_customer_id FOREIGN KEY (customer_id) REFERENCES accounts(id),
    CONSTRAINT fk_trip_id FOREIGN KEY (trip_id) REFERENCES trips(id),
    CONSTRAINT fk_sale_staff_id FOREIGN KEY (sale_staff_id) REFERENCES accounts(id),
    CONSTRAINT fk_consulting_staff_id FOREIGN KEY (consulting_staff_id) REFERENCES accounts(id),
    CONSTRAINT fk_delivery_staff_id FOREIGN KEY (delivery_staff_id) REFERENCES accounts(id)
);

CREATE TABLE fish_orders (
    id VARCHAR(50) PRIMARY KEY NOT NULL,
    booking_id VARCHAR(50) NOT NULL,
    farm_id VARCHAR(50) NOT NULL,
    delivery_address VARCHAR(255),
    total DOUBLE PRECISION,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    arrived_date TIMESTAMP,
    status VARCHAR(50),
    is_deleted BOOLEAN DEFAULT FALSE,
    CONSTRAINT fk_booking_id FOREIGN KEY (booking_id) REFERENCES bookings(id),
    CONSTRAINT fk_farm_id FOREIGN KEY (farm_id) REFERENCES farms(id)
);

CREATE TABLE fish_order_details (
    id VARCHAR(50) PRIMARY KEY NOT NULL,
    fish_order_id VARCHAR(50) NOT NULL,
    fish_id VARCHAR(50) NOT NULL,
    price DOUBLE PRECISION,
	is_deleted BOOLEAN DEFAULT FALSE,
    CONSTRAINT fk_fish_order_id FOREIGN KEY (fish_order_id) REFERENCES fish_orders(id),
    CONSTRAINT fk_fish_id FOREIGN KEY (fish_id) REFERENCES fishes(id)
);

CREATE TABLE fish_pack_order_details (
    id VARCHAR(50) PRIMARY KEY NOT NULL,
    fish_order_id VARCHAR(50) NOT NULL,
    fish_pack_id VARCHAR(50) NOT NULL,
    price DOUBLE PRECISION,
	is_deleted BOOLEAN DEFAULT FALSE,
    CONSTRAINT fk_fish_order_id FOREIGN KEY (fish_order_id) REFERENCES fish_orders(id),
    CONSTRAINT fk_fish_pack_id FOREIGN KEY (fish_pack_id) REFERENCES fish_packs(id)
);

CREATE TABLE fish_payments (
    id VARCHAR(50) PRIMARY KEY NOT NULL,
    fish_order_id VARCHAR(50) NOT NULL,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_method_id VARCHAR(50) NOT NULL,
    amount DOUBLE PRECISION,
    status BOOLEAN,
    is_deleted BOOLEAN DEFAULT FALSE,
    CONSTRAINT fk_fish_order_id FOREIGN KEY (fish_order_id) REFERENCES fish_orders(id),
    CONSTRAINT fk_payment_method_id FOREIGN KEY (payment_method_id) REFERENCES payment_methods(id)
);

CREATE TABLE trip_payments (
    id VARCHAR(50) PRIMARY KEY NOT NULL,
    booking_id VARCHAR(50) NOT NULL,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_method_id VARCHAR(50),
    amount DOUBLE PRECISION,
    status BOOLEAN,
    is_deleted BOOLEAN DEFAULT FALSE,
    CONSTRAINT fk_booking_id FOREIGN KEY (booking_id) REFERENCES bookings(id),
    CONSTRAINT fk_payment_method_id FOREIGN KEY (payment_method_id) REFERENCES payment_methods(id)
);

CREATE TABLE farm_varieties (
    farm_id VARCHAR(50),
    variety_id VARCHAR(50),
    PRIMARY KEY (farm_id, variety_id),
    CONSTRAINT fk_farm_id FOREIGN KEY (farm_id) REFERENCES farms(id),
    CONSTRAINT fk_variety_id FOREIGN KEY (variety_id) REFERENCES varieties(id)
);

CREATE TABLE trip_destinations (
    id VARCHAR(50) PRIMARY KEY NOT NULL,
    trip_id VARCHAR(50) NOT NULL,
    farm_id VARCHAR(50) NOT NULL,
    visit_date TIMESTAMP,
	description TEXT,
    is_deleted BOOLEAN DEFAULT FALSE,
    CONSTRAINT fk_trip_id FOREIGN KEY (trip_id) REFERENCES trips(id),
    CONSTRAINT fk_farm_id FOREIGN KEY (farm_id) REFERENCES farms(id)
);

CREATE TABLE medias (
    id VARCHAR(50) PRIMARY KEY,
    url VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    is_deleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE fish_medias (
    media_id VARCHAR(50),
    fish_id VARCHAR(50),
    PRIMARY KEY (media_id, fish_id),
    CONSTRAINT fk_media_id FOREIGN KEY (media_id) REFERENCES medias(id),
    CONSTRAINT fk_fish_id FOREIGN KEY (fish_id) REFERENCES fishes(id)
);

CREATE TABLE fish_pack_medias (
    media_id VARCHAR(50),
    fish_pack_id VARCHAR(50),
    PRIMARY KEY (media_id, fish_pack_id),
    CONSTRAINT fk_media_id FOREIGN KEY (media_id) REFERENCES medias(id),
    CONSTRAINT fk_fish_pack_id FOREIGN KEY (fish_pack_id) REFERENCES fish_packs(id)
);

ALTER TABLE fishes 
ADD COLUMN fish_pack_id VARCHAR(50),
ADD CONSTRAINT fk_fish_pack_id FOREIGN KEY (fish_pack_id) REFERENCES fish_packs(id);

UPDATE trips
SET status = CASE
    WHEN id = 'TR0001' THEN 'Completed'
    WHEN id = 'TR0002' THEN 'Canceled'
    WHEN id = 'TR0003' THEN 'On-Going'
    WHEN id = 'TR0004' THEN 'Pending Quota'
END
WHERE id IN ('TR0001', 'TR0002', 'TR0003', 'TR0004');


UPDATE bookings
SET status = CASE
    WHEN id = 'BO0001' THEN 'Completed'
    WHEN id = 'BO0002' THEN 'Canceled'
    WHEN id = 'BO0003' THEN 'On-Going'
    WHEN id = 'BO0004' THEN 'Pending Quota'
    WHEN id = 'BO0005' THEN 'Request'
END
WHERE id IN ('BO0001', 'BO0002', 'BO0003', 'BO0004', 'BO0005');

-- Insert into table
INSERT INTO accounts (
    id, email, password, name, role, phone, address, profile_image, is_deleted
) VALUES 
    ('AC0001', 'customer@test.com', '12345', 'Nguyen Van A', 'Customer', NULL, NULL, NULL, FALSE),
    ('AC0002', 'salestaff@test.com', '12345', 'Nguyen Van B', 'Sale Staff', NULL, NULL, NULL, FALSE),
    ('AC0003', 'deliverystaff@test.com', '12345', 'Nguyen Van C', 'Delivery Staff', NULL, NULL, NULL, FALSE),
    ('AC0004', 'consultingstaff@test.com', '12345', 'Nguyen Van D', 'Consulting Staff', NULL, NULL, NULL, FALSE),
    ('AC0005', 'manager@test.com', '12345', 'Nguyen Van E', 'Manager', NULL, NULL, NULL, FALSE),
    ('AC0006', 'annguyen@gmail.com', '12345', 'Nguyen An', 'Customer', NULL, NULL, NULL, FALSE),
    ('AC0007', 'tuananh123@gmail.com', '23940', 'Tran Anh Tuan', 'Customer', NULL, NULL, NULL, FALSE);


INSERT INTO payment_methods (
    id, name, is_deleted
) VALUES
    ('PM0001', 'Cash', FALSE),
    ('PM0002', 'Card', FALSE);


INSERT INTO farms (id, name, address, phone_number, image, is_deleted)
VALUES
    ('FA0001', 'Dainichi Koi Farm', '123 Koi Street, Ojiya, Niigata, Japan', '0258945678', NULL, FALSE),
    ('FA0002', 'Marudo Koi Farm', '456 Nishikigoi Lane, Ojiya, Niigata, Japan', '0258123456', NULL, FALSE),
    ('FA0003', 'Momotaro Koi Farm', '789 Sakura Hill, Okayama, Japan', '0862712345', NULL, FALSE),
    ('FA0004', 'Shintaro Koi Farm', '101 Fuji Road, Niigata, Japan', '0258765432', NULL, FALSE),
    ('FA0005', 'Sakai Fish Farm', '202 Koi Avenue, Hiroshima, Japan', '0823123456', NULL, FALSE);


INSERT INTO varieties (id, name, description, is_deleted)
VALUES
    ('VA0001', 'Kohaku', 'White body with red patterns, one of the most popular Koi varieties.', FALSE),
    ('VA0002', 'Sanke', 'Similar to Kohaku but with additional black markings.', FALSE),
    ('VA0003', 'Showa', 'Black body with red and white markings.', FALSE),
    ('VA0004', 'Asagi', 'Light blue body with red markings on the belly and fins.', FALSE),
    ('VA0005', 'Shusui', 'Scaleless version of Asagi with similar colors.', FALSE);



INSERT INTO trips (id, start_date, end_date, departure_airport, price, status, is_deleted)
VALUES
    -- Delivered trips
    ('TR0001', '2024-09-02 08:00:00', '2024-09-05 17:00:00', 'SGN', 500.00, 'Completed', FALSE),
    ('TR0002', '2024-09-11 08:00:00', '2024-09-14 17:00:00', 'SGN', 600.00, 'Completed', FALSE),
    
    -- Ongoing trips
    ('TR0003', '2024-09-16 08:00:00', '2024-09-18 17:00:00', 'SGN', 550.00, 'On-Going', FALSE),
    ('TR0004', '2024-09-21 08:00:00', '2024-09-24 17:00:00', 'SGN', 700.00, 'On-Going', FALSE);



INSERT INTO bookings (
    id, customer_id, trip_id, description, create_at, status, sale_staff_id, consulting_staff_id, delivery_staff_id, is_deleted
) VALUES
    -- Bookings with Delivered status
    ('BO0001', 'AC0001', 'TR0001', 'Looking to buy Kohaku, Sanke, Showa breeds.', '2024-09-01 10:00:00', 'Delivered', 'AC0002', 'AC0004', 'AC0003', FALSE),
    ('BO0002', 'AC0007', 'TR0002', 'Looking to buy Asagi, Shusui breeds.', '2024-09-10 12:00:00', 'Delivered', 'AC0002', 'AC0004', 'AC0003', FALSE),
    
    -- Bookings with Ongoing status
    ('BO0003', 'AC0006', 'TR0003', 'Looking to buy Sanke, Kohaku breeds.', '2024-09-15 14:00:00', 'On-Going', 'AC0002', 'AC0004', NULL, FALSE),
    ('BO0004', 'AC0007', 'TR0004', 'Looking to buy Showa, Asagi breeds.', '2024-09-20 09:30:00', 'On-Going', 'AC0002', 'AC0004', NULL, FALSE),
    
    -- Booking with Requested status (trip_id is NULL)
    ('BO0005', 'AC0001', NULL, 'Looking to buy Kohaku, Shusui breeds.', '2024-09-25 11:00:00', 'Requested', NULL, NULL, NULL, FALSE);

	-- Inserting into the farm_varieties table
INSERT INTO farm_varieties (farm_id, variety_id)
VALUES
    -- Dainichi Koi Farm offers Kohaku and Sanke
    ('FA0001', 'VA0001'), -- Kohaku
    ('FA0001', 'VA0002'), -- Sanke
    
    -- Marudo Koi Farm offers Showa and Shusui
    ('FA0002', 'VA0003'), -- Showa
    ('FA0002', 'VA0005'), -- Shusui
    
    -- Momotaro Koi Farm offers Asagi
    ('FA0003', 'VA0004'), -- Asagi
    
    -- Shintaro Koi Farm offers Kohaku, Sanke, and Showa
    ('FA0004', 'VA0001'), -- Kohaku
    ('FA0004', 'VA0002'), -- Sanke
    ('FA0004', 'VA0003'), -- Showa
    
    -- Sakai Fish Farm offers Shusui
    ('FA0005', 'VA0005'); -- Shusui


	-- Inserting into the trip_destinations table
INSERT INTO trip_destinations (id, trip_id, farm_id, visit_date, is_deleted)
VALUES
    -- For Delivered Trips
    ('TD0001', 'TR0001', 'FA0001', NULL, FALSE), -- Dainichi Koi Farm (Kohaku, Sanke)
    ('TD0002', 'TR0001', 'FA0002', NULL, FALSE), -- Marudo Koi Farm (Showa, Shusui)
    
    ('TD0003', 'TR0002', 'FA0003', NULL, FALSE), -- Momotaro Koi Farm (Asagi)
    
    -- For Ongoing Trips
    ('TD0004', 'TR0003', 'FA0004', NULL, FALSE), -- Shintaro Koi Farm (Kohaku, Sanke, Showa)
    ('TD0005', 'TR0004', 'FA0005', NULL, FALSE); -- Sakai Fish Farm (Shusui)


-- Inserting into the fishes table
INSERT INTO fishes (id, variety_id, length, weight, description, is_deleted)
VALUES
    ('KF0001', 'VA0001', 30.5, 5.0, 'Kohaku with vivid red patterns.', FALSE), -- Kohaku for BO0001
    ('KF0002', 'VA0002', 28.0, 4.5, 'Sanke with unique black markings.', FALSE), -- Sanke for BO0001
    ('KF0003', 'VA0003', 32.0, 6.0, 'Showa with deep black body.', FALSE), -- Showa for BO0001
    ('KF0004', 'VA0004', 26.0, 3.8, 'Asagi with brilliant blue color.', FALSE), -- Asagi for BO0002
    ('KF0005', 'VA0005', 27.5, 4.0, 'Scaleless Shusui, a beautiful piece.', FALSE); -- Shusui for BO0002

-- Inserting into the fish_orders table
INSERT INTO fish_orders (id, booking_id, farm_id, delivery_address, total, create_at, arrived_date, status, is_deleted)
VALUES
    ('PO0001', 'BO0001', 'FA0001', '123 Customer Lane, Ho Chi Minh City, Vietnam', 250.00, '2024-09-01 10:00:00', '2024-09-05 15:00:00', 'Delivered', FALSE), -- Kohaku, Sanke, Showa
	('PO0002', 'BO0001', 'FA0002', '123 Customer Lane, Ho Chi Minh City, Vietnam', 125.00, '2024-09-01 10:00:00', '2024-09-05 15:00:00', 'Delivered', FALSE),
    ('PO0003', 'BO0002', 'FA0002', '456 Customer Road, Hanoi, Vietnam', 300.00, '2024-09-10 12:00:00', '2024-09-14 15:00:00', 'Delivered', FALSE); -- Asagi, Shusui

	-- Inserting into the fish_order_details table
INSERT INTO fish_order_details (id, fish_order_id, fish_id, price, is_deleted)
VALUES
    ('FOD0001', 'PO0001', 'KF0001', 125.00, FALSE), -- Kohaku
    ('FOD0002', 'PO0001', 'KF0002', 125.00, FALSE), -- Sanke
    ('FOD0003', 'PO0002', 'KF0003', 125.00, FALSE), -- Showa
    ('FOD0004', 'PO0003', 'KF0004', 150.00, FALSE), -- Asagi
    ('FOD0005', 'PO0003', 'KF0005', 150.00, FALSE); -- Shusui


-- Inserting into the fish_payments table
INSERT INTO fish_payments (
    id, fish_order_id, create_at, payment_method_id, amount, status, is_deleted
) VALUES
    -- Payments for PO0001
    ('FPM0001', 'PO0001', '2024-09-01 09:00:00', 'PM0001', 125.00, TRUE, FALSE),
    ('FPM0003', 'PO0001', '2024-09-05 14:00:00', 'PM0001', 125.00, TRUE, FALSE),	 
    
    -- Payments for PO0002
    ('FPM0002', 'PO0002', '2024-10-01 09:00:00', 'PM0001', 62.50, TRUE, FALSE),
    ('FPM0004', 'PO0002', '2024-09-05 14:00:00', 'PM0001', 62.50, TRUE, FALSE), 
    
    -- Payments for PO0003
    ('FPM0005', 'PO0003', '2024-09-10 11:00:00', 'PM0001', 150.00, TRUE, FALSE),
    ('FPM0006', 'PO0003', '2024-09-14 14:00:00', 'PM0002', 150.00, TRUE, FALSE); 

INSERT INTO trip_payments (
    id, booking_id, create_at, payment_method_id, amount, status, is_deleted
)
VALUES
    -- Booking BO0001 for Trip TR0001 (Delivered)
    ('TPM0001', 'BO0001', '2024-09-01 10:00:00', 'PM0001', 750.00, TRUE, FALSE),
    
    -- Booking BO0002 for Trip TR0002 (Delivered)
    ('TPM0002', 'BO0002', '2024-09-10 12:00:00', 'PM0002', 600.00, TRUE, FALSE),
    
    -- Booking BO0003 for Trip TR0003 (On-Going)
    ('TPM0003', 'BO0003', '2024-09-15 14:00:00', 'PM0001', 800.00, TRUE, FALSE),
    
    -- Booking BO0004 for Trip TR0004 (On-Going)
    ('TPM0004', 'BO0004', '2024-09-20 09:30:00', 'PM0002', 500.00, TRUE, FALSE);

INSERT INTO fish_packs (id, length, weight, description, quantity, is_deleted)
VALUES
    ('FP0001', '30-35 cm', '5-6 kg', 'Pack of 5 Kohaku Koi with excellent health.', 5, FALSE),
    ('FP0002', '25-30 cm', '4-5 kg', 'Pack of 3 Sanke Koi suitable for beginner owners.', 3, FALSE),
    ('FP0003', '28-32 cm', '5 kg', 'Premium Showa Koi pack with vibrant colors.', 4, FALSE);

INSERT INTO fish_pack_order_details (id, fish_order_id, fish_pack_id, price, is_deleted)
VALUES
    ('FPOD0001', 'PO0001', 'FP0001', 500.00, FALSE), -- 5 Kohaku Koi
    ('FPOD0002', 'PO0002', 'FP0002', 300.00, FALSE), -- 3 Sanke Koi
    ('FPOD0003', 'PO0003', 'FP0003', 600.00, FALSE); -- 4 Showa Koi

	