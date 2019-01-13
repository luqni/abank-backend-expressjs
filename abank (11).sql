-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 12 Jan 2019 pada 01.56
-- Versi server: 10.1.37-MariaDB
-- Versi PHP: 7.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `abank`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `account`
--

CREATE TABLE `account` (
  `accountnumber` int(11) NOT NULL,
  `pin` varchar(6) NOT NULL DEFAULT '123123',
  `balance` int(30) NOT NULL DEFAULT '0',
  `codebank` varchar(5) NOT NULL DEFAULT '021',
  `date` date NOT NULL,
  `status` enum('active','inactive','idle') NOT NULL DEFAULT 'idle',
  `idcustomer` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `account`
--

INSERT INTO `account` (`accountnumber`, `pin`, `balance`, `codebank`, `date`, `status`, `idcustomer`) VALUES
(994125809, '123123', 11689000, '021', '2019-01-11', 'active', 93),
(994125810, '123123', 5261000, '021', '2019-01-11', 'active', 94),
(994125811, '123123', 4500000, '021', '2019-01-11', 'active', 95),
(994125812, '777777', 550000, '021', '2019-01-11', 'active', 96),
(994125813, '123123', 12000000, '021', '2019-01-11', 'active', 97),
(994125814, '123123', 0, '021', '2019-01-12', 'idle', 98),
(994125815, '123123', 0, '021', '2019-01-12', 'idle', 99);

--
-- Trigger `account`
--
DELIMITER $$
CREATE TRIGGER `setDate` BEFORE INSERT ON `account` FOR EACH ROW BEGIN
    IF NEW. date = '0000-00-00' THEN
        SET NEW.date = CURRENT_TIMESTAMP();
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struktur dari tabel `customer`
--

CREATE TABLE `customer` (
  `idcustomer` int(11) NOT NULL,
  `firstname` varchar(25) NOT NULL,
  `lastname` varchar(25) NOT NULL,
  `gender` varchar(1) NOT NULL,
  `phonenumber` varchar(13) NOT NULL,
  `address` text NOT NULL,
  `email` varchar(20) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `nationality` varchar(3) NOT NULL,
  `level` enum('1','2') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `customer`
--

INSERT INTO `customer` (`idcustomer`, `firstname`, `lastname`, `gender`, `phonenumber`, `address`, `email`, `username`, `password`, `nationality`, `level`) VALUES
(1, 'abank', 'abank', 'M', '0857878777979', 'Jl. Lintas Sumatra', 'admin@gmail.com', 'abank', 'abank123', 'WNI', '1'),
(93, 'M Jupri', ' Amin', ' ', '081234565656', 'Jl. Merbabu', 'asd@mail.co.id', 'jupe', 'jupe', 'asd', '2'),
(94, 'luqni', 'baehaqi', 'M', '081234565667', 'Jl. Merbabu', 'muh@ss', 'luqni', 'luqni', 'wni', '2'),
(95, 'Dewa', 'Gede Sugiada', 'M', '08227852680', 'Jl. Lintas Sumatra No. 10', 'Dewa.js@gmail.com', 'Dewa', 'dewagede12', 'WNI', '2'),
(96, 'riska', 'rahmatul janah', 'F', '82182101211', 'Lampung', 'riska@gmail.com', 'riska', 'riska', 'WNA', '2'),
(97, 'mufiq patoni', 'aom malik', 'M', '081212616830', 'kp mekar jaya ds cibening purwakarta', 'stev1forza@gmail.com', 'seuneubiru', '11111111', 'WNI', '2'),
(98, 'baehaqi', 'luqni', '', '082313772913', 'Jl. Raya Besar', 'mluqni@gmail.com', 'baehaqi', 'baehaqi', 'WNI', '2'),
(99, 'mufiq', 'patoni', '', '082348527649', 'jl. kenanga indah', 'mufiq@mail.com', 'mufiq', 'mufiq', 'wni', '2');

-- --------------------------------------------------------

--
-- Struktur dari tabel `transaction`
--

CREATE TABLE `transaction` (
  `idtransaction` int(11) NOT NULL,
  `receiver` int(11) NOT NULL,
  `receivername` varchar(30) NOT NULL,
  `sender` varchar(30) NOT NULL,
  `sendername` varchar(30) NOT NULL,
  `amount` varchar(20) NOT NULL,
  `amountsign` varchar(1) NOT NULL,
  `type` varchar(10) NOT NULL,
  `date` date NOT NULL,
  `accountnumber` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `transaction`
--

INSERT INTO `transaction` (`idtransaction`, `receiver`, `receivername`, `sender`, `sendername`, `amount`, `amountsign`, `type`, `date`, `accountnumber`) VALUES
(5, 994125810, 'luqni', '994125809', 'M Jupri', '50000', 'D', 'Transfer', '2019-01-11', 994125809),
(6, 994125810, 'luqni', '994125809', 'M Jupri', '50000', 'C', 'Transfer', '2019-01-11', 994125810),
(7, 994125810, 'luqni', '994125809', 'M Jupri', '50000', 'D', 'Transfer', '2019-01-11', 994125809),
(8, 994125810, 'luqni', '994125809', 'M Jupri', '50000', 'C', 'Transfer', '2019-01-11', 994125810),
(9, 994125809, 'M Jupri', '994125811', 'Dewa', '3000000', 'D', 'Transfer', '2019-01-11', 994125811),
(10, 994125809, 'M Jupri', '994125811', 'Dewa', '3000000', 'C', 'Transfer', '2019-01-11', 994125809),
(11, 994125810, 'luqni', '994125809', 'M Jupri', '50000', 'D', 'Transfer', '2019-01-11', 994125809),
(12, 994125810, 'luqni', '994125809', 'M Jupri', '50000', 'C', 'Transfer', '2019-01-11', 994125810),
(13, 994125810, 'luqni', '994125809', 'M Jupri', '50000', 'D', 'Transfer', '2019-01-11', 994125809),
(14, 994125810, 'luqni', '994125809', 'M Jupri', '50000', 'C', 'Transfer', '2019-01-11', 994125810),
(15, 994125811, 'Dewa', '994125809', 'M Jupri', '500000', 'D', 'Transfer', '2019-01-11', 994125809),
(16, 994125811, 'Dewa', '994125809', 'M Jupri', '500000', 'C', 'Transfer', '2019-01-11', 994125811),
(17, 994125810, 'luqni', '994125809', 'M Jupri', '50000', 'D', 'Transfer', '2019-01-11', 994125809),
(18, 994125810, 'luqni', '994125809', 'M Jupri', '50000', 'C', 'Transfer', '2019-01-11', 994125810),
(19, 994125812, 'riska', '994125809', 'M Jupri', '200000', 'D', 'Transfer', '2019-01-11', 994125809),
(20, 994125812, 'riska', '994125809', 'M Jupri', '200000', 'C', 'Transfer', '2019-01-11', 994125812),
(21, 994125810, 'luqni', '994125811', 'Dewa', '5000000', 'D', 'Transfer', '2019-01-11', 994125811),
(22, 994125810, 'luqni', '994125811', 'Dewa', '5000000', 'C', 'Transfer', '2019-01-11', 994125810),
(23, 994125812, 'riska', '994125809', 'M Jupri', '50000', 'D', 'Transfer', '2019-01-11', 994125809),
(24, 994125812, 'riska', '994125809', 'M Jupri', '50000', 'C', 'Transfer', '2019-01-11', 994125812),
(25, 994125812, 'riska', '994125809', 'M Jupri', '50000', 'D', 'Transfer', '2019-01-11', 994125809),
(26, 994125812, 'riska', '994125809', 'M Jupri', '50000', 'C', 'Transfer', '2019-01-11', 994125812),
(27, 994125812, 'riska', '994125809', 'M Jupri', '50000', 'D', 'Transfer', '2019-01-11', 994125809),
(28, 994125812, 'riska', '994125809', 'M Jupri', '50000', 'C', 'Transfer', '2019-01-11', 994125812),
(29, 994125812, 'riska', '994125809', 'M Jupri', '50000', 'D', 'Transfer', '2019-01-11', 994125809),
(30, 994125812, 'riska', '994125809', 'M Jupri', '50000', 'C', 'Transfer', '2019-01-11', 994125812),
(31, 994125812, 'riska', '994125809', 'M Jupri', '50000', 'D', 'Transfer', '2019-01-11', 994125809),
(32, 994125812, 'riska', '994125809', 'M Jupri', '50000', 'C', 'Transfer', '2019-01-11', 994125812),
(33, 994125812, 'riska', '994125809', 'M Jupri', '50000', 'D', 'Transfer', '2019-01-11', 994125809),
(34, 994125812, 'riska', '994125809', 'M Jupri', '50000', 'C', 'Transfer', '2019-01-11', 994125812),
(35, 994125812, 'riska', '994125809', 'M Jupri', '50000', 'D', 'Transfer', '2019-01-11', 994125809),
(36, 994125812, 'riska', '994125809', 'M Jupri', '50000', 'C', 'Transfer', '2019-01-11', 994125812),
(37, 994125810, 'luqni', '994125809', 'M Jupri', '1000', 'D', 'Transfer', '2019-01-11', 994125809),
(38, 994125810, 'luqni', '994125809', 'M Jupri', '1000', 'C', 'Transfer', '2019-01-11', 994125810),
(39, 994125810, 'luqni', '994125809', 'M Jupri', '10000', 'D', 'Transfer', '2019-01-11', 994125809),
(40, 994125810, 'luqni', '994125809', 'M Jupri', '10000', 'C', 'Transfer', '2019-01-11', 994125810);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`accountnumber`),
  ADD KEY `fk_customer` (`idcustomer`);

--
-- Indeks untuk tabel `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`idcustomer`);

--
-- Indeks untuk tabel `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`idtransaction`),
  ADD KEY `FK_Account` (`accountnumber`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `account`
--
ALTER TABLE `account`
  MODIFY `accountnumber` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=994125816;

--
-- AUTO_INCREMENT untuk tabel `customer`
--
ALTER TABLE `customer`
  MODIFY `idcustomer` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;

--
-- AUTO_INCREMENT untuk tabel `transaction`
--
ALTER TABLE `transaction`
  MODIFY `idtransaction` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `account`
--
ALTER TABLE `account`
  ADD CONSTRAINT `fk_customer` FOREIGN KEY (`idcustomer`) REFERENCES `customer` (`idcustomer`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ketidakleluasaan untuk tabel `transaction`
--
ALTER TABLE `transaction`
  ADD CONSTRAINT `FK_Account` FOREIGN KEY (`accountnumber`) REFERENCES `account` (`accountnumber`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
