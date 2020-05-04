CREATE DATABASE flora_seeker;

CREATE USER 'flora'@'localhost' IDENTIFIED WITH mysql_native_password BY 'flourish';

GRANT ALL ON flora_seeker.* TO 'flora'@'localhost';

USE flora_seeker;

CREATE TABLE goals (
  id INT auto_increment PRIMARY KEY,
  name VARCHAR(255),
  description VARCHAR(255),
  code Char(4),
  createdAt DATETIME DEFAULT NOW(),
  updatedAt DATETIME DEFAULT NOW() ON UPDATE NOW(),
  deletedAt DATETIME
);

INSERT INTO goals (name, description, code) VALUES ('goal1', '', 'I126');
INSERT INTO goals (name, description, code) VALUES ('goal2', '', 'P268');
INSERT INTO goals (name, description, code) VALUES ('goal3', '', 'Q439');
INSERT INTO goals (name, description, code) VALUES ('goal4', '', 'C463');
INSERT INTO goals (name, description, code) VALUES ('goal5', '', 'N630');
INSERT INTO goals (name, description, code) VALUES ('goal6', '', 'T557');
INSERT INTO goals (name, description, code) VALUES ('goal7', '', 'G428');
INSERT INTO goals (name, description, code) VALUES ('goal8', '', 'X313');
INSERT INTO goals (name, description, code) VALUES ('goal9', '', 'U902');
INSERT INTO goals (name, description, code) VALUES ('goal10', '', 'M284');
INSERT INTO goals (name, description, code) VALUES ('goal11', '', 'M854');
INSERT INTO goals (name, description, code) VALUES ('goal12', '', 'B179');

CREATE TABLE seekers (
  id INT auto_increment PRIMARY KEY,
  name VARCHAR(255),
  age INT,
  gender ENUM('female', 'male', 'other'),
  title VARCHAR(255),
  lodestar TINYINT,
  createdAt DATETIME DEFAULT NOW(),
  updatedAt DATETIME DEFAULT NOW() ON UPDATE NOW(),
  deletedAt DATETIME
);

INSERT INTO seekers (name, age, gender, title, lodestar) VALUES ('seeker1', '28', 'other', 'Botanist', '0');
INSERT INTO seekers (name, age, gender, title, lodestar) VALUES ('seeker2', '43', 'female', 'Explorer', '0');
INSERT INTO seekers (name, age, gender, title, lodestar) VALUES ('seeker3', '42', 'female', 'Research Liaison', '0');
INSERT INTO seekers (name, age, gender, title, lodestar) VALUES ('seeker4', '22', 'male', 'Explorer', '0');
INSERT INTO seekers (name, age, gender, title, lodestar) VALUES ('seeker5', '35', 'other', 'Explorer Veteran', '0');
INSERT INTO seekers (name, age, gender, title, lodestar) VALUES ('seeker6', '20', 'female', 'Explorer', '0');
INSERT INTO seekers (name, age, gender, title, lodestar) VALUES ('seeker7', '35', 'female', 'Explorer Veteran', '0');
INSERT INTO seekers (name, age, gender, title, lodestar) VALUES ('seeker8', '43', 'female', 'Explorer Veteran', '0');
INSERT INTO seekers (name, age, gender, title, lodestar) VALUES ('seeker9', '33', 'male', 'Research Liaison', '0');
INSERT INTO seekers (name, age, gender, title, lodestar) VALUES ('seeker10', '21', 'female', 'Research Liaison', '0');
INSERT INTO seekers (name, age, gender, title, lodestar) VALUES ('seeker11', '41', 'other', 'Explorer', '0');
INSERT INTO seekers (name, age, gender, title, lodestar) VALUES ('seeker12', '27', 'other', 'Explorer', '0');

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

INSERT INTO seekers (name, description, rarity, viraburstAbsorption) VALUES ('')

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
  cascades ENUM('clarion', 'umbra', 'nihil', 'anomalous'),
  createdAt DATETIME DEFAULT NOW(),
  updatedAt DATETIME DEFAULT NOW() ON UPDATE NOW(),
  deletedAt DATETIME
);

CREATE TABLE locations (
  id INT auto_increment PRIMARY KEY,
  name VARCHAR(255),
  description VARCHAR(255),
  slug VARCHAR(255),
  createdAt DATETIME DEFAULT NOW(),
  updatedAt DATETIME DEFAULT NOW() ON UPDATE NOW(),
  deletedAt DATETIME
);

CREATE TABLE territories (
  id INT auto_increment PRIMARY KEY,
  name VARCHAR(255),
  locationId INT,
  createdAt DATETIME DEFAULT NOW(),
  updatedAt DATETIME DEFAULT NOW() ON UPDATE NOW(),
  deletedAt DATETIME,
  FOREIGN KEY (locationId) REFERENCES locations(id)
);