-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 17, 2018 at 11:22 PM
-- Server version: 5.6.34-log
-- PHP Version: 7.0.19

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
  `eventAddress2` varchar(255) DEFAULT NULL,
  `eventCity` varchar(255) DEFAULT NULL,
  `eventState` varchar(255) DEFAULT NULL,
  `eventZip` int(5) NOT NULL,
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
(1, 'InitialEvent', 'TestDescription', 'TestEventVenueName', 'Test Address 1', 'Test Address 2', 'Test Event City', 'TS', 55555, 1523914200, 1530536400, 'Test Event Status', 1, 2),
(2, 'InitialEvent', 'TestDescription', 'TestEventVenueName', 'Test Address 1', 'Test Address 2', 'Test Event City', 'TS', 55555, 1523914200, 1530536400, 'Test Event Status', 1, 2),
(3, 'Event3', 'TestDescription', 'TestEventVenueName', 'Test Address 1', NULL, 'Test Event City', 'TS', 55555, 1523328593, 1530536400, 'Test Event Status', 1, 1),
(4, 'Event4', 'TestDescription', 'Test', 'TestTEst', NULL, 'eventCity', 'TS', 44444, 1, 1, 'Approved', 1, 1);

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
(1, 2, '1234567', '12345', 'CDI');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `salt` varbinary(255) DEFAULT NULL,
  `userType` varchar(32) NOT NULL,
  `gender` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `salt`, `userType`, `gender`) VALUES
(1, 'InitialClient', 'b1d59c934910fa0850c52720f9e463cef1a92aa840a4be4ea0e442993b0cbf97', 0x3031323334353637383930313233343536373839303132333435363738393031, 'client', 'male'),
(2, 'InitialInterpreter', 'b1d59c934910fa0850c52720f9e463cef1a92aa840a4be4ea0e442993b0cbf97', 0x3031323334353637383930313233343536373839303132333435363738393031, 'interpreter', 'female');

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
  MODIFY `eventId` int(32) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `interpreters`
--
ALTER TABLE `interpreters`
  MODIFY `interpreterId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
