--
-- File generated with SQLiteStudio v3.3.3 on пн окт. 31 00:01:52 2022
--
-- Text encoding used: UTF-8
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table: contacts
CREATE TABLE contacts (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, phone_num TEXT NOT NULL, home_adress TEXT NOT NULL, owner TEXT NOT NULL, time TIME NOT NULL, bill TEXT NOT NULL);
INSERT INTO contacts (id, phone_num, home_adress, owner, time, bill) VALUES (1, '+380954131834', 'район сзідний село Баранинці вул Ужанська 54А', 'Вася робота', '15,6хв', '34,89');

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
