import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import useMapStore from "../../store/map";

// Fix default icon issues in React
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function MapComponent() {
  const { mapPoints } = useMapStore();

  const [centerPosition, setCenterPosition] = useState([35.7219, 51.3347]);

  useEffect(() => {
    if (mapPoints.length > 0) {
      setCenterPosition([mapPoints[0].latitude, mapPoints[0].longitude]);
    }
  }, [mapPoints]);

  return (
    <MapContainer
      center={centerPosition}
      key={centerPosition[0]}
      zoom={7}
      className="w-full aspect-[1/0.7]"
      style={{ direction: "ltr" }}
    >
      {/* TileLayer using OpenStreetMap tiles */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Place markers for each point */}
      {mapPoints.length > 0 &&
        mapPoints.map((position, index) => (
          <Marker
            key={index}
            position={[position.latitude, position.longitude]}
          >
            <Popup>Point {index + 1}</Popup>
          </Marker>
        ))}

      {/* Draw a polyline connecting all points */}
      {mapPoints.length > 0 && (
        <Polyline
          positions={mapPoints.map((item) => [item.latitude, item.longitude])}
          color="blue"
        />
      )}
    </MapContainer>
  );
}

export default MapComponent;
