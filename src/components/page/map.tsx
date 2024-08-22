import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Maxsus marker ikonkalarini o'rnatish
const redIcon = new L.Icon({
  iconUrl: 'https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FF0000',
  iconSize: [35, 45],
  iconAnchor: [17, 45],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const blackIcon = new L.Icon({
  iconUrl: 'https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|000000',
  iconSize: [35, 45],
  iconAnchor: [17, 45],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const Map = () => {
  return (
    <div style={{ position: 'relative' }}>
      <MapContainer center={[41.2995, 69.2401]} zoom={14} style={{ height: "100vh", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* Markerlar */}
        <Marker position={[41.2995, 69.2401]} icon={blackIcon}>
          <Popup>
            Navoi Metro Station
          </Popup>
        </Marker>
        <Marker position={[41.3111, 69.2797]} icon={redIcon}>
          <Popup>
            Kamolon Mosque
          </Popup>
        </Marker>
        <Marker position={[41.3134, 69.2826]} icon={redIcon}>
          <Popup>
            Muqimiy Nomidagi O'zbek Drama Teatri
          </Popup>
        </Marker>

        {/* Qolgan markerlar ham shu tarzda qo'shiladi */}
      </MapContainer>

      {/* Pastki qismda foydalanuvchi ma'lumotlari */}
      <div style={{
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: '#fff',
        padding: '10px 20px',
        borderRadius: '8px',
        boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <div>
          <i className="fas fa-user"></i>
          <span> Asror Soliyev</span>
        </div>
        <div>
          <i className="fas fa-phone"></i>
          <span> +998991234567</span>
        </div>
      </div>
    </div>
  );
}

export default Map;
