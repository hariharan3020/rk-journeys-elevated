-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS `rk_tours_and_travels` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `rk_tours_and_travels`;

-- Create the users table to store usernames and passwords
CREATE TABLE IF NOT EXISTS `users` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(50) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL, -- Stored as a secure hash (e.g. bcrypt)
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed default admin user (username: admin, password: admin123)
INSERT INTO `users` (`username`, `password`) 
VALUES ('admin', '$2y$10$tM2a6/8HszFq4V3qG9Q2xufxM/b.s9.O/3V34rJj3R8cUXf5Jg5eO')
ON DUPLICATE KEY UPDATE `username`=`username`;

-- Create the customer_reviews table
CREATE TABLE IF NOT EXISTS `customer_reviews` (
    `id`         INT AUTO_INCREMENT PRIMARY KEY,
    `name`       VARCHAR(100) NOT NULL,
    `email`      VARCHAR(150) DEFAULT NULL,
    `role`       VARCHAR(100) DEFAULT NULL,        -- e.g. "Family Trip", "Business Traveler"
    `message`    TEXT NOT NULL,
    `rating`     TINYINT UNSIGNED NOT NULL DEFAULT 5 CHECK (`rating` BETWEEN 1 AND 5),
    `status`     ENUM('pending','approved','rejected') NOT NULL DEFAULT 'pending',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed the 5 existing frontend testimonials as approved reviews
INSERT INTO `customer_reviews` (`name`, `role`, `message`, `rating`, `status`) VALUES
  ('Arjun Ramesh',   'Business Traveler', 'Punctual, clean cars and courteous drivers. RK is my go-to for airport runs.',                   5, 'approved'),
  ('Priya Sundaram', 'Family Trip',       'Our Ooty trip was stress-free. The driver was patient and knew every scenic stop.',               5, 'approved'),
  ('Vikram N.',      'Corporate Client',  'We use RK for all executive travel. Reliability and pricing are unmatched.',                      5, 'approved'),
  ('Meera Krishnan', 'Temple Tour',       'Rameshwaram darshan was seamless. Comfortable ride and thoughtful planning.',                     5, 'approved'),
  ('Rahul Iyer',     'Wedding',           'Fleet arrived on time, immaculately maintained. Guests were impressed.',                          5, 'approved')
ON DUPLICATE KEY UPDATE `name`=`name`;
