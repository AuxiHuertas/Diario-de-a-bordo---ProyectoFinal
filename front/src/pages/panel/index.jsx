import { useSignOut } from "../../hooks/useSignOut";
import { MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import "./style.css"
const Panel = () => {
  const doSignOut = useSignOut();
  const position = [51.505, -0.09]
  return (
    <section>
      <h1>Home</h1>

      <MapContainer center={position} zoom={13} scrollWheelZoom={false}
       style={{ minHeight: "100vh", minWidth: "100vw" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
      
      <button type="submit" onClick={doSignOut}>
        SignOut
      </button>
    </section>
  );
};

export default Panel;
