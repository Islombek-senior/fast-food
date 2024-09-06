import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Leafletning standart marker ikonkalari bilan ishlash uchun zarur bo'lgan import
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Standart marker ikonkasini to'g'ri sozlash
const defaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Filiallar ma'lumotlari
interface Branch {
  position: [number, number];
  owner: string;
  phone: string;
  name: string;
}

const branches: Branch[] = [
  {
    position: [41.2995, 69.2401],
    owner: "Asror Soliyev",
    phone: "+998991234567",
    name: "Maxway Filial 1",
  },
  {
    position: [41.3111, 69.2797],
    owner: "Shavkat Karimov",
    phone: "+998991234568",
    name: "Maxway Filial 2",
  },
  {
    position: [41.3134, 69.2826],
    owner: "Ali Akbarov",
    phone: "+998991234569",
    name: "Maxway Filial 3 41.326543, 69.228495",
  },
  {
    position: [41.326543, 69.228495],
    owner: "Ali Akbarov",
    phone: "+998991234569",
    name: "Maxway Filial 3",
  },
];

const Map = () => {
  return (
    <MapContainer
      center={[41.2995, 69.2401]}
      zoom={20}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Filiallar uchun markerlar */}
      {branches.map((branch, idx) => (
        <Marker key={idx} position={branch.position} icon={defaultIcon}>
          <Popup>
            <strong>{branch.name}</strong>
            <br />
            Egasi: {branch.owner}
            <br />
            Tel: {branch.phone}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
