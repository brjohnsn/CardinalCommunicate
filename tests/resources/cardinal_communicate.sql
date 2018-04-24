-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 24, 2018 at 02:30 AM
-- Server version: 5.6.34-log
-- PHP Version: 7.1.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cardinal_communicate`
--

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `eventId` int(32) NOT NULL,
  `eventName` varchar(64) NOT NULL,
  `eventDescription` mediumtext,
  `eventVenueName` varchar(255) DEFAULT NULL,
  `eventAddress1` varchar(255) DEFAULT NULL,
  `eventAddress2` varchar(255) NOT NULL,
  `eventCity` varchar(255) DEFAULT NULL,
  `eventState` varchar(255) DEFAULT NULL,
  `eventZip` varchar(5) NOT NULL,
  `eventStartUnixTimestamp` int(16) NOT NULL,
  `eventEndUnixTimestamp` int(16) DEFAULT NULL,
  `eventStatus` varchar(255) DEFAULT NULL,
  `eventClientId` int(11) NOT NULL,
  `eventInterpreterId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`eventId`, `eventName`, `eventDescription`, `eventVenueName`, `eventAddress1`, `eventAddress2`, `eventCity`, `eventState`, `eventZip`, `eventStartUnixTimestamp`, `eventEndUnixTimestamp`, `eventStatus`, `eventClientId`, `eventInterpreterId`) VALUES
