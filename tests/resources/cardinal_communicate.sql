-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 02, 2018 at 05:04 AM
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
-- Table structure for table `interpreters`
--

CREATE TABLE `interpreters` (
  `interpreterId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `telephone` varchar(255) NOT NULL,
  `zip` varchar(255) NOT NULL,
  `certification` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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

INSERT INTO `users` (userId, `username`, `password`, `salt`, `userType`, `gender`) VALUES
(1, 'InitialUser', 'b1d59c934910fa0850c52720f9e463cef1a92aa840a4be4ea0e442993b0cbf97', 0x3031323334353637383930313233343536373839303132333435363738393031, 'client', 'male');

--
-- Indexes for dumped tables
--

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
  ADD PRIMARY KEY (userId);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `interpreters`
--
ALTER TABLE `interpreters`
  MODIFY `interpreterId` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY userId int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
