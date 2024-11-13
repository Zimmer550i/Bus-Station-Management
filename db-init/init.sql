-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 09, 2024 at 07:22 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

ALTER USER 'admin'@'%' IDENTIFIED BY 'admin';

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cse311l project`
--

-- --------------------------------------------------------

--
-- Table structure for table `buses`
--

CREATE TABLE `buses` (
  `bus_id` int(11) NOT NULL,
  `bus_number` varchar(10) NOT NULL,
  `capacity` int(11) NOT NULL,
  `route_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bus_stations`
--

CREATE TABLE `bus_stations` (
  `station_id` int(11) NOT NULL,
  `station_name` varchar(100) NOT NULL,
  `location` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bus_stations`
--

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `employee_id` int(11) NOT NULL,
  `employee_name` varchar(100) NOT NULL,
  `role` varchar(50) NOT NULL,
  `station_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `routes`
--

CREATE TABLE `routes` (
  `route_id` int(11) NOT NULL,
  `route_name` varchar(100) NOT NULL,
  `start_station_id` int(11) DEFAULT NULL,
  `end_station_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `buses`
--
ALTER TABLE `buses`
  ADD PRIMARY KEY (`bus_id`),
  ADD KEY `route_id` (`route_id`);

--
-- Indexes for table `bus_stations`
--
ALTER TABLE `bus_stations`
  ADD PRIMARY KEY (`station_id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`employee_id`),
  ADD KEY `station_id` (`station_id`);

--
-- Indexes for table `routes`
--
ALTER TABLE `routes`
  ADD PRIMARY KEY (`route_id`),
  ADD KEY `start_station_id` (`start_station_id`),
  ADD KEY `end_station_id` (`end_station_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `buses`
--
ALTER TABLE `buses`
  MODIFY `bus_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bus_stations`
--
ALTER TABLE `bus_stations`
  MODIFY `station_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `employee_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `routes`
--
ALTER TABLE `routes`
  MODIFY `route_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `buses`
--
ALTER TABLE `buses`
  ADD CONSTRAINT `buses_ibfk_1` FOREIGN KEY (`route_id`) REFERENCES `routes` (`route_id`) ON DELETE CASCADE;

--
-- Constraints for table `employees`
--
ALTER TABLE `employees`
  ADD CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`station_id`) REFERENCES `bus_stations` (`station_id`) ON DELETE CASCADE;

--
-- Constraints for table `routes`
--
ALTER TABLE `routes`
  ADD CONSTRAINT `routes_ibfk_1` FOREIGN KEY (`start_station_id`) REFERENCES `bus_stations` (`station_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `routes_ibfk_2` FOREIGN KEY (`end_station_id`) REFERENCES `bus_stations` (`station_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- Data for `bus_stations`
INSERT INTO `bus_stations` (`station_id`, `station_name`, `location`) VALUES
(1, 'Gabtoli Bus Terminal', 'Gabtoli, Dhaka'),
(2, 'Syedabad Bus Terminal', 'Syedabad, Dhaka'),
(3, 'Jatrabari Bus Station', 'Jatrabari, Dhaka'),
(4, 'Kallyanpur Bus Stand', 'Kallyanpur, Dhaka'),
(5, 'Airport Bus Station', 'Airport Road, Dhaka');

-- Data for `employees`
INSERT INTO `employees` (`employee_id`, `employee_name`, `role`, `station_id`) VALUES
(1, 'Shahriar Rahman', 'Driver', 1),
(2, 'Tanvir Ahmed', 'Conductor', 2),
(3, 'Nasima Begum', 'Ticket Collector', 3),
(4, 'Farhana Yasmin', 'Driver', 4),
(5, 'Jamal Uddin', 'Maintenance', 5);

-- Data for `routes`
INSERT INTO `routes` (`route_id`, `route_name`, `start_station_id`, `end_station_id`) VALUES
(1, 'Dhaka-Chittagong Route', 1, 2),
(2, 'Dhaka-Sylhet Route', 2, 3),
(3, 'Dhaka-Rajshahi Route', 3, 4),
(4, 'Dhaka-Khulna Route', 4, 5),
(5, 'Dhaka-Barisal Route', 5, 1);

-- Data for `buses`
INSERT INTO `buses` (`bus_id`, `bus_number`, `capacity`, `route_id`) VALUES
(1, 'BUS-101', 40, 1),
(2, 'BUS-102', 50, 2),
(3, 'BUS-103', 45, 3),
(4, 'BUS-104', 35, 4),
(5, 'BUS-105', 55, 5);