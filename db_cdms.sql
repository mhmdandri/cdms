-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 01 Sep 2025 pada 09.45
-- Versi server: 10.4.27-MariaDB
-- Versi PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_cdms`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('cdms_cache_cica@gmail.com|127.0.0.1', 'i:1;', 1755526495),
('cdms_cache_cica@gmail.com|127.0.0.1:timer', 'i:1755526495;', 1755526495);

-- --------------------------------------------------------

--
-- Struktur dari tabel `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `containers`
--

CREATE TABLE `containers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `container_number` varchar(255) NOT NULL,
  `size` enum('20ft','40ft','45ft') NOT NULL DEFAULT '20ft',
  `type` enum('dry','refrigerated','open_top','flat_rack','tank') NOT NULL DEFAULT 'dry',
  `location_id` bigint(20) UNSIGNED DEFAULT NULL,
  `customer_id` bigint(20) UNSIGNED DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'available',
  `stack_level` tinyint(3) UNSIGNED NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `containers`
--

INSERT INTO `containers` (`id`, `container_number`, `size`, `type`, `location_id`, `customer_id`, `status`, `stack_level`, `created_at`, `updated_at`) VALUES
(29, 'CT001', '20ft', 'dry', NULL, 2, 'on_truck', 0, '2025-08-05 09:50:05', '2025-08-20 18:06:52'),
(30, 'CT002', '20ft', 'dry', 2, 1, 'in_yard', 3, '2025-08-06 10:33:53', '2025-09-01 07:44:24'),
(31, 'CT003', '20ft', 'dry', 2, 1, 'in_yard', 4, '2025-08-06 10:34:02', '2025-09-01 07:44:55'),
(34, 'CT006', '20ft', 'dry', 2, 1, 'in_yard', 2, '2025-08-06 10:50:23', '2025-09-01 07:44:07'),
(35, 'CT007', '20ft', 'dry', NULL, 2, 'on_truck', 0, '2025-08-06 10:51:41', '2025-08-20 18:07:53'),
(37, 'CT008', '20ft', 'dry', NULL, 2, 'on_truck', 0, '2025-08-06 21:05:09', '2025-08-21 12:08:35'),
(38, 'CT009', '20ft', 'dry', NULL, 1, 'on_truck', 0, '2025-08-06 21:05:24', '2025-08-21 12:13:46'),
(40, 'CT011', '20ft', 'dry', NULL, 1, 'on_truck', 0, '2025-08-06 21:06:09', '2025-08-22 17:40:20'),
(41, 'CT012', '20ft', 'refrigerated', NULL, 5, 'on_truck', 0, '2025-08-06 21:06:25', '2025-08-22 17:07:00'),
(42, 'CT013', '20ft', 'dry', NULL, 1, 'on_truck', 0, '2025-08-06 21:07:03', '2025-08-23 15:51:01'),
(43, 'CT014', '20ft', 'dry', NULL, 2, 'on_truck', 0, '2025-08-06 21:21:59', '2025-08-22 17:47:31'),
(44, 'CT015', '20ft', 'dry', NULL, 1, 'on_truck', 0, '2025-08-06 21:22:33', '2025-08-22 18:04:49'),
(45, 'CT016', '20ft', 'refrigerated', NULL, 3, 'on_truck', 0, '2025-08-07 02:18:17', '2025-08-23 16:04:24'),
(46, 'CT017', '20ft', 'refrigerated', NULL, 3, 'on_truck', 0, '2025-08-07 02:18:40', '2025-08-23 16:06:23'),
(51, 'CT020', '20ft', 'dry', NULL, 3, 'on_truck', 0, '2025-08-10 03:27:24', '2025-08-23 16:12:47'),
(52, 'CT021', '20ft', 'refrigerated', NULL, 2, 'on_truck', 0, '2025-08-10 03:27:50', '2025-08-26 08:54:07'),
(53, 'CT022', '20ft', 'dry', NULL, 5, 'on_truck', 0, '2025-08-10 03:28:06', '2025-08-26 08:53:35'),
(54, 'CT023', '20ft', 'open_top', NULL, 7, 'on_truck', 0, '2025-08-10 03:29:01', '2025-08-26 08:53:54'),
(55, 'CT024', '20ft', 'open_top', NULL, 6, 'on_truck', 0, '2025-08-10 03:35:08', '2025-08-27 08:02:13'),
(56, 'CT025', '20ft', 'refrigerated', 2, 1, 'in_yard', 1, '2025-08-10 03:35:26', '2025-08-26 08:54:07'),
(58, 'CT005', '20ft', 'dry', 1, 5, 'in_yard', 1, '2025-08-12 08:27:34', '2025-08-12 08:53:22'),
(60, 'CT019', '20ft', 'dry', 1, 1, 'in_yard', 2, '2025-08-12 08:29:46', '2025-08-12 08:35:35'),
(61, 'CT018', '20ft', 'dry', 1, 1, 'in_yard', 3, '2025-08-12 08:31:27', '2025-08-12 08:35:35'),
(62, 'CT010', '20ft', 'dry', 1, 1, 'in_yard', 5, '2025-08-12 08:32:00', '2025-08-27 08:01:53'),
(63, 'CT004', '20ft', 'dry', 1, 1, 'in_yard', 4, '2025-08-12 08:35:51', '2025-08-16 04:40:22');

-- --------------------------------------------------------

--
-- Struktur dari tabel `customers`
--

CREATE TABLE `customers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `total_containers` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `customers`
--

INSERT INTO `customers` (`id`, `name`, `email`, `phone`, `address`, `status`, `total_containers`, `created_at`, `updated_at`) VALUES
(1, 'PT EVERGREEN LOGISTIK INDONESIA', 'info@evergreen.com', '021190211', 'Jl Raya Cakung CIlincing No 21', 'active', 12, '2025-08-03 05:29:24', '2025-08-12 08:52:31'),
(2, 'PT SAMUDRA LINTAS DUNIA', 'info@samudra.org', '02111223', 'Jl Akses Marunda No 22', 'active', 4, '2025-08-03 05:39:11', '2025-08-10 03:27:50'),
(3, 'PT LOGISTIC INTERNATIONAL', 'info@logistikinter.com', '08129100021', 'Jl Cakung CIlincing No 93', 'active', 3, '2025-08-03 05:41:03', '2025-08-12 08:53:22'),
(4, 'PT CICA PURWANTI', 'cicapurwanti@gmail.com', '081210860242', 'Jl Turi Jaya IV No 12', 'inactive', 0, '2025-08-03 06:05:40', '2025-08-05 09:58:22'),
(5, 'PT LINTAS ANTAR BENUA', 'lintas.benua@gmail.com', '08122211000', 'Jl Jawa No 12', 'active', 3, '2025-08-03 06:20:30', '2025-08-12 08:53:22'),
(6, 'PT PUNINAR LOGISTIK INDONESIA', 'hrd@puninar.com', '0211119990', 'Jl Komp KBN Blok F No 2', 'active', 1, '2025-08-03 06:31:10', '2025-08-10 03:35:08'),
(7, 'PT MAJU CONTAINER ABADI', 'info@abadi.com', '0211122999', 'Jl Kalimantan MM2100 No 2', 'active', 1, '2025-08-03 06:45:54', '2025-08-10 03:29:01'),
(18, 'PT MADUSARI NUSAPERDANA', 'info@mds.com', '0222111', 'CIkarang', 'active', 0, '2025-08-10 03:35:59', '2025-08-12 09:15:43'),
(21, 'PT SAHABAT ABADI SEJAHTERA', 'info@shs.com', '02221122990', 'Sunter', 'active', 0, '2025-08-15 20:46:37', '2025-08-15 20:46:37'),
(24, 'PT MOHA INTERNATIONAL', 'info@moha.com', '081210860242', 'Cakung Cilincing', 'active', 0, '2025-08-22 17:16:14', '2025-08-22 17:16:14'),
(25, 'PT JAYA ABADI', 'abadijaya@gmail.com', '022332211', 'lok', 'active', 0, '2025-08-22 18:06:13', '2025-08-22 18:06:13');

-- --------------------------------------------------------

