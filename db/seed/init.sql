DROP DATABASE IF EXISTS jelly_db;
CREATE DATABASE jelly_db;
USE jelly_db;

DROP TABLE IF EXISTS videos;

CREATE TABLE videos (
  id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  title varchar(50) NOT NULL,
  url varchar(50) NOT NULL,
  PRIMARY KEY (id)
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO videos (title, url) VALUES('video1', 'https://jelly-fish.local:3333/1/1.m3u8');
INSERT INTO videos (title, url) VALUES('video2', 'https://jelly-fish.local:3333/2/2.m3u8');
INSERT INTO videos (title, url) VALUES('video3', 'https://jelly-fish.local:3333/3/3.m3u8');
INSERT INTO videos (title, url) VALUES('video4', 'https://jelly-fish.local:3333/4/4.m3u8');
