CREATE DATABASE flora_seeker;

CREATE USER 'flora'@'localhost' IDENTIFIED WITH mysql_native_password BY 'flourish';

GRANT ALL ON flora_seeker.* TO 'flora'@'localhost';

USE flora_seeker;

CREATE TABLE goals (
  id INT auto_increment,
  name VARCHAR(255),
  description TEXT,
  code Char(4),
  createdAt DATETIME DEFAULT NOW(),
  updatedAt DATETIME DEFAULT NOW() ON UPDATE NOW(),
  deletedAt DATETIME
  PRIMARY KEY(id)
);

CREATE TABLE guidelines (
  id INT auto_increment,
  description VARCHAR(255),
  createdAt DATETIME DEFAULT NOW(),
  updatedAt DATETIME DEFAULT NOW() ON UPDATE NOW(),
  deletedAt DATETIME
  PRIMARY KEY(id)
);

CREATE TABLE seekers (
  id INT auto_increment,
  name VARCHAR(255) NOT NULL,
  age INT,
  gender ENUM('female', 'male', 'other'),
  lodestar TINYINT,
  createdAt DATETIME DEFAULT NOW(),
  updatedAt DATETIME DEFAULT NOW() ON UPDATE NOW(),
  deletedAt DATETIME
  PRIMARY KEY(id)
);

CREATE TABLE titles (
  id INT auto_increment,
  name VARCHAR(255) NOT NULL,
  createdAt DATETIME DEFAULT NOW(),
  updatedAt DATETIME DEFAULT NOW() ON UPDATE NOW(),
  deletedAt DATETIME,
  PRIMARY KEY(id)
);

CREATE TABLE seekersTitles (
  seekerId INT,
  titleId INT,
  createdAt DATETIME DEFAULT NOW(),
  updatedAt DATETIME DEFAULT NOW() ON UPDATE NOW(),
  deletedAt DATETIME,
  PRIMARY KEY(seekerId, titleId),
  FOREIGN KEY (seekerId) REFERENCES seekers(id),
  FOREIGN KEY (titleId) REFERENCES titles(id)
);

CREATE TABLE samples (
  id INT auto_increment,
  name VARCHAR(255) NOT NULL,
  description TEXT DEFAULT '[DATABASE ENTRY INCOMPLETE]',
  rarity ENUM('common', 'uncommon', 'rare', 'legendary', 'unique'),
  createdAt DATETIME DEFAULT NOW(),
  updatedAt DATETIME DEFAULT NOW() ON UPDATE NOW(),
  deletedAt DATETIME,
  PRIMARY KEY(id)
);

CREATE TABLE falshrooms (
  id INT auto_increment,
  sampleId INT,
  createdAt DATETIME DEFAULT NOW(),
  updatedAt DATETIME DEFAULT NOW() ON UPDATE NOW(),
  deletedAt DATETIME,
  PRIMARY KEY(id),
  FOREIGN KEY(sampleId) REFERENCES samples(id)
);

CREATE TABLE flesherfungi (
  id INT auto_increment,
  sampleId INT,
  threat INT,
  createdAt DATETIME DEFAULT NOW(),
  updatedAt DATETIME DEFAULT NOW() ON UPDATE NOW(),
  deletedAt DATETIME,
  PRIMARY KEY(id),
  FOREIGN KEY(sampleId) REFERENCES samples(id)
);

CREATE TABLE flourishflora (
  id INT auto_increment,
  sampleId INT,
  producerCoefficient INT,
  createdAt DATETIME DEFAULT NOW(),
  updatedAt DATETIME DEFAULT NOW() ON UPDATE NOW(),
  deletedAt DATETIME,
  PRIMARY KEY(id),
  FOREIGN KEY(sampleId) REFERENCES samples(id)
);

CREATE TABLE maremolds (
  id INT auto_increment,
  sampleId INT,
  mutationRate INT,
  createdAt DATETIME DEFAULT NOW(),
  updatedAt DATETIME DEFAULT NOW() ON UPDATE NOW(),
  deletedAt DATETIME,
  PRIMARY KEY(id),
  FOREIGN KEY(sampleId) REFERENCES samples(id)
);

CREATE TABLE trees (
  id INT auto_increment,
  sampleId INT,
  height INT,
  createdAt DATETIME DEFAULT NOW(),
  updatedAt DATETIME DEFAULT NOW() ON UPDATE NOW(),
  deletedAt DATETIME,
  PRIMARY KEY(id),
  FOREIGN KEY(sampleId) REFERENCES samples(id)
);

CREATE TABLE waveskellen (
  id INT auto_increment,
  sampleId INT,
  cascades ENUM('clarion', 'umbra', 'nihil', 'anomalous'),
  createdAt DATETIME DEFAULT NOW(),
  updatedAt DATETIME DEFAULT NOW() ON UPDATE NOW(),
  deletedAt DATETIME,
  PRIMARY KEY (id),
  FOREIGN KEY (sampleId) REFERENCES samples (id)
);

CREATE TABLE collections (
  id INT auto_increment,
  name VARCHAR(255) NOT NULL,
  createdAt DATETIME DEFAULT NOW(),
  updatedAt DATETIME DEFAULT NOW() ON UPDATE NOW(),
  deletedAt DATETIME,
  PRIMARY KEY (id),
);

CREATE TABLE locations (
  id INT auto_increment,
  name VARCHAR(255),
  description TEXT,
  slug VARCHAR(255),
  createdAt DATETIME DEFAULT NOW(),
  updatedAt DATETIME DEFAULT NOW() ON UPDATE NOW(),
  deletedAt DATETIME,
  PRIMARY KEY (id)
);

CREATE TABLE territories (
  id INT auto_increment,
  name VARCHAR(255),
  slug VARCHAR(255),
  locationId INT,
  createdAt DATETIME DEFAULT NOW(),
  updatedAt DATETIME DEFAULT NOW() ON UPDATE NOW(),
  deletedAt DATETIME,
  PRIMARY KEY (id)
  FOREIGN KEY (locationId) REFERENCES locations (id)
);

INSERT INTO guidelines (description) VALUES ('Obey the laws of Seras.');

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

INSERT INTO seekers (name, age, gender, title, lodestar) VALUES ('seeker1', 28, 'other', 1, 0);

INSERT INTO falshrooms (name, description, rarity, viraburstAbsorption) VALUES ('')

INSERT INTO locations (name, description, slug) VALUES ('One', 'Description 1', 'one');
INSERT INTO locations (name, description, slug) VALUES ('Two', 'Description 2', 'two');
INSERT INTO locations (name, description, slug) VALUES ('Three', 'Description 3', 'three');

INSERT INTO territories (, locationId) VALUES (1);