CREATE DATABASE flora-seeker;

CREATE USER 'X'@'localhost' IDENTIFIED
WITH mysql_native_password BY 'X';

GRANT ALL ON flora-seeker.* TO 'X'@'localhost';

USE flora-seeker;

CREATE TABLE seekers (
  id INT auto_increment PRIMARY KEY,
  name VARCHAR(255),
  age INT,
  gender ENUM('female', 'male', 'other'),
  lodestar TINYINT,
  createdAt DATETIME DEFAULT NOW(),
  updatedAt DATETIME DEFAULT NOW() ON UPDATE NOW(),
  deletedAt DATETIME
);

CREATE TABLE falshrooms (
  id INT auto_increment PRIMARY KEY,
  name VARCHAR(255),
  description VARCHAR(255),
  rarity ENUM('common', 'uncommon', 'rare', 'legendary', 'unique'),
  viraburstAbsorption INT,
  createdAt DATETIME DEFAULT NOW(),
  updatedAt DATETIME DEFAULT NOW() ON UPDATE NOW(),
  deletedAt DATETIME
);

CREATE TABLE flesherfungi (
  id INT auto_increment PRIMARY KEY,
  name VARCHAR(255),
  description VARCHAR(255),
  rarity ENUM('common', 'uncommon', 'rare', 'legendary', 'unique'),
  threat INT,
  createdAt DATETIME DEFAULT NOW(),
  updatedAt DATETIME DEFAULT NOW() ON UPDATE NOW(),
  deletedAt DATETIME
);

CREATE TABLE flourishflora (
  id INT auto_increment PRIMARY KEY,
  name VARCHAR(255),
  description VARCHAR(255),
  rarity ENUM('common', 'uncommon', 'rare', 'legendary', 'unique'),
  producerCoefficient INT,
  createdAt DATETIME DEFAULT NOW(),
  updatedAt DATETIME DEFAULT NOW() ON UPDATE NOW(),
  deletedAt DATETIME
);

CREATE TABLE maremolds (
  id INT auto_increment PRIMARY KEY,
  name VARCHAR(255),
  description VARCHAR(255),
  rarity ENUM('common', 'uncommon', 'rare', 'legendary', 'unique'),
  mutationRate INT,
  createdAt DATETIME DEFAULT NOW(),
  updatedAt DATETIME DEFAULT NOW() ON UPDATE NOW(),
  deletedAt DATETIME
);

CREATE TABLE trees (
  id INT auto_increment PRIMARY KEY,
  name VARCHAR(255),
  description VARCHAR(255),
  rarity ENUM('common', 'uncommon', 'rare', 'legendary', 'unique'),
  height INT,
  createdAt DATETIME DEFAULT NOW(),
  updatedAt DATETIME DEFAULT NOW() ON UPDATE NOW(),
  deletedAt DATETIME
);

CREATE TABLE waveskellen (
  id INT auto_increment PRIMARY KEY,
  name VARCHAR(255),
  description VARCHAR(255),
  rarity ENUM('common', 'uncommon', 'rare', 'legendary', 'unique'),
  cascade ENUM('clarion', 'umbra', 'nihil', 'anomalous')
  createdAt DATETIME DEFAULT NOW(),
  updatedAt DATETIME DEFAULT NOW() ON UPDATE NOW(),
  deletedAt DATETIME
);