--
-- Struktur dari tabel `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `histories`
--

CREATE TABLE `histories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `container_id` bigint(20) UNSIGNED NOT NULL,
  `location_id` bigint(20) UNSIGNED NOT NULL,
  `customer_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `task_id` bigint(20) UNSIGNED NOT NULL,
  `type` enum('loading','unloading') NOT NULL,
  `condition` enum('good','damaged','needs_repair') NOT NULL DEFAULT 'good',
  `status` enum('pending','completed','failed') NOT NULL DEFAULT 'completed',
  `event_time` timestamp NULL DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `histories`
--

INSERT INTO `histories` (`id`, `container_id`, `location_id`, `customer_id`, `user_id`, `task_id`, `type`, `condition`, `status`, `event_time`, `notes`, `created_at`, `updated_at`) VALUES
(1, 42, 5, 1, 2, 111, 'loading', 'good', 'completed', '2025-08-17 06:48:01', 'aman', '2025-08-17 06:48:01', '2025-08-17 06:48:01'),
(2, 43, 3, 2, 2, 112, 'loading', 'good', 'completed', '2025-08-17 07:20:11', 'sukses', '2025-08-17 07:20:11', '2025-08-17 07:20:11'),
(3, 45, 2, 3, 2, 113, 'loading', 'good', 'completed', '2025-08-17 07:21:39', 'Aman', '2025-08-17 07:21:39', '2025-08-17 07:21:39'),
(4, 30, 1, 1, 2, 114, 'unloading', 'damaged', 'completed', '2025-08-17 14:19:12', 'bopeng dikit', '2025-08-17 14:19:12', '2025-08-17 14:19:12'),
(5, 31, 2, 1, 2, 115, 'unloading', 'good', 'completed', '2025-08-17 14:22:01', 'aman', '2025-08-17 14:22:01', '2025-08-17 14:22:01'),
(6, 34, 2, 1, 2, 117, 'unloading', 'good', 'completed', '2025-08-17 14:41:59', 'aman', '2025-08-17 14:41:59', '2025-08-17 14:41:59'),
(7, 42, 3, 1, 2, 118, 'unloading', 'needs_repair', 'completed', '2025-08-17 14:42:26', 'pintu rusak', '2025-08-17 14:42:26', '2025-08-17 14:42:26'),
(8, 44, 3, 1, 2, 119, 'unloading', 'good', 'completed', '2025-08-17 14:42:44', 'aman', '2025-08-17 14:42:44', '2025-08-17 14:42:44'),
(9, 62, 3, 1, 2, 120, 'unloading', 'good', 'completed', '2025-08-17 14:43:12', 'aman', '2025-08-17 14:43:12', '2025-08-17 14:43:12'),
(10, 29, 4, 2, 2, 121, 'unloading', 'damaged', 'completed', '2025-08-17 14:43:41', 'engsel rusak', '2025-08-17 14:43:41', '2025-08-17 14:43:41'),
(11, 35, 3, 2, 2, 122, 'unloading', 'good', 'completed', '2025-08-17 14:45:55', NULL, '2025-08-17 14:45:55', '2025-08-17 14:45:55'),
(12, 37, 4, 2, 2, 123, 'unloading', 'good', 'completed', '2025-08-17 14:47:56', 'aman', '2025-08-17 14:47:56', '2025-08-17 14:47:56'),
(13, 45, 5, 3, 2, 125, 'unloading', 'good', 'completed', '2025-08-17 14:48:09', NULL, '2025-08-17 14:48:09', '2025-08-17 14:48:09'),
(14, 43, 5, 2, 2, 124, 'unloading', 'good', 'completed', '2025-08-17 14:48:19', NULL, '2025-08-17 14:48:19', '2025-08-17 14:48:19'),
(15, 42, 3, 1, 2, 126, 'loading', 'needs_repair', 'completed', '2025-08-17 14:49:41', 'kondisi pintu rusak', '2025-08-17 14:49:41', '2025-08-17 14:49:41'),
(16, 42, 3, 1, 2, 127, 'unloading', 'damaged', 'completed', '2025-08-17 15:32:08', 'mendingan', '2025-08-17 15:32:08', '2025-08-17 15:32:08'),
(17, 42, 3, 1, 2, 128, 'loading', 'damaged', 'completed', '2025-08-17 15:35:58', NULL, '2025-08-17 15:35:58', '2025-08-17 15:35:58'),
(18, 42, 3, 1, 2, 129, 'unloading', 'good', 'completed', '2025-08-18 07:03:26', 'aman', '2025-08-18 07:03:26', '2025-08-18 07:03:26'),
(19, 34, 2, 1, 2, 132, 'loading', 'good', 'completed', '2025-08-18 13:48:11', 'udh loading', '2025-08-18 13:48:11', '2025-08-18 13:48:11'),
(20, 35, 3, 2, 2, 133, 'loading', 'good', 'completed', '2025-08-18 13:50:49', 'loaded', '2025-08-18 13:50:49', '2025-08-18 13:50:49'),
(21, 29, 4, 2, 2, 131, 'loading', 'damaged', 'completed', '2025-08-18 14:06:35', 'loaded', '2025-08-18 14:06:35', '2025-08-18 14:06:35'),
(22, 34, 2, 1, 3, 134, 'unloading', 'good', 'completed', '2025-08-18 14:25:44', 'aman', '2025-08-18 14:25:44', '2025-08-18 14:25:44'),
(23, 29, 3, 2, 3, 135, 'unloading', 'good', 'completed', '2025-08-18 14:27:15', 'good', '2025-08-18 14:27:15', '2025-08-18 14:27:15'),
(24, 56, 4, 1, 3, 137, 'loading', 'good', 'completed', '2025-08-18 14:29:38', 'loading', '2025-08-18 14:29:38', '2025-08-18 14:29:38'),
(25, 56, 4, 1, 3, 138, 'unloading', 'damaged', 'completed', '2025-08-18 14:30:21', 'rusak', '2025-08-18 14:30:21', '2025-08-18 14:30:21'),
(26, 35, 4, 2, 3, 136, 'unloading', 'good', 'completed', '2025-08-18 15:01:00', NULL, '2025-08-18 15:01:00', '2025-08-18 15:01:00'),
(27, 62, 3, 1, 3, 139, 'loading', 'good', 'completed', '2025-08-18 16:50:52', 'loaded', '2025-08-18 16:50:52', '2025-08-18 16:50:52'),
(28, 54, 4, 7, 2, 140, 'loading', 'good', 'completed', '2025-08-18 16:54:42', 'loaded', '2025-08-18 16:54:42', '2025-08-18 16:54:42'),
(29, 34, 2, 1, 2, 141, 'loading', 'good', 'completed', '2025-08-18 16:55:46', 'loaded', '2025-08-18 16:55:46', '2025-08-18 16:55:46'),
(30, 43, 5, 2, 2, 142, 'loading', 'good', 'completed', '2025-08-18 17:04:35', 'loaded', '2025-08-18 17:04:35', '2025-08-18 17:04:35'),
(31, 29, 3, 2, 2, 143, 'loading', 'good', 'completed', '2025-08-18 17:06:42', 'loaded', '2025-08-18 17:06:42', '2025-08-18 17:06:42'),
(32, 31, 2, 1, 2, 144, 'loading', 'good', 'completed', '2025-08-18 17:26:42', 'loaded', '2025-08-18 17:26:42', '2025-08-18 17:26:42'),
(33, 38, 5, 1, 3, 150, 'loading', 'good', 'completed', '2025-08-18 17:39:31', 'loaded', '2025-08-18 17:39:31', '2025-08-18 17:39:31'),
(34, 29, 2, 2, 2, 146, 'unloading', 'good', 'completed', '2025-08-18 17:48:53', 'aman', '2025-08-18 17:48:53', '2025-08-18 17:48:53'),
(35, 30, 1, 1, 2, 145, 'loading', 'damaged', 'completed', '2025-08-18 17:50:02', NULL, '2025-08-18 17:50:02', '2025-08-18 17:50:02'),
(36, 31, 3, 1, 3, 148, 'unloading', 'good', 'completed', '2025-08-18 17:50:23', NULL, '2025-08-18 17:50:23', '2025-08-18 17:50:23'),
(37, 62, 3, 1, 2, 147, 'unloading', 'needs_repair', 'completed', '2025-08-18 17:50:49', NULL, '2025-08-18 17:50:49', '2025-08-18 17:50:49'),
(38, 43, 1, 2, 2, 149, 'unloading', 'good', 'completed', '2025-08-20 05:57:52', 'good', '2025-08-20 05:57:52', '2025-08-20 05:57:52'),
(39, 38, 2, 1, 2, 151, 'unloading', 'good', 'completed', '2025-08-20 06:13:57', 'aman', '2025-08-20 06:13:57', '2025-08-20 06:13:57'),
(40, 34, 4, 1, 2, 152, 'unloading', 'good', 'completed', '2025-08-20 06:14:46', 'aman', '2025-08-20 06:14:46', '2025-08-20 06:14:46'),
(41, 30, 5, 1, 2, 153, 'unloading', 'damaged', 'completed', '2025-08-20 17:23:02', 'bopeng', '2025-08-20 17:23:02', '2025-08-20 17:23:02'),
(42, 54, 5, 7, 2, 155, 'unloading', 'good', 'completed', '2025-08-20 18:04:43', NULL, '2025-08-20 18:04:43', '2025-08-20 18:04:43'),
(43, 29, 2, 2, 2, 156, 'loading', 'good', 'completed', '2025-08-20 18:06:52', 'loaded', '2025-08-20 18:06:52', '2025-08-20 18:06:52'),
(44, 30, 5, 1, 2, 157, 'loading', 'damaged', 'completed', '2025-08-20 18:07:05', 'loaded', '2025-08-20 18:07:05', '2025-08-20 18:07:05'),
(45, 31, 3, 1, 2, 158, 'loading', 'good', 'completed', '2025-08-20 18:07:18', 'loaded', '2025-08-20 18:07:18', '2025-08-20 18:07:18'),
(46, 34, 4, 1, 2, 159, 'loading', 'good', 'completed', '2025-08-20 18:07:34', 'loaded', '2025-08-20 18:07:34', '2025-08-20 18:07:34'),
(47, 35, 4, 2, 2, 160, 'loading', 'good', 'completed', '2025-08-20 18:07:53', 'loaded', '2025-08-20 18:07:53', '2025-08-20 18:07:53'),
(48, 37, 4, 2, 2, 161, 'loading', 'good', 'completed', '2025-08-21 12:08:35', 'loaded', '2025-08-21 12:08:35', '2025-08-21 12:08:35'),
(49, 38, 2, 1, 2, 162, 'loading', 'good', 'completed', '2025-08-21 12:13:46', 'loaded', '2025-08-21 12:13:46', '2025-08-21 12:13:46'),
(50, 41, 3, 5, 3, 164, 'loading', 'good', 'completed', '2025-08-22 17:07:00', 'loaded', '2025-08-22 17:07:00', '2025-08-22 17:07:00'),
(51, 40, 2, 1, 2, 163, 'loading', 'good', 'completed', '2025-08-22 17:40:20', 'loaded', '2025-08-22 17:40:20', '2025-08-22 17:40:20'),
(52, 43, 1, 2, 2, 166, 'loading', 'good', 'completed', '2025-08-22 17:47:31', 'loaded', '2025-08-22 17:47:31', '2025-08-22 17:47:31'),
(53, 44, 3, 1, 2, 168, 'loading', 'good', 'completed', '2025-08-22 18:04:49', 'loaded', '2025-08-22 18:04:49', '2025-08-22 18:04:49'),
(54, 42, 3, 1, 2, 170, 'loading', 'good', 'completed', '2025-08-23 15:51:02', 'loaded', '2025-08-23 15:51:02', '2025-08-23 15:51:02'),
(55, 45, 5, 3, 2, 171, 'loading', 'good', 'completed', '2025-08-23 16:04:24', 'loaded', '2025-08-23 16:04:24', '2025-08-23 16:04:24'),
(56, 46, 5, 3, 2, 172, 'loading', 'good', 'completed', '2025-08-23 16:06:23', 'loaded', '2025-08-23 16:06:23', '2025-08-23 16:06:23'),
(57, 51, 3, 3, 2, 173, 'loading', 'good', 'completed', '2025-08-23 16:12:47', 'loaded', '2025-08-23 16:12:47', '2025-08-23 16:12:47'),
(58, 53, 2, 5, 2, 175, 'loading', 'good', 'completed', '2025-08-26 08:53:35', 'loaded', '2025-08-26 08:53:35', '2025-08-26 08:53:35'),
(59, 54, 2, 7, 2, 176, 'loading', 'good', 'completed', '2025-08-26 08:53:54', 'loaded', '2025-08-26 08:53:54', '2025-08-26 08:53:54'),
(60, 52, 2, 2, 2, 177, 'loading', 'good', 'completed', '2025-08-26 08:54:07', 'loaded', '2025-08-26 08:54:07', '2025-08-26 08:54:07'),
(61, 55, 2, 6, 2, 178, 'loading', 'good', 'completed', '2025-08-27 08:02:13', 'loaded', '2025-08-27 08:02:13', '2025-08-27 08:02:13'),
(62, 34, 2, 1, 2, 181, 'unloading', 'good', 'completed', '2025-09-01 07:44:07', 'r1c2', '2025-09-01 07:44:07', '2025-09-01 07:44:07'),
(63, 30, 2, 1, 2, 179, 'unloading', 'good', 'completed', '2025-09-01 07:44:24', 'r1c2', '2025-09-01 07:44:24', '2025-09-01 07:44:24'),
(64, 31, 2, 1, 2, 180, 'unloading', 'good', 'completed', '2025-09-01 07:44:55', 'inyard', '2025-09-01 07:44:55', '2025-09-01 07:44:55');

-- --------------------------------------------------------

--
-- Struktur dari tabel `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `locations`
--

CREATE TABLE `locations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `zone` varchar(255) NOT NULL,
  `columns` bigint(20) UNSIGNED NOT NULL,
  `rows` bigint(20) UNSIGNED NOT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `locations`
--

INSERT INTO `locations` (`id`, `zone`, `columns`, `rows`, `status`, `created_at`, `updated_at`) VALUES
(1, 'EVERGREEN', 1, 1, 'active', '2025-08-03 17:37:31', '2025-08-03 17:37:31'),
(2, 'EVERGREEN', 2, 1, 'active', '2025-08-03 18:35:18', '2025-08-03 18:35:18'),
(3, 'EVERGREEN', 3, 1, 'active', '2025-08-04 05:33:22', '2025-08-04 05:33:22'),
(4, 'EVERGREEN', 4, 1, 'active', '2025-08-07 09:14:05', '2025-08-07 09:14:05'),
(5, 'EVERGREEN', 5, 1, 'active', '2025-08-07 09:15:39', '2025-08-07 09:15:44');

-- --------------------------------------------------------

--
-- Struktur dari tabel `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_08_01_113641_create_locations_table', 2),
(5, '2025_08_01_114329_create_customers_table', 3),
(6, '2025_08_01_113842_create_containers_table', 4),
(7, '2025_08_08_121426_create_taks_table', 5),
(8, '2025_08_08_150848_taks_assignments', 5),
(9, '2025_08_17_013414_create_histories_table', 6);

-- --------------------------------------------------------

