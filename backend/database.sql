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
VALUES ('admin', '$2b$10$DpRnE2BSLMs7neeJr3qKJejmer7zqBjzxrUsDp9lraHp.Diwc4Lh.')
ON DUPLICATE KEY UPDATE `username`=`username`;
