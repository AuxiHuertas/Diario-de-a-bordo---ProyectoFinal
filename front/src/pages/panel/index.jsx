import { useSignOut } from "../../hooks/useSignOut";
import { useUser } from "../../hooks/useUser";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { FeatureGroup, Circle } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import axios from "axios";
import { userMarker, userMarkerDelete, userMarkerEdit } from "../../hooks/userMarker";


const Panel = () => {
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
    const idCountryEdit =  e.layers.getLayers()[0].options.id
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
    const idCountryDelete =  e.layers.getLayers()[0].options.id
    
    doDeleteMarkerUser({
      id: idCountryDelete,
    });
    console.log(idCountryDelete)
   }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4">
          <section>
            <h1>Home</h1>
            {doInfoUser.data.response.response.map((infoCountry) => (
              <p>{infoCountry.country_name}</p>
            ))}
            <button type="submit" onClick={doSignOut}>
              SignOut
            </button>
          </section>
        </div>

        <div className="col-md-8">
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
              {/* <Circle center={[51.51, -0.06]} radius={200} /> */}
              {doInfoUser.data.response.response.map((infoCountry) => (
                <Marker
                  position={[infoCountry.lat_country, infoCountry.lng_country]}
                  id={infoCountry.country_id}
                >
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                </Marker>
              ))}
            </FeatureGroup>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Panel;
