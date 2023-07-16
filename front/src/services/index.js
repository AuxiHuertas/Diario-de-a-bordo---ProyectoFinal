import axios from "axios";
import { login, signUp,signOut} from "./auth";
import { editMarker, marker } from "./marker"
import { info } from "./user";


const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const auth = {
  login: login(client),
  signUp: signUp(client),
  signOut: signOut(client),
  marker: marker(client),
  editMarker: editMarker(client)
};

const user = {
  info: info(client),
};

export { auth, user };