--
-- Struktur dari tabel `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('BKKJpGMGfKrgCBVmDr1hzF4B2tKwAykIsHxb3JWD', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoibEt5amFJWVgwcm9WSWhNMkJMTWZUem84aDB3WXluOHRSQ0N5bjQwRiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1756279507),
('bycXPBKCbH5EmmJwNOFeVl21GVwQpi0iMRUGpPnv', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicHpJMnNURUJnUzlYYjB5ZU9scm10RjJhV1doSzhYT0duMDU0bnQwZiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1756448692),
('KHal0GLW9yPv5sEvrZWaBGK54vWs2wiqQgls24Tk', 2, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36 Edg/139.0.0.0', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoid1V5bGpWNENOWDBzR25acnZ2aEg2YTJFc3VzdnBkbVRoRWUybXljYyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MjtzOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czo0NDoiaHR0cDovLzEyNy4wLjAuMTo4MDAwL3VzZXIvcG9zaXRpb25zLzYyL21vdmUiO319', 1756281736),
('mANqllBjrcBon3fUOn1aSN9KYrWASrPtfhtq3kmV', 2, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoieWlvRURFb0Y1bG5DMVE4MnBCd0Z0RDAzdzZ4QVlpOHFtTTJqVnBZdyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MjtzOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czozMToiaHR0cDovLzEyNy4wLjAuMTo4MDAwL2Rhc2hib2FyZCI7fX0=', 1756712701),
('NGHj8f4pB6IY9Bx04DcSHNcm55nFd9B0P5tBOikH', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoieVRUSExDc3hGNEU5akFKOWtXdXhIOW02U1FhTVJHM01sRTYwVEhPdCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzc6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hZG1pbi9kYXNoYm9hcmQiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToxO30=', 1756712606),
('XetDQmKivjYCVU86nsdygsl2RRlsAHpV1rAuqniE', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicWVMV2o0OUdqelRJNWY3cHNMcUxOUjZtY1ZlQjhIeEJLcHpERmJJMyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTt9', 1756664725);

-- --------------------------------------------------------

--
-- Struktur dari tabel `task`
--

CREATE TABLE `task` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `container_id` bigint(20) UNSIGNED DEFAULT NULL,
  `customer_id` bigint(20) UNSIGNED DEFAULT NULL,
  `type` enum('loading','unloading') NOT NULL,
  `status` enum('pending','in_progress','completed','cancelled') NOT NULL,
  `requested_by` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `task`
--

INSERT INTO `task` (`id`, `title`, `description`, `container_id`, `customer_id`, `type`, `status`, `requested_by`, `created_at`, `updated_at`) VALUES
(28, 'Loading Container CT001 ke PT SAMUDRA LINTAS DUNIA', 'SEGERA LOADING', 29, 2, 'loading', 'completed', 1, '2025-08-12 09:49:23', '2025-08-12 09:54:02'),
(29, 'Unloading Container CT001 dari PT SAMUDRA LINTAS DUNIA', 'Unloading', 29, 2, 'unloading', 'completed', 1, '2025-08-12 17:05:14', '2025-08-12 17:06:04'),
(30, 'Loading Container CT006 ke PT EVERGREEN LOGISTIK INDONESIA', NULL, 34, 1, 'loading', 'completed', 1, '2025-08-12 17:22:58', '2025-08-12 17:34:15'),
(31, 'Loading Container CT007 ke PT SAMUDRA LINTAS DUNIA', 'ASD', 35, 2, 'loading', 'completed', 1, '2025-08-12 17:43:44', '2025-08-12 17:50:01'),
(32, 'Unloading Container CT006 dari PT EVERGREEN LOGISTIK INDONESIA', 'Unloading', 34, 1, 'unloading', 'completed', 1, '2025-08-12 17:52:36', '2025-08-12 18:14:08'),
(33, 'Loading Container CT011 ke PT EVERGREEN LOGISTIK INDONESIA', NULL, 40, 1, 'loading', 'completed', 1, '2025-08-12 18:02:51', '2025-08-13 10:15:17'),
(34, 'Loading Container CT013 ke PT EVERGREEN LOGISTIK INDONESIA', NULL, 42, 1, 'loading', 'completed', 1, '2025-08-12 18:15:37', '2025-08-12 18:22:02'),
(35, 'Unloading Container CT011 dari PT EVERGREEN LOGISTIK INDONESIA', 'Unloading', 40, 1, 'unloading', 'completed', 1, '2025-08-13 10:16:52', '2025-08-13 10:17:19'),
(36, 'Unloading Container CT013 dari PT EVERGREEN LOGISTIK INDONESIA', 'Unloading', 42, 1, 'unloading', 'completed', 1, '2025-08-13 12:44:21', '2025-08-13 12:44:49'),
(37, 'Unloading Container CT007 dari PT SAMUDRA LINTAS DUNIA', 'Tester', 35, 2, 'unloading', 'completed', 1, '2025-08-13 12:50:08', '2025-08-13 12:50:36'),
(38, 'Loading Container CT014 ke PT SAMUDRA LINTAS DUNIA', 'Loading', 43, 2, 'loading', 'completed', 1, '2025-08-13 13:01:56', '2025-08-13 13:04:59'),
(39, 'Loading Container CT003 ke PT EVERGREEN LOGISTIK INDONESIA', 'Loading', 31, 1, 'loading', 'completed', 1, '2025-08-13 13:03:01', '2025-08-13 13:03:48'),
(40, 'Unloading Container CT014 dari PT SAMUDRA LINTAS DUNIA', 'Unloading', 43, 2, 'unloading', 'completed', 1, '2025-08-13 13:05:24', '2025-08-13 13:06:27'),
(41, 'Unloading Container CT003 dari PT EVERGREEN LOGISTIK INDONESIA', 'Unloading', 31, 1, 'unloading', 'completed', 1, '2025-08-13 13:05:48', '2025-08-13 13:06:59'),
(42, 'Loading Container CT001 ke PT SAMUDRA LINTAS DUNIA', NULL, 29, 2, 'loading', 'completed', 1, '2025-08-13 13:07:33', '2025-08-13 13:07:51'),
(43, 'Unloading Container CT001 dari PT SAMUDRA LINTAS DUNIA', NULL, 29, 2, 'unloading', 'completed', 1, '2025-08-13 13:11:53', '2025-08-13 13:12:20'),
(44, 'Loading Container CT001 ke PT SAMUDRA LINTAS DUNIA', NULL, 29, 2, 'loading', 'completed', 1, '2025-08-13 13:17:26', '2025-08-13 13:17:49'),
(45, 'Loading Container CT002 ke PT EVERGREEN LOGISTIK INDONESIA', NULL, 30, 1, 'loading', 'completed', 1, '2025-08-13 13:20:05', '2025-08-13 13:20:22'),
(46, 'Loading Container CT003 ke PT EVERGREEN LOGISTIK INDONESIA', NULL, 31, 1, 'loading', 'completed', 1, '2025-08-13 13:22:36', '2025-08-13 13:22:55'),
(47, 'Unloading Container CT002 dari PT EVERGREEN LOGISTIK INDONESIA', NULL, 30, 1, 'unloading', 'completed', 1, '2025-08-13 13:27:40', '2025-08-13 13:27:56'),
(48, 'Unloading Container CT003 dari PT EVERGREEN LOGISTIK INDONESIA', NULL, 31, 1, 'unloading', 'completed', 1, '2025-08-13 13:29:29', '2025-08-13 13:29:44'),
(49, 'Unloading Container CT001 dari PT SAMUDRA LINTAS DUNIA', NULL, 29, 2, 'unloading', 'completed', 1, '2025-08-13 13:30:26', '2025-08-13 13:30:41'),
(50, 'Loading Container CT001 ke PT SAMUDRA LINTAS DUNIA', NULL, 29, 2, 'loading', 'completed', 1, '2025-08-13 13:31:19', '2025-08-13 13:31:38'),
(51, 'Unloading Container CT001 dari PT SAMUDRA LINTAS DUNIA', NULL, 29, 2, 'unloading', 'completed', 1, '2025-08-13 13:34:10', '2025-08-13 13:34:42'),
(52, 'Loading Container CT011 ke PT EVERGREEN LOGISTIK INDONESIA', 'Loading', 40, 1, 'loading', 'completed', 1, '2025-08-14 02:52:56', '2025-08-14 02:53:11'),
(53, 'Loading Container CT001 ke PT SAMUDRA LINTAS DUNIA', NULL, 29, 2, 'loading', 'completed', 1, '2025-08-14 02:55:47', '2025-08-14 02:56:15'),
(54, 'Loading Container CT002 ke PT EVERGREEN LOGISTIK INDONESIA', NULL, 30, 1, 'loading', 'completed', 1, '2025-08-14 03:01:17', '2025-08-14 03:01:36'),
(55, 'Loading Container CT003 ke PT EVERGREEN LOGISTIK INDONESIA', NULL, 31, 1, 'loading', 'completed', 1, '2025-08-14 03:18:35', '2025-08-14 03:19:27'),
(56, 'Unloading Container CT003 dari PT EVERGREEN LOGISTIK INDONESIA', NULL, 31, 1, 'unloading', 'completed', 1, '2025-08-14 03:22:04', '2025-08-14 03:22:23'),
(57, 'Loading Container CT006 ke PT EVERGREEN LOGISTIK INDONESIA', NULL, 34, 1, 'loading', 'completed', 1, '2025-08-14 03:22:40', '2025-08-14 03:22:56'),
(58, 'Unloading Container CT001 dari PT SAMUDRA LINTAS DUNIA', 'Unloading', 29, 2, 'unloading', 'completed', 1, '2025-08-14 03:31:50', '2025-08-14 04:16:52'),
(59, 'Unloading Container CT002 dari PT EVERGREEN LOGISTIK INDONESIA', 'Unloading', 30, 1, 'unloading', 'completed', 1, '2025-08-14 03:32:06', '2025-08-14 04:20:10'),
(60, 'Unloading Container CT006 dari PT EVERGREEN LOGISTIK INDONESIA', 'Unloading', 34, 1, 'unloading', 'completed', 1, '2025-08-14 03:32:31', '2025-08-14 04:18:17'),
(61, 'Unloading Container CT011 dari PT EVERGREEN LOGISTIK INDONESIA', 'Unloading', 40, 1, 'unloading', 'completed', 1, '2025-08-14 03:32:46', '2025-08-14 03:33:24'),
(62, 'Loading Container CT001 ke PT SAMUDRA LINTAS DUNIA', NULL, 29, 2, 'loading', 'completed', 1, '2025-08-14 04:22:41', '2025-08-14 04:23:09'),
(63, 'Loading Container CT002 ke PT EVERGREEN LOGISTIK INDONESIA', NULL, 30, 1, 'loading', 'completed', 1, '2025-08-14 04:23:47', '2025-08-14 04:26:52'),
(64, 'Loading Container CT003 ke PT EVERGREEN LOGISTIK INDONESIA', NULL, 31, 1, 'loading', 'completed', 1, '2025-08-14 04:27:21', '2025-08-14 04:27:37'),
(65, 'Loading Container CT006 ke PT EVERGREEN LOGISTIK INDONESIA', NULL, 34, 1, 'loading', 'completed', 1, '2025-08-14 04:28:47', '2025-08-14 04:29:03'),
(66, 'Loading Container CT007 ke PT SAMUDRA LINTAS DUNIA', NULL, 35, 2, 'loading', 'completed', 1, '2025-08-14 04:33:19', '2025-08-14 04:34:42'),
(67, 'Loading Container CT008 ke PT SAMUDRA LINTAS DUNIA', NULL, 37, 2, 'loading', 'completed', 1, '2025-08-14 04:36:40', '2025-08-14 04:36:55'),
(68, 'Unloading Container CT002 dari PT EVERGREEN LOGISTIK INDONESIA', NULL, 30, 1, 'unloading', 'completed', 1, '2025-08-14 09:18:03', '2025-08-14 18:08:15'),
(69, 'Unloading Container CT003 dari PT EVERGREEN LOGISTIK INDONESIA', NULL, 31, 1, 'unloading', 'completed', 1, '2025-08-14 09:18:35', '2025-08-14 18:05:55'),
(70, 'Unloading Container CT006 dari PT EVERGREEN LOGISTIK INDONESIA', NULL, 34, 1, 'unloading', 'completed', 1, '2025-08-14 09:18:46', '2025-08-14 18:04:00'),
(71, 'Unloading Container CT001 dari PT SAMUDRA LINTAS DUNIA', NULL, 29, 2, 'unloading', 'completed', 1, '2025-08-14 09:19:08', '2025-08-14 18:01:38'),
(72, 'Unloading Container CT007 dari PT SAMUDRA LINTAS DUNIA', NULL, 35, 2, 'unloading', 'completed', 1, '2025-08-14 09:19:19', '2025-08-14 17:58:46'),
(73, 'Unloading Container CT008 dari PT SAMUDRA LINTAS DUNIA', NULL, 37, 2, 'unloading', 'completed', 1, '2025-08-14 09:19:30', '2025-08-14 09:20:02'),
(74, 'Loading Container CT001 ke PT SAMUDRA LINTAS DUNIA', NULL, 29, 2, 'loading', 'completed', 1, '2025-08-14 18:11:14', '2025-08-14 18:26:55'),
(75, 'Loading Container CT002 ke PT EVERGREEN LOGISTIK INDONESIA', NULL, 30, 1, 'loading', 'completed', 1, '2025-08-14 18:11:24', '2025-08-14 18:18:40'),
(76, 'Loading Container CT003 ke PT EVERGREEN LOGISTIK INDONESIA', NULL, 31, 1, 'loading', 'completed', 1, '2025-08-14 18:11:36', '2025-08-14 18:17:22'),
(77, 'Unloading Container CT002 dari PT EVERGREEN LOGISTIK INDONESIA', NULL, 30, 1, 'unloading', 'completed', 1, '2025-08-14 18:34:03', '2025-08-14 18:35:40'),
(78, 'Loading Container CT002 ke PT EVERGREEN LOGISTIK INDONESIA', NULL, 30, 1, 'loading', 'completed', 1, '2025-08-14 18:47:56', '2025-08-14 19:04:33'),
(79, 'Loading Container CT006 ke PT EVERGREEN LOGISTIK INDONESIA', NULL, 34, 1, 'loading', 'completed', 1, '2025-08-14 19:03:24', '2025-08-14 19:04:44'),
(80, 'Loading Container CT009 ke PT EVERGREEN LOGISTIK INDONESIA', NULL, 38, 1, 'loading', 'completed', 1, '2025-08-14 19:04:01', '2025-08-14 19:08:48'),
(81, 'Unloading Container CT002 dari PT EVERGREEN LOGISTIK INDONESIA', NULL, 30, 1, 'unloading', 'completed', 1, '2025-08-14 19:05:06', '2025-08-14 19:09:04'),
(82, 'Unloading Container CT003 dari PT EVERGREEN LOGISTIK INDONESIA', NULL, 31, 1, 'unloading', 'completed', 1, '2025-08-14 19:07:00', '2025-08-14 19:09:19'),
(83, 'Unloading Container CT001 dari PT SAMUDRA LINTAS DUNIA', NULL, 29, 2, 'unloading', 'completed', 1, '2025-08-14 19:07:13', '2025-08-14 19:08:29'),
(84, 'Unloading Container CT006 dari PT EVERGREEN LOGISTIK INDONESIA', NULL, 34, 1, 'unloading', 'completed', 1, '2025-08-14 19:07:23', '2025-08-14 19:08:16'),
(85, 'Unloading Container CT009 dari PT EVERGREEN LOGISTIK INDONESIA', NULL, 38, 1, 'unloading', 'completed', 1, '2025-08-14 19:09:40', '2025-08-14 19:09:55'),
(86, 'Loading Container CT001 ke PT SAMUDRA LINTAS DUNIA', 'Loading ke truck kuning', 29, 2, 'loading', 'completed', 1, '2025-08-15 15:56:52', '2025-08-15 16:18:02'),
(87, 'Loading Container CT002 ke PT EVERGREEN LOGISTIK INDONESIA', 'Loading ke truck biru', 30, 1, 'loading', 'completed', 1, '2025-08-15 15:57:08', '2025-08-15 16:20:08'),
(88, 'Loading Container CT003 ke PT EVERGREEN LOGISTIK INDONESIA', 'Loading ke truck merah', 31, 1, 'loading', 'completed', 1, '2025-08-15 15:57:25', '2025-08-15 16:41:36'),
(89, 'Loading Container CT006 ke PT EVERGREEN LOGISTIK INDONESIA', 'Loading ke beko', 34, 1, 'loading', 'completed', 1, '2025-08-15 16:46:52', '2025-08-15 16:47:08'),
(90, 'Unloading Container CT006 dari PT EVERGREEN LOGISTIK INDONESIA', 'Unloading', 34, 1, 'unloading', 'completed', 1, '2025-08-15 17:00:51', '2025-08-15 17:01:45'),
(91, 'Loading Container CT006 ke PT EVERGREEN LOGISTIK INDONESIA', 'Loading ke truck', 34, 1, 'loading', 'completed', 1, '2025-08-15 19:41:42', '2025-08-15 19:46:35'),
(92, 'Loading Container CT007 ke PT SAMUDRA LINTAS DUNIA', 'Loading', 35, 2, 'loading', 'completed', 1, '2025-08-15 19:46:58', '2025-08-15 19:56:49'),
(93, 'Loading Container CT008 ke PT SAMUDRA LINTAS DUNIA', 'Loading', 37, 2, 'loading', 'completed', 1, '2025-08-15 19:57:16', '2025-08-15 20:01:01'),
(94, 'Unloading Container CT002 dari PT EVERGREEN LOGISTIK INDONESIA', 'Unloading', 30, 1, 'unloading', 'completed', 1, '2025-08-15 19:57:30', '2025-08-15 20:21:20'),
(95, 'Unloading Container CT003 dari PT EVERGREEN LOGISTIK INDONESIA', 'Unloading', 31, 1, 'unloading', 'completed', 1, '2025-08-15 19:57:49', '2025-08-15 20:25:16'),
(96, 'Unloading Container CT006 dari PT EVERGREEN LOGISTIK INDONESIA', 'Unloading', 34, 1, 'unloading', 'completed', 1, '2025-08-15 19:58:14', '2025-08-15 20:50:48'),
(97, 'Unloading Container CT001 dari PT SAMUDRA LINTAS DUNIA', 'Unloading', 29, 2, 'unloading', 'completed', 1, '2025-08-15 19:58:32', '2025-08-15 20:51:04'),
(98, 'Unloading Container CT007 dari PT SAMUDRA LINTAS DUNIA', 'Unloading', 35, 2, 'unloading', 'completed', 1, '2025-08-15 19:58:51', '2025-08-15 20:51:26'),
(99, 'Unloading Container CT008 dari PT SAMUDRA LINTAS DUNIA', 'Unloading', 37, 2, 'unloading', 'completed', 1, '2025-08-15 20:20:24', '2025-08-15 20:51:38'),
(100, 'Loading Container CT010 ke PT EVERGREEN LOGISTIK INDONESIA', 'Loading', 62, 1, 'loading', 'completed', 1, '2025-08-16 04:39:13', '2025-08-16 04:40:22'),
(101, 'Loading Container CT015 ke PT EVERGREEN LOGISTIK INDONESIA', 'Loading', 44, 1, 'loading', 'completed', 1, '2025-08-16 04:43:14', '2025-08-16 04:43:49'),
(102, 'Loading Container CT001 ke PT SAMUDRA LINTAS DUNIA', 'Loading', 29, 2, 'loading', 'completed', 1, '2025-08-16 05:16:10', '2025-08-16 08:47:55'),
(103, 'Loading Container CT002 ke PT EVERGREEN LOGISTIK INDONESIA', 'Loading', 30, 1, 'loading', 'completed', 1, '2025-08-16 05:32:26', '2025-08-16 08:48:08'),
(104, 'Loading Container CT003 ke PT EVERGREEN LOGISTIK INDONESIA', NULL, 31, 1, 'loading', 'completed', 1, '2025-08-16 05:33:01', '2025-08-16 08:48:45'),
(105, 'Loading Container CT006 ke PT EVERGREEN LOGISTIK INDONESIA', NULL, 34, 1, 'loading', 'completed', 1, '2025-08-16 05:33:41', '2025-08-16 12:02:44'),
(106, 'Loading Container CT007 ke PT SAMUDRA LINTAS DUNIA', NULL, 35, 2, 'loading', 'completed', 1, '2025-08-16 05:35:56', '2025-08-16 12:03:08'),
(107, 'Loading Container CT008 ke PT SAMUDRA LINTAS DUNIA', NULL, 37, 2, 'loading', 'completed', 1, '2025-08-16 05:42:27', '2025-08-16 14:37:43'),
(108, 'Loading Container CT009 ke PT EVERGREEN LOGISTIK INDONESIA', NULL, 38, 1, 'loading', 'cancelled', 1, '2025-08-16 05:42:41', '2025-08-16 12:53:56'),
(109, 'Loading Container CT011 ke PT EVERGREEN LOGISTIK INDONESIA', NULL, 40, 1, 'loading', 'cancelled', 1, '2025-08-16 05:47:07', '2025-08-16 13:14:35'),
(110, 'Loading Container CT012 ke PT LINTAS ANTAR BENUA', NULL, 41, 5, 'loading', 'cancelled', 1, '2025-08-16 08:26:48', '2025-08-16 14:58:09'),
(111, 'Loading Container CT013 ke PT EVERGREEN LOGISTIK INDONESIA', NULL, 42, 1, 'loading', 'completed', 1, '2025-08-16 08:28:51', '2025-08-17 06:48:01'),
(112, 'Loading Container CT014 ke PT SAMUDRA LINTAS DUNIA', NULL, 43, 2, 'loading', 'completed', 1, '2025-08-16 08:29:56', '2025-08-17 07:20:11'),
(113, 'Loading Container CT016 ke PT LOGISTIC INTERNATIONAL', NULL, 45, 3, 'loading', 'completed', 1, '2025-08-16 08:30:51', '2025-08-17 07:21:39'),
(114, 'Unloading Container CT002 dari PT EVERGREEN LOGISTIK INDONESIA', 'unloading', 30, 1, 'unloading', 'completed', 1, '2025-08-16 15:07:34', '2025-08-17 14:19:12'),
(115, 'Unloading Container CT003 dari PT EVERGREEN LOGISTIK INDONESIA', 'unloading', 31, 1, 'unloading', 'completed', 1, '2025-08-16 15:07:45', '2025-08-17 14:22:01'),
(116, 'Unloading Container CT006 dari PT EVERGREEN LOGISTIK INDONESIA', 'unloading', 34, 1, 'unloading', 'cancelled', 1, '2025-08-16 15:07:55', '2025-08-17 08:25:31'),
(117, 'Unloading Container CT006 dari PT EVERGREEN LOGISTIK INDONESIA', 'segera', 34, 1, 'unloading', 'completed', 1, '2025-08-17 14:37:34', '2025-08-17 14:41:59'),
(118, 'Unloading Container CT013 dari PT EVERGREEN LOGISTIK INDONESIA', 'segera', 42, 1, 'unloading', 'completed', 1, '2025-08-17 14:37:54', '2025-08-17 14:42:26'),
(119, 'Unloading Container CT015 dari PT EVERGREEN LOGISTIK INDONESIA', 'segera', 44, 1, 'unloading', 'completed', 1, '2025-08-17 14:38:14', '2025-08-17 14:42:44'),
(120, 'Unloading Container CT010 dari PT EVERGREEN LOGISTIK INDONESIA', 'segera', 62, 1, 'unloading', 'completed', 1, '2025-08-17 14:38:29', '2025-08-17 14:43:12'),
(121, 'Unloading Container CT001 dari PT SAMUDRA LINTAS DUNIA', 'segera', 29, 2, 'unloading', 'completed', 1, '2025-08-17 14:38:49', '2025-08-17 14:43:41'),
(122, 'Unloading Container CT007 dari PT SAMUDRA LINTAS DUNIA', NULL, 35, 2, 'unloading', 'completed', 1, '2025-08-17 14:44:39', '2025-08-17 14:45:55'),
(123, 'Unloading Container CT008 dari PT SAMUDRA LINTAS DUNIA', NULL, 37, 2, 'unloading', 'completed', 1, '2025-08-17 14:45:01', '2025-08-17 14:47:56'),
(124, 'Unloading Container CT014 dari PT SAMUDRA LINTAS DUNIA', NULL, 43, 2, 'unloading', 'completed', 1, '2025-08-17 14:45:16', '2025-08-17 14:48:19'),
(125, 'Unloading Container CT016 dari PT LOGISTIC INTERNATIONAL', NULL, 45, 3, 'unloading', 'completed', 1, '2025-08-17 14:45:27', '2025-08-17 14:48:09'),
(126, 'Loading Container CT013 ke PT EVERGREEN LOGISTIK INDONESIA', 'loading ke truck', 42, 1, 'loading', 'completed', 1, '2025-08-17 14:49:08', '2025-08-17 14:49:41'),
(127, 'Unloading Container CT013 dari PT EVERGREEN LOGISTIK INDONESIA', NULL, 42, 1, 'unloading', 'completed', 1, '2025-08-17 15:31:36', '2025-08-17 15:32:08'),
(128, 'Loading Container CT013 ke PT EVERGREEN LOGISTIK INDONESIA', NULL, 42, 1, 'loading', 'completed', 1, '2025-08-17 15:35:33', '2025-08-17 15:35:58'),
(129, 'Unloading Container CT013 dari PT EVERGREEN LOGISTIK INDONESIA', NULL, 42, 1, 'unloading', 'completed', 1, '2025-08-18 07:02:44', '2025-08-18 07:03:26'),
(130, 'Loading Container CT002 ke PT EVERGREEN LOGISTIK INDONESIA', 'loading', 30, 1, 'loading', 'cancelled', 1, '2025-08-18 07:27:00', '2025-08-18 13:53:25'),
(131, 'Loading Container CT001 ke PT SAMUDRA LINTAS DUNIA', 'Loading', 29, 2, 'loading', 'completed', 1, '2025-08-18 07:48:07', '2025-08-18 14:06:35'),
(132, 'Loading Container CT006 ke PT EVERGREEN LOGISTIK INDONESIA', 'loading', 34, 1, 'loading', 'completed', 1, '2025-08-18 13:47:30', '2025-08-18 13:48:11'),
(133, 'Loading Container CT007 ke PT SAMUDRA LINTAS DUNIA', 'loading', 35, 2, 'loading', 'completed', 1, '2025-08-18 13:50:21', '2025-08-18 13:50:49'),
(134, 'Unloading Container CT006 dari PT EVERGREEN LOGISTIK INDONESIA', 'unloading', 34, 1, 'unloading', 'completed', 1, '2025-08-18 14:14:41', '2025-08-18 14:25:44'),
(135, 'Unloading Container CT001 dari PT SAMUDRA LINTAS DUNIA', 'unloading', 29, 2, 'unloading', 'completed', 1, '2025-08-18 14:20:18', '2025-08-18 14:27:15'),
(136, 'Unloading Container CT007 dari PT SAMUDRA LINTAS DUNIA', 'unloading', 35, 2, 'unloading', 'completed', 1, '2025-08-18 14:27:56', '2025-08-18 15:01:00'),
(137, 'Loading Container CT025 ke PT EVERGREEN LOGISTIK INDONESIA', 'loading', 56, 1, 'loading', 'completed', 1, '2025-08-18 14:28:34', '2025-08-18 14:29:38'),
(138, 'Unloading Container CT025 dari PT EVERGREEN LOGISTIK INDONESIA', 'unloading', 56, 1, 'unloading', 'completed', 1, '2025-08-18 14:30:00', '2025-08-18 14:30:21'),
(139, 'Loading Container CT010 ke PT EVERGREEN LOGISTIK INDONESIA', 'loading', 62, 1, 'loading', 'completed', 1, '2025-08-18 15:02:40', '2025-08-18 16:50:52'),
(140, 'Loading Container CT023 ke PT MAJU CONTAINER ABADI', 'loading', 54, 7, 'loading', 'completed', 1, '2025-08-18 16:53:11', '2025-08-18 16:54:42'),
(141, 'Loading Container CT006 ke PT EVERGREEN LOGISTIK INDONESIA', 'loading', 34, 1, 'loading', 'completed', 1, '2025-08-18 16:53:22', '2025-08-18 16:55:46'),
(142, 'Loading Container CT014 ke PT SAMUDRA LINTAS DUNIA', 'loading', 43, 2, 'loading', 'completed', 1, '2025-08-18 16:53:35', '2025-08-18 17:04:35'),
(143, 'Loading Container CT001 ke PT SAMUDRA LINTAS DUNIA', 'loading', 29, 2, 'loading', 'completed', 1, '2025-08-18 17:06:11', '2025-08-18 17:06:42'),
(144, 'Loading Container CT003 ke PT EVERGREEN LOGISTIK INDONESIA', 'loading', 31, 1, 'loading', 'completed', 1, '2025-08-18 17:26:24', '2025-08-18 17:26:42'),
(145, 'Loading Container CT002 ke PT EVERGREEN LOGISTIK INDONESIA', 'loading', 30, 1, 'loading', 'completed', 1, '2025-08-18 17:27:11', '2025-08-18 17:50:02'),
(146, 'Unloading Container CT001 dari PT SAMUDRA LINTAS DUNIA', 'unloading', 29, 2, 'unloading', 'completed', 1, '2025-08-18 17:32:42', '2025-08-18 17:48:53'),
(147, 'Unloading Container CT010 dari PT EVERGREEN LOGISTIK INDONESIA', 'unloading', 62, 1, 'unloading', 'completed', 1, '2025-08-18 17:33:00', '2025-08-18 17:50:49'),
(148, 'Unloading Container CT003 dari PT EVERGREEN LOGISTIK INDONESIA', 'unloading', 31, 1, 'unloading', 'completed', 1, '2025-08-18 17:35:42', '2025-08-18 17:50:23'),
(149, 'Unloading Container CT014 dari PT SAMUDRA LINTAS DUNIA', 'unloading', 43, 2, 'unloading', 'completed', 1, '2025-08-18 17:35:55', '2025-08-20 05:57:52'),
(150, 'Loading Container CT009 ke PT EVERGREEN LOGISTIK INDONESIA', 'loading', 38, 1, 'loading', 'completed', 1, '2025-08-18 17:39:05', '2025-08-18 17:39:31'),
(151, 'Unloading Container CT009 dari PT EVERGREEN LOGISTIK INDONESIA', 'unloading', 38, 1, 'unloading', 'completed', 1, '2025-08-18 17:47:52', '2025-08-20 06:13:57'),
(152, 'Unloading Container CT006 dari PT EVERGREEN LOGISTIK INDONESIA', 'unloading', 34, 1, 'unloading', 'completed', 1, '2025-08-18 17:48:07', '2025-08-20 06:14:46'),
(153, 'Unloading Container CT002 dari PT EVERGREEN LOGISTIK INDONESIA', 'unloading', 30, 1, 'unloading', 'completed', 1, '2025-08-20 17:22:33', '2025-08-20 17:23:02'),
(154, 'Unloading Container CT023 dari PT MAJU CONTAINER ABADI', 'unloading', 54, 7, 'unloading', 'cancelled', 1, '2025-08-20 17:27:24', '2025-08-20 17:27:36'),
(155, 'Unloading Container CT023 dari PT MAJU CONTAINER ABADI', 'unloading', 54, 7, 'unloading', 'completed', 1, '2025-08-20 18:04:25', '2025-08-20 18:04:43'),
(156, 'Loading Container CT001 ke PT SAMUDRA LINTAS DUNIA', 'loading', 29, 2, 'loading', 'completed', 1, '2025-08-20 18:05:41', '2025-08-20 18:06:52'),
(157, 'Loading Container CT002 ke PT EVERGREEN LOGISTIK INDONESIA', 'loading', 30, 1, 'loading', 'completed', 1, '2025-08-20 18:05:51', '2025-08-20 18:07:05'),
(158, 'Loading Container CT003 ke PT EVERGREEN LOGISTIK INDONESIA', 'loading', 31, 1, 'loading', 'completed', 1, '2025-08-20 18:06:00', '2025-08-20 18:07:18'),
(159, 'Loading Container CT006 ke PT EVERGREEN LOGISTIK INDONESIA', 'loading', 34, 1, 'loading', 'completed', 1, '2025-08-20 18:06:10', '2025-08-20 18:07:34'),
(160, 'Loading Container CT007 ke PT SAMUDRA LINTAS DUNIA', 'loading', 35, 2, 'loading', 'completed', 1, '2025-08-20 18:06:21', '2025-08-20 18:07:53'),
(161, 'Loading Container CT008 ke PT SAMUDRA LINTAS DUNIA', 'loading', 37, 2, 'loading', 'completed', 1, '2025-08-21 12:07:01', '2025-08-21 12:08:35'),
(162, 'Loading Container CT009 ke PT EVERGREEN LOGISTIK INDONESIA', 'loading', 38, 1, 'loading', 'completed', 1, '2025-08-21 12:07:11', '2025-08-21 12:13:46'),
(163, 'Loading Container CT011 ke PT EVERGREEN LOGISTIK INDONESIA', 'loading', 40, 1, 'loading', 'completed', 1, '2025-08-21 12:07:23', '2025-08-22 17:40:20'),
(164, 'Loading Container CT012 ke PT LINTAS ANTAR BENUA', 'loading', 41, 5, 'loading', 'completed', 1, '2025-08-21 12:07:34', '2025-08-22 17:07:00'),
(165, 'Loading Container CT013 ke PT EVERGREEN LOGISTIK INDONESIA', 'loading', 42, 1, 'loading', 'cancelled', 1, '2025-08-21 12:07:51', '2025-08-22 17:08:27'),
(166, 'Loading Container CT014 ke PT SAMUDRA LINTAS DUNIA', 'loading', 43, 2, 'loading', 'completed', 1, '2025-08-21 12:08:03', '2025-08-22 17:47:31'),
(167, 'Loading Container CT017 ke PT LOGISTIC INTERNATIONAL', 'loading', 46, 3, 'loading', 'cancelled', 1, '2025-08-22 16:15:52', '2025-08-22 18:08:15'),
(168, 'Loading Container CT015 ke PT EVERGREEN LOGISTIK INDONESIA', 'Loading', 44, 1, 'loading', 'completed', 1, '2025-08-22 17:05:55', '2025-08-22 18:04:49'),
(169, 'Loading Container CT013 ke PT EVERGREEN LOGISTIK INDONESIA', 'loading', 42, 1, 'loading', 'cancelled', 1, '2025-08-22 18:08:05', '2025-08-22 18:08:41'),
(170, 'Loading Container CT013 ke PT EVERGREEN LOGISTIK INDONESIA', 'loading', 42, 1, 'loading', 'completed', 1, '2025-08-23 15:50:41', '2025-08-23 15:51:02'),
(171, 'Loading Container CT016 ke PT LOGISTIC INTERNATIONAL', 'loading', 45, 3, 'loading', 'completed', 1, '2025-08-23 16:03:18', '2025-08-23 16:04:24'),
(172, 'Loading Container CT017 ke PT LOGISTIC INTERNATIONAL', 'loading', 46, 3, 'loading', 'completed', 1, '2025-08-23 16:05:29', '2025-08-23 16:06:23'),
(173, 'Loading Container CT020 ke PT LOGISTIC INTERNATIONAL', 'loading', 51, 3, 'loading', 'completed', 1, '2025-08-23 16:08:10', '2025-08-23 16:12:47'),
(174, 'Loading Container CT021 ke PT SAMUDRA LINTAS DUNIA', 'loading', 52, 2, 'loading', 'cancelled', 1, '2025-08-23 16:14:23', '2025-08-23 16:19:36'),
(175, 'Loading Container CT022 ke PT LINTAS ANTAR BENUA', 'loading', 53, 5, 'loading', 'completed', 1, '2025-08-23 16:14:38', '2025-08-26 08:53:35'),
(176, 'Loading Container CT023 ke PT MAJU CONTAINER ABADI', 'loading', 54, 7, 'loading', 'completed', 1, '2025-08-23 16:14:50', '2025-08-26 08:53:54'),
(177, 'Loading Container CT021 ke PT SAMUDRA LINTAS DUNIA', 'loading', 52, 2, 'loading', 'completed', 1, '2025-08-26 08:53:00', '2025-08-26 08:54:07'),
(178, 'Loading Container CT024 ke PT PUNINAR LOGISTIK INDONESIA', 'segera', 55, 6, 'loading', 'completed', 1, '2025-08-27 07:42:19', '2025-08-27 08:02:13'),
(179, 'Unloading Container CT002 dari PT EVERGREEN LOGISTIK INDONESIA', 'unloading', 30, 1, 'unloading', 'completed', 1, '2025-09-01 07:42:56', '2025-09-01 07:44:24'),
(180, 'Unloading Container CT003 dari PT EVERGREEN LOGISTIK INDONESIA', 'unloading', 31, 1, 'unloading', 'completed', 1, '2025-09-01 07:43:11', '2025-09-01 07:44:55'),
(181, 'Unloading Container CT006 dari PT EVERGREEN LOGISTIK INDONESIA', 'unloading', 34, 1, 'unloading', 'completed', 1, '2025-09-01 07:43:24', '2025-09-01 07:44:07');

-- --------------------------------------------------------

--
-- Struktur dari tabel `task_assignments`
--

CREATE TABLE `task_assignments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `task_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `assigned_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `started_at` timestamp NULL DEFAULT NULL,
  `completed_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `task_assignments`
--

INSERT INTO `task_assignments` (`id`, `task_id`, `user_id`, `assigned_at`, `started_at`, `completed_at`) VALUES
(80, 28, 2, '2025-08-12 16:49:23', '2025-08-12 09:51:17', '2025-08-12 09:54:02'),
(81, 28, 3, '2025-08-12 16:49:23', NULL, NULL),
(83, 29, 2, '2025-08-12 17:05:14', '2025-08-12 17:05:34', '2025-08-12 17:06:04'),
(84, 29, 3, '2025-08-12 17:05:14', NULL, NULL),
(86, 30, 2, '2025-08-12 17:22:58', '2025-08-12 17:32:39', NULL),
(87, 30, 3, '2025-08-12 17:22:58', NULL, '2025-08-12 17:34:15'),
(89, 31, 2, '2025-08-12 17:43:44', '2025-08-12 17:47:43', '2025-08-12 17:50:01'),
(90, 31, 3, '2025-08-12 17:43:44', NULL, NULL),
(92, 32, 2, '2025-08-12 17:52:36', '2025-08-12 17:54:04', NULL),
(93, 32, 3, '2025-08-12 17:52:36', NULL, '2025-08-12 18:14:08'),
(95, 33, 2, '2025-08-12 18:02:51', NULL, '2025-08-13 10:15:17'),
(96, 33, 3, '2025-08-12 18:02:51', '2025-08-12 18:16:11', NULL),
(98, 34, 2, '2025-08-12 18:15:37', '2025-08-12 18:21:18', NULL),
(99, 34, 3, '2025-08-12 18:15:37', NULL, '2025-08-12 18:22:02'),
(101, 35, 2, '2025-08-13 10:16:52', '2025-08-13 10:17:07', '2025-08-13 10:17:19'),
(102, 35, 3, '2025-08-13 10:16:52', NULL, NULL),
(104, 36, 2, '2025-08-13 12:44:21', '2025-08-13 12:44:32', '2025-08-13 12:44:49'),
(105, 36, 3, '2025-08-13 12:44:21', NULL, NULL),
(107, 37, 2, '2025-08-13 12:50:08', '2025-08-13 12:50:22', '2025-08-13 12:50:36'),
(108, 37, 3, '2025-08-13 12:50:08', NULL, NULL),
(110, 38, 2, '2025-08-13 13:01:56', '2025-08-13 13:04:01', '2025-08-13 13:04:59'),
(111, 38, 3, '2025-08-13 13:01:56', NULL, NULL),
(113, 39, 2, '2025-08-13 13:03:01', '2025-08-13 13:03:16', '2025-08-13 13:03:48'),
(114, 39, 3, '2025-08-13 13:03:01', NULL, NULL),
(116, 40, 2, '2025-08-13 13:05:24', '2025-08-13 13:06:01', '2025-08-13 13:06:27'),
(117, 40, 3, '2025-08-13 13:05:24', NULL, NULL),
(119, 41, 2, '2025-08-13 13:05:48', '2025-08-13 13:06:53', '2025-08-13 13:06:59'),
(120, 41, 3, '2025-08-13 13:05:48', NULL, NULL),
(122, 42, 2, '2025-08-13 13:07:33', '2025-08-13 13:07:45', '2025-08-13 13:07:51'),
(123, 42, 3, '2025-08-13 13:07:33', NULL, NULL),
(125, 43, 2, '2025-08-13 13:11:53', '2025-08-13 13:12:03', '2025-08-13 13:12:20'),
(126, 43, 3, '2025-08-13 13:11:53', NULL, NULL),
(128, 44, 2, '2025-08-13 13:17:26', '2025-08-13 13:17:40', '2025-08-13 13:17:49'),
(129, 44, 3, '2025-08-13 13:17:26', NULL, NULL),
(131, 45, 2, '2025-08-13 13:20:05', '2025-08-13 13:20:14', '2025-08-13 13:20:22'),
(132, 45, 3, '2025-08-13 13:20:05', NULL, NULL),
(134, 46, 2, '2025-08-13 13:22:36', '2025-08-13 13:22:47', '2025-08-13 13:22:55'),
(135, 46, 3, '2025-08-13 13:22:36', NULL, NULL),
(137, 47, 2, '2025-08-13 13:27:40', '2025-08-13 13:27:49', '2025-08-13 13:27:56'),
(138, 47, 3, '2025-08-13 13:27:40', NULL, NULL),
(140, 48, 2, '2025-08-13 13:29:29', '2025-08-13 13:29:38', '2025-08-13 13:29:44'),
(141, 48, 3, '2025-08-13 13:29:29', NULL, NULL),
(143, 49, 2, '2025-08-13 13:30:26', '2025-08-13 13:30:34', '2025-08-13 13:30:41'),
(144, 49, 3, '2025-08-13 13:30:26', NULL, NULL),
(146, 50, 2, '2025-08-13 13:31:19', '2025-08-13 13:31:30', '2025-08-13 13:31:38'),
(147, 50, 3, '2025-08-13 13:31:19', NULL, NULL),
(149, 51, 2, '2025-08-13 13:34:10', '2025-08-13 13:34:33', '2025-08-13 13:34:42'),
(150, 51, 3, '2025-08-13 13:34:10', NULL, NULL),
(152, 52, 2, '2025-08-14 02:52:56', '2025-08-14 02:53:03', '2025-08-14 02:53:11'),
(153, 52, 3, '2025-08-14 02:52:56', NULL, NULL),
(155, 53, 2, '2025-08-14 02:55:47', '2025-08-14 02:56:05', '2025-08-14 02:56:15'),
(156, 53, 3, '2025-08-14 02:55:47', NULL, NULL),
(158, 54, 2, '2025-08-14 03:01:17', '2025-08-14 03:01:29', '2025-08-14 03:01:36'),
(159, 54, 3, '2025-08-14 03:01:17', NULL, NULL),
(161, 55, 2, '2025-08-14 03:18:35', '2025-08-14 03:18:47', '2025-08-14 03:19:27'),
(162, 55, 3, '2025-08-14 03:18:35', NULL, NULL),
(164, 56, 2, '2025-08-14 03:22:04', '2025-08-14 03:22:13', '2025-08-14 03:22:23'),
(165, 56, 3, '2025-08-14 03:22:04', NULL, NULL),
(167, 57, 2, '2025-08-14 03:22:40', '2025-08-14 03:22:48', '2025-08-14 03:22:56'),
(168, 57, 3, '2025-08-14 03:22:40', NULL, NULL),
(170, 58, 2, '2025-08-14 03:31:50', '2025-08-14 03:37:15', '2025-08-14 04:16:52'),
(171, 58, 3, '2025-08-14 03:31:50', NULL, NULL),
(173, 59, 2, '2025-08-14 03:32:06', '2025-08-14 04:20:04', '2025-08-14 04:20:10'),
(174, 59, 3, '2025-08-14 03:32:06', NULL, NULL),
(176, 60, 2, '2025-08-14 03:32:31', '2025-08-14 04:18:02', '2025-08-14 04:18:17'),
(177, 60, 3, '2025-08-14 03:32:31', NULL, NULL),
(179, 61, 2, '2025-08-14 03:32:46', '2025-08-14 03:33:04', '2025-08-14 03:33:24'),
(180, 61, 3, '2025-08-14 03:32:46', NULL, NULL),
(182, 62, 2, '2025-08-14 04:22:41', '2025-08-14 04:22:56', '2025-08-14 04:23:09'),
(183, 62, 3, '2025-08-14 04:22:41', NULL, NULL),
(185, 63, 2, '2025-08-14 04:23:47', '2025-08-14 04:24:02', '2025-08-14 04:26:52'),
(186, 63, 3, '2025-08-14 04:23:47', NULL, NULL),
(188, 64, 2, '2025-08-14 04:27:21', '2025-08-14 04:27:31', '2025-08-14 04:27:37'),
(189, 64, 3, '2025-08-14 04:27:21', NULL, NULL),
(191, 65, 2, '2025-08-14 04:28:47', '2025-08-14 04:28:56', '2025-08-14 04:29:03'),
(192, 65, 3, '2025-08-14 04:28:47', NULL, NULL),
(194, 66, 2, '2025-08-14 04:33:19', '2025-08-14 04:33:29', '2025-08-14 04:34:42'),
(195, 66, 3, '2025-08-14 04:33:19', NULL, NULL),
(197, 67, 2, '2025-08-14 04:36:40', '2025-08-14 04:36:49', '2025-08-14 04:36:55'),
(198, 67, 3, '2025-08-14 04:36:40', NULL, NULL),
(200, 68, 2, '2025-08-14 09:18:03', '2025-08-14 18:07:04', '2025-08-14 18:08:15'),
(201, 68, 3, '2025-08-14 09:18:03', NULL, NULL),
(203, 69, 2, '2025-08-14 09:18:35', '2025-08-14 18:05:49', '2025-08-14 18:05:55'),
(204, 69, 3, '2025-08-14 09:18:35', NULL, NULL),
(206, 70, 2, '2025-08-14 09:18:46', '2025-08-14 18:03:52', '2025-08-14 18:04:00'),
(207, 70, 3, '2025-08-14 09:18:46', NULL, NULL),
(209, 71, 2, '2025-08-14 09:19:08', '2025-08-14 18:01:26', '2025-08-14 18:01:38'),
(210, 71, 3, '2025-08-14 09:19:08', NULL, NULL),
(212, 72, 2, '2025-08-14 09:19:19', '2025-08-14 17:58:39', '2025-08-14 17:58:46'),
(213, 72, 3, '2025-08-14 09:19:19', NULL, NULL),
(215, 73, 2, '2025-08-14 09:19:30', '2025-08-14 09:19:55', '2025-08-14 09:20:02'),
(216, 73, 3, '2025-08-14 09:19:30', NULL, NULL),
(218, 74, 2, '2025-08-14 18:11:14', '2025-08-14 18:21:33', '2025-08-14 18:26:55'),
(219, 74, 3, '2025-08-14 18:11:14', NULL, NULL),
(221, 75, 2, '2025-08-14 18:11:24', '2025-08-14 18:18:33', '2025-08-14 18:18:40'),
(222, 75, 3, '2025-08-14 18:11:24', NULL, NULL),
(224, 76, 2, '2025-08-14 18:11:36', '2025-08-14 18:17:15', '2025-08-14 18:17:22'),
(225, 76, 3, '2025-08-14 18:11:36', NULL, NULL),
(227, 77, 2, '2025-08-14 18:34:03', '2025-08-14 18:35:35', '2025-08-14 18:35:40'),
(228, 77, 3, '2025-08-14 18:34:03', NULL, NULL),
(230, 78, 2, '2025-08-14 18:47:56', '2025-08-14 19:04:25', '2025-08-14 19:04:33'),
(231, 78, 3, '2025-08-14 18:47:56', NULL, NULL),
(233, 79, 2, '2025-08-14 19:03:24', '2025-08-14 19:04:37', '2025-08-14 19:04:44'),
(234, 79, 3, '2025-08-14 19:03:24', NULL, NULL),
(236, 80, 2, '2025-08-14 19:04:01', '2025-08-14 19:08:38', '2025-08-14 19:08:48'),
(237, 80, 3, '2025-08-14 19:04:01', NULL, NULL),
(239, 81, 2, '2025-08-14 19:05:06', '2025-08-14 19:08:55', '2025-08-14 19:09:04'),
(240, 81, 3, '2025-08-14 19:05:06', NULL, NULL),
(242, 82, 2, '2025-08-14 19:07:00', '2025-08-14 19:09:08', '2025-08-14 19:09:19'),
(243, 82, 3, '2025-08-14 19:07:00', NULL, NULL),
(245, 83, 2, '2025-08-14 19:07:13', '2025-08-14 19:08:21', '2025-08-14 19:08:29'),
(246, 83, 3, '2025-08-14 19:07:13', NULL, NULL),
(248, 84, 2, '2025-08-14 19:07:23', '2025-08-14 19:08:03', '2025-08-14 19:08:16'),
(249, 84, 3, '2025-08-14 19:07:23', NULL, NULL),
(251, 85, 2, '2025-08-14 19:09:40', '2025-08-14 19:09:50', '2025-08-14 19:09:55'),
(252, 85, 3, '2025-08-14 19:09:40', NULL, NULL),
(254, 86, 2, '2025-08-15 15:56:52', '2025-08-15 15:58:20', '2025-08-15 16:18:02'),
(255, 86, 3, '2025-08-15 15:56:52', NULL, NULL),
(257, 87, 2, '2025-08-15 15:57:08', '2025-08-15 16:06:59', '2025-08-15 16:20:08'),
(258, 87, 3, '2025-08-15 15:57:08', NULL, NULL),
(260, 88, 2, '2025-08-15 15:57:25', '2025-08-15 16:22:14', '2025-08-15 16:41:36'),
(261, 88, 3, '2025-08-15 15:57:25', NULL, NULL),
(263, 89, 2, '2025-08-15 16:46:52', '2025-08-15 16:47:01', '2025-08-15 16:47:08'),
(264, 89, 3, '2025-08-15 16:46:52', NULL, NULL),
(266, 90, 2, '2025-08-15 17:00:51', '2025-08-15 17:01:00', '2025-08-15 17:01:45'),
(267, 90, 3, '2025-08-15 17:00:51', NULL, NULL),
(269, 91, 2, '2025-08-15 19:41:42', '2025-08-15 19:46:27', '2025-08-15 19:46:35'),
(270, 91, 3, '2025-08-15 19:41:42', NULL, NULL),
(272, 92, 2, '2025-08-15 19:46:58', '2025-08-15 19:56:42', '2025-08-15 19:56:49'),
(273, 92, 3, '2025-08-15 19:46:58', NULL, NULL),
(275, 93, 2, '2025-08-15 19:57:16', '2025-08-15 19:59:58', '2025-08-15 20:01:01'),
(276, 93, 3, '2025-08-15 19:57:16', NULL, NULL),
(278, 94, 2, '2025-08-15 19:57:30', '2025-08-15 20:21:12', '2025-08-15 20:21:20'),
(279, 94, 3, '2025-08-15 19:57:30', NULL, NULL),
(281, 95, 2, '2025-08-15 19:57:49', '2025-08-15 20:24:46', '2025-08-15 20:25:16'),
(282, 95, 3, '2025-08-15 19:57:49', NULL, NULL),
(284, 96, 2, '2025-08-15 19:58:14', '2025-08-15 20:50:29', '2025-08-15 20:50:48'),
(285, 96, 3, '2025-08-15 19:58:14', NULL, NULL),
(287, 97, 2, '2025-08-15 19:58:32', '2025-08-15 20:50:57', '2025-08-15 20:51:04'),
(288, 97, 3, '2025-08-15 19:58:32', NULL, NULL),
(290, 98, 2, '2025-08-15 19:58:51', '2025-08-15 20:51:21', '2025-08-15 20:51:26'),
(291, 98, 3, '2025-08-15 19:58:51', NULL, NULL),
(293, 99, 2, '2025-08-15 20:20:24', '2025-08-15 20:51:32', '2025-08-15 20:51:38'),
(294, 99, 3, '2025-08-15 20:20:24', NULL, NULL),
(296, 100, 2, '2025-08-16 04:39:13', '2025-08-16 04:39:55', '2025-08-16 04:40:22'),
(297, 100, 3, '2025-08-16 04:39:13', NULL, NULL),
(299, 101, 2, '2025-08-16 04:43:14', '2025-08-16 04:43:32', '2025-08-16 04:43:49'),
(300, 101, 3, '2025-08-16 04:43:14', NULL, NULL),
(302, 102, 2, '2025-08-16 05:16:10', '2025-08-16 08:47:46', '2025-08-16 08:47:55'),
(303, 102, 3, '2025-08-16 05:16:10', NULL, NULL),
(305, 103, 2, '2025-08-16 05:32:26', '2025-08-16 08:48:02', '2025-08-16 08:48:08'),
(306, 103, 3, '2025-08-16 05:32:26', NULL, NULL),
(308, 104, 2, '2025-08-16 05:33:01', '2025-08-16 08:48:39', '2025-08-16 08:48:45'),
(309, 104, 3, '2025-08-16 05:33:01', NULL, NULL),
(311, 105, 2, '2025-08-16 05:33:41', '2025-08-16 11:53:11', '2025-08-16 12:02:44'),
(312, 105, 3, '2025-08-16 05:33:41', NULL, NULL),
(314, 106, 2, '2025-08-16 05:35:56', '2025-08-16 11:55:05', '2025-08-16 12:03:08'),
(315, 106, 3, '2025-08-16 05:35:56', NULL, NULL),
(317, 107, 2, '2025-08-16 05:42:27', '2025-08-16 12:19:36', '2025-08-16 14:37:43'),
(318, 107, 3, '2025-08-16 05:42:27', NULL, NULL),
(320, 108, 2, '2025-08-16 05:42:41', NULL, NULL),
(321, 108, 3, '2025-08-16 05:42:41', NULL, NULL),
(323, 109, 2, '2025-08-16 05:47:07', NULL, NULL),
(324, 109, 3, '2025-08-16 05:47:07', NULL, NULL),
(326, 110, 2, '2025-08-16 08:26:48', NULL, NULL),
(327, 110, 3, '2025-08-16 08:26:48', NULL, NULL),
(329, 111, 2, '2025-08-16 08:28:51', '2025-08-17 06:15:24', '2025-08-17 06:48:01'),
(330, 111, 3, '2025-08-16 08:28:51', NULL, NULL),
(332, 112, 2, '2025-08-16 08:29:56', '2025-08-17 07:20:00', '2025-08-17 07:20:11'),
(333, 112, 3, '2025-08-16 08:29:56', NULL, NULL),
(335, 113, 2, '2025-08-16 08:30:51', '2025-08-17 07:21:23', '2025-08-17 07:21:39'),
(336, 113, 3, '2025-08-16 08:30:51', NULL, NULL),
(338, 114, 2, '2025-08-16 15:07:34', '2025-08-16 15:08:06', '2025-08-17 14:19:12'),
(339, 114, 3, '2025-08-16 15:07:34', NULL, NULL),
(341, 115, 2, '2025-08-16 15:07:45', '2025-08-17 07:21:44', '2025-08-17 14:22:01'),
(342, 115, 3, '2025-08-16 15:07:45', NULL, NULL),
(344, 116, 2, '2025-08-16 15:07:55', NULL, NULL),
(345, 116, 3, '2025-08-16 15:07:55', NULL, NULL),
(347, 117, 2, '2025-08-17 14:37:34', '2025-08-17 14:41:46', '2025-08-17 14:41:59'),
(348, 117, 3, '2025-08-17 14:37:34', NULL, NULL),
(350, 118, 2, '2025-08-17 14:37:54', '2025-08-17 14:42:03', '2025-08-17 14:42:25'),
(351, 118, 3, '2025-08-17 14:37:54', NULL, NULL),
(353, 119, 2, '2025-08-17 14:38:14', '2025-08-17 14:42:30', '2025-08-17 14:42:44'),
(354, 119, 3, '2025-08-17 14:38:14', NULL, NULL),
(356, 120, 2, '2025-08-17 14:38:29', '2025-08-17 14:42:59', '2025-08-17 14:43:12'),
(357, 120, 3, '2025-08-17 14:38:29', NULL, NULL),
(359, 121, 2, '2025-08-17 14:38:49', '2025-08-17 14:43:16', '2025-08-17 14:43:41'),
(360, 121, 3, '2025-08-17 14:38:49', NULL, NULL),
(362, 122, 2, '2025-08-17 14:44:39', '2025-08-17 14:45:45', '2025-08-17 14:45:55'),
(363, 122, 3, '2025-08-17 14:44:39', NULL, NULL),
(365, 123, 2, '2025-08-17 14:45:01', '2025-08-17 14:47:45', '2025-08-17 14:47:56'),
(366, 123, 3, '2025-08-17 14:45:01', NULL, NULL),
(368, 124, 2, '2025-08-17 14:45:16', '2025-08-17 14:48:12', '2025-08-17 14:48:19'),
(369, 124, 3, '2025-08-17 14:45:16', NULL, NULL),
(371, 125, 2, '2025-08-17 14:45:27', '2025-08-17 14:48:01', '2025-08-17 14:48:09'),
(372, 125, 3, '2025-08-17 14:45:27', NULL, NULL),
(374, 126, 2, '2025-08-17 14:49:08', '2025-08-17 14:49:20', '2025-08-17 14:49:41'),
(375, 126, 3, '2025-08-17 14:49:08', NULL, NULL),
(377, 127, 2, '2025-08-17 15:31:36', '2025-08-17 15:31:52', '2025-08-17 15:32:08'),
(378, 127, 3, '2025-08-17 15:31:36', NULL, NULL),
(380, 128, 2, '2025-08-17 15:35:33', '2025-08-17 15:35:43', '2025-08-17 15:35:58'),
(381, 128, 3, '2025-08-17 15:35:33', NULL, NULL),
(383, 129, 2, '2025-08-18 07:02:44', '2025-08-18 07:03:15', '2025-08-18 07:03:26'),
(384, 129, 3, '2025-08-18 07:02:44', NULL, NULL),
(386, 130, 2, '2025-08-18 07:27:00', NULL, NULL),
(387, 130, 3, '2025-08-18 07:27:00', NULL, NULL),
(389, 131, 2, '2025-08-18 07:48:07', '2025-08-18 14:06:07', '2025-08-18 14:06:35'),
(390, 131, 3, '2025-08-18 07:48:07', '2025-08-18 07:48:20', NULL),
(392, 132, 2, '2025-08-18 13:47:30', '2025-08-18 13:47:58', '2025-08-18 13:48:11'),
(393, 132, 3, '2025-08-18 13:47:30', NULL, NULL),
(395, 133, 2, '2025-08-18 13:50:21', '2025-08-18 13:50:34', '2025-08-18 13:50:49'),
(396, 133, 3, '2025-08-18 13:50:21', NULL, NULL),
(398, 134, 2, '2025-08-18 14:14:41', NULL, NULL),
(399, 134, 3, '2025-08-18 14:14:41', '2025-08-18 14:15:00', '2025-08-18 14:25:44'),
(401, 135, 2, '2025-08-18 14:20:18', NULL, NULL),
(402, 135, 3, '2025-08-18 14:20:18', '2025-08-18 14:26:49', '2025-08-18 14:27:15'),
(404, 136, 2, '2025-08-18 14:27:56', '2025-08-18 14:57:22', NULL),
(405, 136, 3, '2025-08-18 14:27:56', '2025-08-18 14:51:37', '2025-08-18 15:01:00'),
(407, 137, 2, '2025-08-18 14:28:34', NULL, NULL),
(408, 137, 3, '2025-08-18 14:28:34', '2025-08-18 14:29:17', '2025-08-18 14:29:38'),
(410, 138, 2, '2025-08-18 14:30:00', NULL, NULL),
(411, 138, 3, '2025-08-18 14:30:00', '2025-08-18 14:30:09', '2025-08-18 14:30:21'),
(413, 139, 2, '2025-08-18 15:02:40', NULL, NULL),
(414, 139, 3, '2025-08-18 15:02:40', '2025-08-18 15:03:07', '2025-08-18 16:50:52'),
(416, 140, 2, '2025-08-18 16:53:11', '2025-08-18 16:54:30', '2025-08-18 16:54:42'),
(417, 140, 3, '2025-08-18 16:53:11', NULL, NULL),
(418, 141, 2, '2025-08-18 16:53:22', '2025-08-18 16:55:35', '2025-08-18 16:55:46'),
(419, 141, 3, '2025-08-18 16:53:22', NULL, NULL),
(420, 142, 2, '2025-08-18 16:53:35', '2025-08-18 17:04:24', '2025-08-18 17:04:35'),
(421, 142, 3, '2025-08-18 16:53:35', NULL, NULL),
(422, 143, 2, '2025-08-18 17:06:11', '2025-08-18 17:06:32', '2025-08-18 17:06:42'),
(423, 143, 3, '2025-08-18 17:06:11', NULL, NULL),
(424, 144, 2, '2025-08-18 17:26:24', '2025-08-18 17:26:33', '2025-08-18 17:26:42'),
(425, 144, 3, '2025-08-18 17:26:24', NULL, NULL),
(426, 145, 2, '2025-08-18 17:27:11', '2025-08-18 17:27:20', '2025-08-18 17:50:02'),
(427, 145, 3, '2025-08-18 17:27:11', NULL, NULL),
(428, 146, 2, '2025-08-18 17:32:42', '2025-08-18 17:48:43', '2025-08-18 17:48:53'),
(429, 146, 3, '2025-08-18 17:32:42', NULL, NULL),
(430, 147, 2, '2025-08-18 17:33:00', '2025-08-18 17:49:16', '2025-08-18 17:50:49'),
(431, 147, 3, '2025-08-18 17:33:00', NULL, NULL),
(432, 148, 2, '2025-08-18 17:35:42', NULL, NULL),
(433, 148, 3, '2025-08-18 17:35:42', '2025-08-18 17:49:36', '2025-08-18 17:50:23'),
(434, 149, 2, '2025-08-18 17:35:55', '2025-08-20 05:57:41', '2025-08-20 05:57:52'),
(435, 149, 3, '2025-08-18 17:35:55', NULL, NULL),
(436, 150, 2, '2025-08-18 17:39:05', NULL, NULL),
(437, 150, 3, '2025-08-18 17:39:05', '2025-08-18 17:39:21', '2025-08-18 17:39:31'),
(438, 151, 2, '2025-08-18 17:47:52', '2025-08-20 06:13:48', '2025-08-20 06:13:57'),
(439, 151, 3, '2025-08-18 17:47:52', NULL, NULL),
(440, 152, 2, '2025-08-18 17:48:07', '2025-08-20 06:14:10', '2025-08-20 06:14:46'),
(441, 152, 3, '2025-08-18 17:48:07', NULL, NULL),
(442, 153, 2, '2025-08-20 17:22:33', '2025-08-20 17:22:46', '2025-08-20 17:23:02'),
(443, 153, 3, '2025-08-20 17:22:33', NULL, NULL),
(444, 154, 2, '2025-08-20 17:27:24', NULL, NULL),
(445, 154, 3, '2025-08-20 17:27:24', NULL, NULL),
(446, 155, 2, '2025-08-20 18:04:25', '2025-08-20 18:04:34', '2025-08-20 18:04:43'),
(447, 155, 3, '2025-08-20 18:04:25', NULL, NULL),
(448, 156, 2, '2025-08-20 18:05:41', '2025-08-20 18:06:40', '2025-08-20 18:06:52'),
(449, 156, 3, '2025-08-20 18:05:41', NULL, NULL),
(450, 157, 2, '2025-08-20 18:05:51', '2025-08-20 18:06:57', '2025-08-20 18:07:05'),
(451, 157, 3, '2025-08-20 18:05:51', NULL, NULL),
(452, 158, 2, '2025-08-20 18:06:00', '2025-08-20 18:07:10', '2025-08-20 18:07:18'),
(453, 158, 3, '2025-08-20 18:06:00', NULL, NULL),
(454, 159, 2, '2025-08-20 18:06:10', '2025-08-20 18:07:23', '2025-08-20 18:07:34'),
(455, 159, 3, '2025-08-20 18:06:10', NULL, NULL),
(456, 160, 2, '2025-08-20 18:06:21', '2025-08-20 18:07:38', '2025-08-20 18:07:53'),
(457, 160, 3, '2025-08-20 18:06:21', NULL, NULL),
(458, 161, 2, '2025-08-21 12:07:01', '2025-08-21 12:08:19', '2025-08-21 12:08:35'),
(459, 161, 3, '2025-08-21 12:07:01', NULL, NULL),
(460, 162, 2, '2025-08-21 12:07:11', '2025-08-21 12:13:35', '2025-08-21 12:13:46'),
(461, 162, 3, '2025-08-21 12:07:11', NULL, NULL),
(462, 163, 2, '2025-08-21 12:07:23', '2025-08-21 12:18:36', '2025-08-22 17:40:20'),
(463, 163, 3, '2025-08-21 12:07:23', NULL, NULL),
(464, 164, 2, '2025-08-21 12:07:34', NULL, NULL),
(465, 164, 3, '2025-08-21 12:07:34', '2025-08-22 17:06:42', '2025-08-22 17:07:00'),
(466, 165, 2, '2025-08-21 12:07:51', NULL, NULL),
(467, 165, 3, '2025-08-21 12:07:51', NULL, NULL),
(468, 166, 2, '2025-08-21 12:08:03', '2025-08-22 17:47:20', '2025-08-22 17:47:31'),
(469, 166, 3, '2025-08-21 12:08:03', NULL, NULL),
(470, 167, 2, '2025-08-22 16:15:52', NULL, NULL),
(471, 167, 3, '2025-08-22 16:15:52', NULL, NULL),
(472, 168, 2, '2025-08-22 17:05:55', '2025-08-22 18:04:41', '2025-08-22 18:04:49'),
(473, 168, 3, '2025-08-22 17:05:55', NULL, NULL),
(474, 169, 2, '2025-08-22 18:08:05', NULL, NULL),
(475, 169, 3, '2025-08-22 18:08:05', NULL, NULL),
(476, 170, 2, '2025-08-23 15:50:41', '2025-08-23 15:50:53', '2025-08-23 15:51:01'),
(477, 170, 3, '2025-08-23 15:50:41', NULL, NULL),
(478, 171, 2, '2025-08-23 16:03:18', '2025-08-23 16:03:44', '2025-08-23 16:04:24'),
(479, 171, 3, '2025-08-23 16:03:18', NULL, NULL),
(480, 172, 2, '2025-08-23 16:05:29', '2025-08-23 16:06:14', '2025-08-23 16:06:23'),
(481, 172, 3, '2025-08-23 16:05:29', NULL, NULL),
(482, 173, 2, '2025-08-23 16:08:10', '2025-08-23 16:08:18', '2025-08-23 16:12:47'),
(483, 173, 3, '2025-08-23 16:08:10', NULL, NULL),
(484, 174, 2, '2025-08-23 16:14:23', NULL, NULL),
(485, 174, 3, '2025-08-23 16:14:23', NULL, NULL),
(486, 175, 2, '2025-08-23 16:14:38', '2025-08-26 08:53:22', '2025-08-26 08:53:35'),
(487, 175, 3, '2025-08-23 16:14:38', NULL, NULL),
(488, 176, 2, '2025-08-23 16:14:50', '2025-08-26 08:53:40', '2025-08-26 08:53:54'),
(489, 176, 3, '2025-08-23 16:14:50', NULL, NULL),
(490, 177, 2, '2025-08-26 08:53:00', '2025-08-26 08:53:58', '2025-08-26 08:54:07'),
(491, 177, 3, '2025-08-26 08:53:00', NULL, NULL),
(492, 178, 2, '2025-08-27 07:42:19', '2025-08-27 08:02:02', '2025-08-27 08:02:13'),
(493, 178, 3, '2025-08-27 07:42:19', NULL, NULL),
(494, 179, 2, '2025-09-01 07:42:56', '2025-09-01 07:44:12', '2025-09-01 07:44:24'),
(495, 179, 3, '2025-09-01 07:42:56', NULL, NULL),
(496, 180, 2, '2025-09-01 07:43:11', '2025-09-01 07:44:39', '2025-09-01 07:44:55'),
(497, 180, 3, '2025-09-01 07:43:11', NULL, NULL),
(498, 181, 2, '2025-09-01 07:43:24', '2025-09-01 07:43:50', '2025-09-01 07:44:07'),
(499, 181, 3, '2025-09-01 07:43:24', NULL, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(25) NOT NULL DEFAULT 'user',
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `role`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Muhamad Andriyansyah', 'mhmdandri03@gmail.com', NULL, '$2y$12$WqYRrhlJtXVYAk3JRrVizevahOz5HA/.b7d9njbcXtNf.gztPTr62', 'admin', 'ItThgGrpYLx45OmW0qD1g5TBues3oXLUEze95OLjuBgWdyEMDDuM83P3gkYH', '2025-07-31 08:10:24', '2025-08-03 05:22:29'),
(2, 'Operator', 'user@gmail.com', NULL, '$2y$12$PPFG.jAM1ZQIrLn2irP2NuVVUWL6k751RmoKlxH/hOc7S.uN10Mtm', 'user', 'rO3EJguzno7Oast21d54YScd8jcjgI5Gd8Ct5wHbH0bbTgwCQ6SMb0fGp6py', '2025-07-31 09:22:45', '2025-08-17 13:42:54'),
(3, 'Cica Purwanti', 'cicapurwanti@gmail.com', NULL, '$2y$12$tCv6VHIaJmZ8c5ZYX.q8ueol13wWfV62zpFKjUrVpyGp.oAPZOrby', 'user', NULL, '2025-08-03 05:21:35', '2025-08-03 05:21:35');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indeks untuk tabel `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indeks untuk tabel `containers`
--
ALTER TABLE `containers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `containers_container_number_unique` (`container_number`),
  ADD KEY `containers_location_id_foreign` (`location_id`),
  ADD KEY `containers_customer_id_foreign` (`customer_id`);

--
-- Indeks untuk tabel `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `customers_id_unique` (`id`);

