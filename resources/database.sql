-- phpMyAdmin SQL Dump
-- version 4.7.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Apr 06, 2018 at 12:10 AM
-- Server version: 5.6.35
-- PHP Version: 7.1.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `cardinal_communicate`
--

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `eventId` int(32) NOT NULL,
  `eventName` varchar(255) NOT NULL,
  `eventZipCode` int(11) NOT NULL,
  `eventStartUnixTimestamp` int(16) NOT NULL,
  `eventEndUnixTimestamp` int(16) NOT NULL,
  `eventClientId` int(11) NOT NULL,
  `eventInterpreterId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`eventId`, `eventName`, `eventZipCode`, `eventStartUnixTimestamp`, `eventEndUnixTimestamp`, `eventClientId`, `eventInterpreterId`) VALUES
(1, 'InitialEvent', 55555, 1530541800, 1530543600, 1, 1);

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
-- AUTO_INCREMENT for table `interpreters`
--
ALTER TABLE `interpreters`
  MODIFY `interpreterId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;ß