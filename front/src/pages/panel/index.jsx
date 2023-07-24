import { useSignOut } from "../../hooks/useSignOut";
import { useUser } from "../../hooks/useUser";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { FeatureGroup, Circle } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import axios from "axios";
import {
  userMarker,
  userMarkerDelete,
  userMarkerEdit,
} from "../../hooks/userMarker";
import {
  Accordion,
  Button,
  Modal,
  Carousel,
  CarouselItem,
} from "react-bootstrap";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { userPict } from "../../hooks/useImages";
import "./style.css";
import { info } from "../../services/user";

const Panel = () => {
  const [modalShow, setModalShow] = useState(false);
  const [id_country, setIdCountry] = useState(null);
  const doSignOut = useSignOut();
  const doInfoUser = useUser();
  console.log("ESto es doInfoUSeer > ", doInfoUser);
  const position = [51.505, -0.09];
  const doMarkerUser = userMarker();
  const doEditMarkerUser = userMarkerEdit();
  const doDeleteMarkerUser = userMarkerDelete();

  const create = async (e) => {
    const ub = e.layer._latlng;

    const info = await axios.get(
      `http://api.geonames.org/countryCodeJSON?lat=${ub.lat}&lng=${ub.lng}&username=gecak`
    );
    
    doMarkerUser({
      id_user: doInfoUser.data.id,
      ltd: ub.lat,
      long: ub.lng,
      name: info.data.countryName,
    });
  };

  const edited = async (e) => {
    const idCountryEdit = e.layers.getLayers()[0].options.id;
    const newUb = e.layers.getLayers()[0]._latlng;
    const infoNewName = await axios.get(
      `http://api.geonames.org/countryCodeJSON?lat=${newUb.lat}&lng=${newUb.lng}&username=gecak`
    );
    doEditMarkerUser({
      id: idCountryEdit,
      ltd: newUb.lat,
      long: newUb.lng,
      name: infoNewName.data.countryName,
    });
  };

  const deleteMarker = async (e) => {
    const idCountryDelete = e.layers.getLayers()[0].options.id;

    doDeleteMarkerUser({
      id: idCountryDelete,
    });
    console.log(idCountryDelete);
  };
  const maxImagesToShow = 5; // Establece el número máximo de imágenes a mostrar
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4 text-center">
          <section>
            <h1>Travel Memories</h1>
            {/* Dentro de esta funcion está el acordeon que contiene el carrusel de img, y el botón que abre el modal para añadir img    */}
            {doInfoUser.data.response.response.map((infoCountry) => (
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    <p>{infoCountry.country_name}</p>
                  </Accordion.Header>
                  <Accordion.Body>
                    {infoCountry.images ? (
                      <Carousel data-bs-theme="dark">
                        {infoCountry.images.map((img, index) => (
                          <CarouselItem key={index}>
                            <a
                              href={img}
                              target="blank"
                              className="image-link image-link"
                            >
                              <img
                                src={img}
                                alt={`Image ${index}`}
                                style={{ height: "200px", width: "200px" }}
                              ></img>
                            </a>
                          </CarouselItem>
                        ))}
                      </Carousel>
                    ) : null}
                    <br></br>
                    <br></br>

                    <Button
                      variant="primary"
                      onClick={() => setIdCountry(infoCountry.country_id)}
                    >
                      Add images in your trip!
                    </Button>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            ))}
            <br></br>
            <br></br>

            <button type="submit" onClick={doSignOut} className="btn btn-light">
              SignOut
            </button>
            
            {/*Modal de REactBoostrap, con la operacion ternaria, controlamos que si tenemos id_country, nos abra el modal para integrar la img */}
            {id_country ? (
              <MyVerticallyCenteredModal
                show={id_country !== null}
                onHide={() => setIdCountry(null)}
                idCountry={id_country}
              />
            ) : null}
          </section>
        </div>

        <div className="col-md-8">
          {/* contenedor de mapa leafletDraw */}
          <MapContainer
            center={position}
            zoom={2.6}
            scrollWheelZoom={true}
            style={{ minHeight: "100vh", minWidth: "100vw" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* Opciones de la libreria leafletDraw */}
            <FeatureGroup>
              <EditControl
                position="topleft"
                onEdited={edited}
                onCreated={create}
                onDeleted={deleteMarker}
                draw={{
                  rectangle: false,
                  polygon: false,
                  circle: false,
                  polyline: false,
                  circlemarker: false,
                }}
              />
              {/* Marcador ->  El marker de leaflet utiliza la info del user del back que recibo mediante doInfoUser, (es el hook useUSer), y lo muestra  */}
              {doInfoUser.data.response.response.map(
                (infoCountry) => (
                  console.log(infoCountry),
                  (
                    <Marker
                      position={[
                        infoCountry.lat_country,
                        infoCountry.lng_country,
                      ]}
                      id={infoCountry.country_id}
                    >
                      <Popup>{[infoCountry.country_name]}</Popup>
                    </Marker>
                  )
                )
              )}
            </FeatureGroup>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

// Modal de reactBoostrap, dentro del modal está form para envio de img,
function MyVerticallyCenteredModal(props) {
  const { register, handleSubmit } = useForm();
  const doImg = userPict();
  const dataPicture = (urlImages) => {
    console.log(urlImages);
    const formData = new FormData();
    formData.append("image", urlImages.urlImages[0]);
    formData.append("id_country", props.idCountry);
    doImg(formData);
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Photo gallery</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Add all the photos from your trip! </h4>

        <form onSubmit={handleSubmit(dataPicture)}>
          <input
            type="file"
            {...register("urlImages", { required: true })}
          ></input>
          <input type="submit"></input>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Panel;
