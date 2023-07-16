DROP TABLE IF EXISTS img;
DROP TABLE IF EXISTS activities;
DROP TABLE IF EXISTS country;
DROP TABLE IF EXISTS users;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
    id uuid PRIMARY KEY DEFAULT  uuid_generate_v4(),
    username TEXT NOT NULL UNIQUE,-- Está creando valores duplicados a pesar de ser UNIQUE -> No has creado de nuevo la tabla despues de añadir UNIQUE, 
    password TEXT NOT NULL,
    email TEXT NOT NULL 
);


 CREATE TABLE IF NOT EXISTS country (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_user uuid REFERENCES users NOT NULL,
    lat_country TEXT NOT NULL,  -- Tanto este campo con el siguiente vendran del marker de leaflet, desde front
    lng_country TEXT NOT NULL,
    name TEXT NOT NULL -- Este campo viene de Geonames, utilizando los dos campos anteriores. 
    
);


CREATE TABLE IF NOT EXISTS activities (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_country uuid REFERENCES country NOT NULL,
    name_activity TEXT NOT NULL,
    date_activity DATE, -- este campo debe ser un calendario
    hour_activity TIME, -- este campo debe ser un reloj 
    files TEXT, -- este campo vendrá de cloudinary como url
    FOREIGN KEY (id_country) REFERENCES country (id) ON DELETE CASCADE

);

CREATE TABLE IF NOT EXISTS img (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_country uuid REFERENCES country NOT NULL,
    img VARCHAR(200), -- Aquí debe llegar mediante llamada POST la URL de la imagen a través de Cloudinar,
     FOREIGN KEY (id_country) REFERENCES country (id) ON DELETE CASCADE

);