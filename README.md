
# Diario-de-a-bordo---ProyectoFinal
## Definicion del cliente

#### Página de registro y inicio de sesión: 
Los usuarios pueden crear una cuenta personal utilizando una página de registro y luego iniciar sesión utilizando sus credenciales de acceso.

La pagina inicial será la de registro, con un botón para acceder directamente al login si el usuario ya está logado. Al igual que en la pagina de login debe haber un boton para acceder al registro. 

Una vez logado, el usuario debe ser redirigido a la pagina principa, que debe contener los siguientes campos:

#### Mapa interactivo:
Los usuarios pueden visualizar un mapa interactivo donde podrán marcar los lugares que planean visitar durante su viaje. 
Debe haber un buscador de ciudades que permita marcarlas. 

#### Gestión de itinerarios:
Los usuarios pueden programar actividades diarias durante su viaje marcando la fecha del viaje y creando carpetas por día, estableciendo la hora, duración y adjuntando documentación necesaaria de las distintas actividades.

Para lo anterior, cuando el usuario eliga un lugar en el mapa, se debe abrir una carpeta a la izquierda con un calendario para marcar la fecha del viaje. 

Dentro de esta el usuario puede crear carpetas por dia de viaje, en la que puede adjuntar toda la documentacion necesaria y las fotos del día. 
{
  Ejemplo : 
  Londres - 15/09/2023 - 22/09/2023
    Día 1
      Vuelo ida
      Checking Hotel
      Bono transporte privado Aeropuerto - Hotel
    Día 2
      Entradas 
      Reserva Restaurante

#### Gestión de fotos:
Los usuarios pueden agregar fotos a medida que realizan actividades durante su viaje por día, que se quedarán archivadas en cada carpeta. 


**Extra:
- La aplicación enviará recordatorios automáticos para cada actividad.
- Las fotos se organizan por día y al finalizar el viaje se genera un carrusel de fotos que muestra todas las imágenes capturadas.



   ![image](./imagenes/Registro.jpeg)
   ![image](./imagenes/Panel.jpeg)


## Definición Técnica

#### Alta de usuarios:

- Necesitamos una tabla de "users" en la que se vayan cargando los datos de los usuarios.
  ```
   {
    id, (uuid v4, PRIMARYKEY),
    Email, (TEXT NOT NULL Y UNIQUE),
    Username, (TEXT NOT NULL Y UNIQUE),
    Password , (TEXT NOT NULL Y UNIQUE)
  }
  ```
 

- Rutas para el registro, login y consulta de usuarios --> /auth
  - POST : /signup -> Aquí debe encriptarse la contraseña utilizando la libreria "simple-stateless-auth-library"
  - POST : /signin
  - POST : /signout 

#### Mapa interactivo
 - Integrar libreria leaflet
 - Utilizar plugin de control de busqueda de la propia libreria
 - Utilizar plugin de marcadores de la propia libreria
 - Ajustar zoom para que visualizar el mapamundi completo por paises
- Tabla Country para  volcar los datos del país marcado por el usuario :
  ```{
    id, (uuid v4, PRIMARYKEY)
    idUser, (uuid v4, REFERENCE (users))
    NameCountry, TEXT NOT NULL
    LatLmg (NUMBER) ->(Este dato viene proporcionado por el     front con el evento click y con el plugin de marcador de la misma libreria)
  }
  ```
  

- Rutas para introducir los datos en la tabla anterior:

  - Para recoger los datos que proporciona el plugin de Clic o marcador de la libreria,
    const latlng : "datos recogidos del front"

    POST : /country
      Body 
      {
        "NameCountry"
        "latlng"
      }

#### Gestion de itinerarios

- Tabla activities:

```
{
  "id": (uuid v4, PRIMARY KEY),
  "id_country ": (uuid v4, REFERENCE (country))
  "NameActivity": TEXT NOT NULL,
  "dateActivity":TEXT NOT NULL,
}
```

- Ruta para añadir las actividades a la tabla anterior, 

  - El usuario añadirá manualmente las actividades que realizará y su fecha, para eso tendra 2 campos a cumplimentar en el front:
    - Descripcion
    - Fecha (Calendario)

  Esto pasará a la tabla Activities con una consulta POST

POST : /Country/activities 
  {
    "description" : 
    "date":
  }

#### Gestion de fotos
- Tabla Imgs :
```
{
id_username :(uuid v4 , REFERENCE (country)),
id_country :( uuid v4 , REFERENCE (users)),
img : (URL Cloudinary)
}
``` 
- Utilizar Cloudinary para almacenar las imágenes,
- Relacionar las imagenes con el id del usuario y del país visitado,
- Estas fotos se verán almacenadas en una carpeta de cada país. 

- Rutas para consultas POST y GET a base de datos:

POST/country/img :
 {
  url: "url cloudinary"
 }

GET/Contry/img : Visualizacion de todas las fotos del usuario en el front. 
