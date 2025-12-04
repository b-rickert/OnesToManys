CREATE TABLE gym (
id BigINT PRIMARY KEY AUTOINCREMENT,
name VARCHAR(100) NOT NULL,
address VARCHAR(200),
city VARCHAR(50),
state VARCHAR(2),
phone_number VARCHAR(20),
operating_hours VARCHAR(50),
number_of_equipment INT, 
gym_type VARCHAR(50),
monthly_rate DECIMAL(10, 2)
);

CREATE TABLE member (
id BIGINT PRIMARY KEY AUTOINCREMENT,
gym_id BIGINT,
first_name VARCHAR(50) NOT NULL,
last_name VARCHAR(50) NOT NULL,
email VARCHAR(100),
phone_number VARCHAR(20),
date_of_birth DATE NOT NULL,
join_date DATE NOT NULL,
membership_type VARCHAR(50) NOT NULL,
fitness_goal VARCHAR(100),
last_check_in_date DATE,
membership_status VARCHAR(20) NOT NULL,
favorite_equipment VARCHAR(50),
FOREIGN KEY (gym_id) REFERENCES gym(id) ON DELETE SET NULL
);

CREATE INDEX idx_member_gym_id ON member(gym_id);

