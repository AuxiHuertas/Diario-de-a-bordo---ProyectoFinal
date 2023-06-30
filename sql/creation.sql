CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
    id uuid PRIMARY KEY DEFAULT  uuid_generate_v4(),
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    email TEXT NOT NULL 
);
--latlng_country Este campo vendrá volcado del mapa interactivo de leaflet
--name_country Para que este dato aparezca, debes de volcar el campo latlng en geonames.org y traer el nombre de aquí

 CREATE TABLE IF NOT EXISTS country (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_user uuid REFERENCES users NOT NULL,
    name_country TEXT NOT NULL,
    latlng_country TEXT NOT NULL
);
--date_activity este campo debe ser un calendario
--hour_activity este campo debe ser un reloj 

CREATE TABLE IF NOT EXISTS activities (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_country uuid REFERENCES country NOT NULL,
    name_activity TEXT NOT NULL,
    date_activity DATE, 
    hour_activity TIME
);

CREATE TABLE IF NOT EXISTS img (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_country uuid REFERENCES country NOT NULL,
    img VARCHAR(200) -- img Aquí debe llegar mediante llamada POST la URL de la imagen a través de Cloudinar
);