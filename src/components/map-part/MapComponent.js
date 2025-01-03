import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const points = [
  [35.7219, 51.3347],
  [34.7219, 50.5347],
  [33.7219, 49.1347],
  [32.7219, 48.2347],
  [31.7219, 47.1347],
];

const polylinePath = points;

// Fix default icon issues in React
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function MapComponent() {
  const position = [35.7219, 51.3347]; // Set map center coordinates (latitude, longitude)

  return (
    <MapContainer
      center={position}
      zoom={13}
      className="w-full aspect-[1/0.7]"
      style={{ direction: "ltr" }}
    >
      {/* TileLayer using OpenStreetMap tiles */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Place markers for each point */}
      {points.map((position, index) => (
        <Marker key={index} position={position}>
          <Popup>Point {index + 1}</Popup>
        </Marker>
      ))}

      {/* Draw a polyline connecting all points */}
      <Polyline positions={polylinePath} color="blue" />
    </MapContainer>
  );
}

export default MapComponent;
