DROP DATABASE chat;

CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
  ID int AUTO_INCREMENT,
  NAME varchar(50),
  PRIMARY KEY (ID)
);


CREATE TABLE messages (
  /* Describe your table here.*/
  ID int AUTO_INCREMENT,
  TEXT varchar(255),
  USER int,
  PRIMARY KEY (id),
  FOREIGN KEY (user) REFERENCES users(id)
);

/* Create other tables and define schemas for them here! */



/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

