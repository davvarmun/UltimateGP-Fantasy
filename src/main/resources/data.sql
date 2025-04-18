-- Inserción de roles
INSERT INTO authorities (id, authority) VALUES (1, 'user'), (2, 'admin');

-- Inserción de usuarios con contraseñas encriptadas
-- La contraseña que se ha codificado es: user

INSERT INTO user_table (name, surname, username, password, email, profile_photo_route, authority_id) VALUES
('user', 'user', 'user1', '$2a$10$quXOAFytwj43GJuecSaM7.nrieG6RG4GVUZASDEefCcEfzk.lPMo6', 'user1@example.com', 'a', 1),
('user', 'user', 'user2', '$2a$10$quXOAFytwj43GJuecSaM7.nrieG6RG4GVUZASDEefCcEfzk.lPMo6', 'user2@example.com', 'a', 1),
('admin', 'admin', 'admin1', '$2a$10$quXOAFytwj43GJuecSaM7.nrieG6RG4GVUZASDEefCcEfzk.lPMo6', 'admin1@example.com', 'a', 2);

-- Inserción de equipos
INSERT INTO team_table (id, name, constructor, points) VALUES
(1, 'Repsol Honda Team', 'Honda', 0),
(2, 'Monster Energy Yamaha', 'Yamaha', 0),
(3, 'Ducati Lenovo Team', 'Ducati', 0),
(4, 'Red Bull KTM Factory Racing', 'KTM', 0);

-- Inserción de pilotos
INSERT INTO rider_table (id, name, surname, points, nationality, bike_number, team_id) VALUES
(1, 'Marc', 'Marquez', 0, 'ESPAÑA', 93, 3),
(2, 'Joan', 'Mir', 0, 'ESPAÑA', 36, 1),

(3, 'Fabio', 'Quartararo', 0, 'FRANCIA', 20, 2),
(4, 'Franco', 'Morbidelli', 0, 'ITALIA', 21, 2),

(5, 'Francesco', 'Bagnaia', 0, 'ITALIA', 63, 3),
(6, 'Enea', 'Bastianini', 0, 'ITALIA', 23, 3),

(7, 'Brad', 'Binder', 0, 'SUDAFRICA', 33, 4),
(8, 'Jack', 'Miller', 0, 'AUSTRALIA', 43, 4);