(1, 'Professional Conference', 'Professional development seminar with guest speakers.', 'Worcester Convention Center', '1655 Hillside Drive', 'Hall 7', 'Worcester', 'MA', '01610', 1537272000, 1537304400, 'Accepted', 1, 0),
(2, 'Doctor Appointment', 'Annual checkup.', 'Sibdey Medical Center', '2604 Whaley Lane', '', 'San Bernardino', 'CA', '92406', 1534269600, 1534273200, 'Pending', 3, 4),
(3, 'Parent/Teacher Conference', 'Meeting with my son\'s first grade teacher.', 'Central Elementary School', '2230 State Street', '', 'Saint Charles', 'MO', '63301', 1540936800, 1540938600, 'Accepted', 5, 6),
(4, 'Vet Appointment', 'Annual checkup for my dog.', 'Happy Doge', '4286 Overlook Drive', '', 'Richmond', 'IN', '47374', 1530891000, 1530894600, 'Accepted', 1, 2),
(5, 'Driving Exam', 'Taking the written test for my driver\'s license!', 'BMV', '2593 Steve Hunt Road', 'Suite C', 'Miami', 'FL', '33179', 1530990000, 1530993600, 'Accepted', 3, 4),
(6, 'Fingerprinting', 'Getting fingerprints for TSA pre-check.', 'TSA Indianapolis Office', '4982 Valley Street', 'Suite 15', 'Indianapolis', 'IN', '63326', 1542204000, 1542205800, 'Accepted', 5, 6),
(7, 'Home Inspection', 'Buying a home and need to meet with the home inspector for my mortgage.', 'Home address', '2832 Scenicview Drive', '', 'Midland', 'TX', '79701', 1529850600, 1529857800, 'Declined', 1, 2),
(8, 'Car repair', 'Dropping off my car at the mechanic.', 'Mr. FixIt', '527 Pine Tree Lane', '', 'McLean', 'MD', '22102', 1529818200, 1529820000, 'Declined', 2, 3),
(9, 'Attorney', 'Meeting with my attorney for a living will preparation.', 'Enkley, Mickle, and Burns', '4501 Snowbird Lane', '', 'Omaha', 'NE', '68104', 1527746400, 1527750000, 'Declined', 3, 4),
(10, 'Retirement planning', 'Reviewing my 401k plan with my financial consultant.', 'Spruce Wealth Managers', '3732 Spruce Drive', '', 'Bellevue', 'ID', '83313', 1534860000, 1534863600, 'Declined', 1, 2),
(11, 'Event4', 'TestDescription', 'Test', 'TestTEst', '', 'eventCity', 'TS', '44444', 1533051000, 1533056400, 'None', 1, 1),
(12, 'Event4', 'TestDescription', 'Test', 'TestTEst', '', 'eventCity', 'TS', '44444', 1533051000, 1533056400, 'None', 1, 1),
(13, 'Event4', 'TestDescription', 'Test', 'TestTEst', '', 'eventCity', 'TS', '44444', 1533051000, 1533056400, 'None', 1, 1),
(14, 'Event4', 'TestDescription', 'Test', 'TestTEst', '', 'eventCity', 'TS', '44444', 1533051000, 1533056400, 'None', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `interpreters`
--

CREATE TABLE `interpreters` (
  `interpreterId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `telephone` varchar(255) NOT NULL,
  `zip` varchar(255) NOT NULL,
  `certification` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `interpreters`
--

INSERT INTO `interpreters` (`interpreterId`, `userId`, `telephone`, `zip`, `certification`) VALUES
(1, 2, '909-405-3531', '95103', 'CDI'),
(2, 4, '304-857-9339', '33602', 'CSC'),
(3, 6, '615-202-4090', '43206', 'EIC'),
(4, 8, '706-970-8572', '11756', 'CDI'),
(5, 10, '339-293-9361', '90017', 'CSC');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `salt` varbinary(255) DEFAULT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `address1` varchar(255) NOT NULL,
  `address2` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `zip` varchar(255) NOT NULL,
  `userType` varchar(32) NOT NULL,
  `gender` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `salt`, `firstName`, `lastName`, `address1`, `address2`, `city`, `state`, `zip`, `userType`, `gender`) VALUES
(1, 'aholliday', 'b1d59c934910fa0850c52720f9e463cef1a92aa840a4be4ea0e442993b0cbf97', 0x3031323334353637383930313233343536373839303132333435363738393031, 'Allyson', 'Holliday', '2468 Seth Street', '', 'Hamlin', 'TX', '79520', 'client', 'female'),
(2, 'ebentley', 'b1d59c934910fa0850c52720f9e463cef1a92aa840a4be4ea0e442993b0cbf97', 0x3031323334353637383930313233343536373839303132333435363738393031, 'Edward', 'Bentley', '840 Angus Road', '', 'SAN JOSE', 'CA', '95103', 'interpreter', 'male'),
(3, 'vfeinstein', 'b1d59c934910fa0850c52720f9e463cef1a92aa840a4be4ea0e442993b0cbf97', 0x3031323334353637383930313233343536373839303132333435363738393031, 'Victor', 'Feinstein', '3449 Cemetery Street', '', 'Salinas', 'CA', '93901', 'client', 'male'),
(4, 'sdressler', 'b1d59c934910fa0850c52720f9e463cef1a92aa840a4be4ea0e442993b0cbf97', 0x3031323334353637383930313233343536373839303132333435363738393031, 'Sherry', 'Dressler', '3182 Collins Street', '', 'Tampa', 'FL', '33602', 'interpreter', 'female'),
(5, 'cmoua', 'b1d59c934910fa0850c52720f9e463cef1a92aa840a4be4ea0e442993b0cbf97', 0x3031323334353637383930313233343536373839303132333435363738393031, 'Clayton', 'Moua', '2253 Lost Creek Road', '', 'Birdsboro', 'PA', '19508', 'client', 'male'),
(6, 'bjiminez', 'b1d59c934910fa0850c52720f9e463cef1a92aa840a4be4ea0e442993b0cbf97', 0x3031323334353637383930313233343536373839303132333435363738393031, 'Beatrice', 'Jiminez', '2816 James Martin Circle', '', 'Columbus', 'OH', '43206', 'interpreter', 'female'),
(7, 'rpainter', 'b1d59c934910fa0850c52720f9e463cef1a92aa840a4be4ea0e442993b0cbf97', 0x3031323334353637383930313233343536373839303132333435363738393031, 'Ruby', 'Painter', '1013 Chardonnay Drive', '', 'Ft. Edward', 'NY', '12828', 'client', 'female'),
(8, 'ismith', 'b1d59c934910fa0850c52720f9e463cef1a92aa840a4be4ea0e442993b0cbf97', 0x3031323334353637383930313233343536373839303132333435363738393031, 'Ivana', 'Smith', '1355 Clark Street', '', 'New York', 'NY', '11756', 'interpreter', 'female'),
(9, 'mwells', 'b1d59c934910fa0850c52720f9e463cef1a92aa840a4be4ea0e442993b0cbf97', 0x3031323334353637383930313233343536373839303132333435363738393031, 'Michelle', 'Wells', '4452 Hazelwood Avenue', '', 'Winterset', 'IA', '50273', 'client', 'female'),
(10, 'ewhite', 'b1d59c934910fa0850c52720f9e463cef1a92aa840a4be4ea0e442993b0cbf97', 0x3031323334353637383930313233343536373839303132333435363738393031, 'Edward', 'White', '771 Bel Meadow Drive', '', 'Los Angeles', 'CA', '90017', 'interpreter', 'male'),
(11, 'TestCaseUser', '64c79d8a817a962a91f7a508ff86dc32244692b20b9dab333d578314fd1d41e2', 0x0f32896526c66bbe6d9da0981440855f221625b82637575edcd6c184770550ff, 'Endpoint', 'Added', '123 Main Street', 'Suite 98', 'Whoville', 'GR', '99999', 'Client', 'male'),
(12, 'TestCaseUser', 'bf38d6ab35d1d0a66fb361acab5d43a6cd33d3eeab16d19d4b50ee59dbce42c4', 0x8fea021755913df5fa11df377b6a370a5591f6a0cffcb871ef969c1ef6cfc13f, 'Endpoint', 'Added', '123 Main Street', 'Suite 98', 'Whoville', 'GR', '99999', 'Client', 'male'),
(13, 'TestCaseUser', '94eccc591197d34af1d91df038dc9893799d5957397b601b9f868f11d33c9a2a', 0xa19b3b5c6347977d74840ffd443fb2a350ec1b700138d7ca2a2a927b0ee17d4b, 'Endpoint', 'Added', '123 Main Street', 'Suite 98', 'Whoville', 'GR', '99999', 'Client', 'male'),
(14, 'TestCaseUser', 'e809e121a75b5b347b986ed83ce6ab873c5bc883ee36440bd0dbfcff2e1eeca5', 0x26c615f4ced64ed35f4a8cb2ee76c424fe9e34f807041c23b896a606cf8a852a, 'Endpoint', 'Added', '123 Main Street', 'Suite 98', 'Whoville', 'GR', '99999', 'Client', 'male');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`eventId`);

--
-- Indexes for table `interpreters`
--
ALTER TABLE `interpreters`
  ADD PRIMARY KEY (`interpreterId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `eventId` int(32) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `interpreters`
--
ALTER TABLE `interpreters`
  MODIFY `interpreterId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