--
-- Indeks untuk tabel `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indeks untuk tabel `histories`
--
ALTER TABLE `histories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `histories_container_id_foreign` (`container_id`),
  ADD KEY `histories_location_id_foreign` (`location_id`),
  ADD KEY `histories_customer_id_foreign` (`customer_id`),
  ADD KEY `histories_user_id_foreign` (`user_id`),
  ADD KEY `histories_task_id_foreign` (`task_id`);

--
-- Indeks untuk tabel `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indeks untuk tabel `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indeks untuk tabel `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indeks untuk tabel `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`id`),
  ADD KEY `task_requested_by_foreign` (`requested_by`),
  ADD KEY `task_container_id_foreign` (`container_id`),
  ADD KEY `task_customer_id_foreign` (`customer_id`);

--
-- Indeks untuk tabel `task_assignments`
--
ALTER TABLE `task_assignments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `task_assignments_task_id_foreign` (`task_id`),
  ADD KEY `task_assignments_user_id_foreign` (`user_id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `containers`
--
ALTER TABLE `containers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT untuk tabel `customers`
--
ALTER TABLE `customers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT untuk tabel `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `histories`
--
ALTER TABLE `histories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT untuk tabel `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `locations`
--
ALTER TABLE `locations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT untuk tabel `task`
--
ALTER TABLE `task`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=182;

--
-- AUTO_INCREMENT untuk tabel `task_assignments`
--
ALTER TABLE `task_assignments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=500;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `containers`
--
ALTER TABLE `containers`
  ADD CONSTRAINT `containers_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `containers_location_id_foreign` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE SET NULL;

--
-- Ketidakleluasaan untuk tabel `histories`
--
ALTER TABLE `histories`
  ADD CONSTRAINT `histories_container_id_foreign` FOREIGN KEY (`container_id`) REFERENCES `containers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `histories_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `histories_location_id_foreign` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `histories_task_id_foreign` FOREIGN KEY (`task_id`) REFERENCES `task` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `histories_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `task`
--
ALTER TABLE `task`
  ADD CONSTRAINT `task_container_id_foreign` FOREIGN KEY (`container_id`) REFERENCES `containers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `task_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `task_requested_by_foreign` FOREIGN KEY (`requested_by`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `task_assignments`
--
ALTER TABLE `task_assignments`
  ADD CONSTRAINT `task_assignments_task_id_foreign` FOREIGN KEY (`task_id`) REFERENCES `task` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `task_assignments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
