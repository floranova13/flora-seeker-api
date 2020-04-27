CREATE DATABASE X;

CREATE USER 'X'@'localhost' IDENTIFIED
WITH mysql_native_password BY 'X';

GRANT ALL ON X.* TO 'X'@'localhost';

USE X;