import React, { useEffect, useRef, useState } from "react";
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
import Slider from "../common/Slider";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function MapComponent() {
  const { mapPoints, filters } = useMapStore();

  const [filteredItems, setFilteredItems] = useState([]);
  const [centerPosition, setCenterPosition] = useState([35.7219, 51.3347]);
  const [carPosition, setCarPosition] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);

  const currentIndex = useRef(0);

  useEffect(() => {
    const filterItems = () => {
      if (!filters.start && !filters.end) {
        setFilteredItems(mapPoints);
        return;
      }

      const filtered = mapPoints.filter((item) => {
        const itemDate = new Date(item.datetime);

        const startCheck = filters.start
          ? new Date(filters.start) <= itemDate
          : true;

        const endCheck = filters.end ? new Date(filters.end) >= itemDate : true;

        return startCheck && endCheck;
      });

      setFilteredItems(filtered);
    };

    filterItems();
  }, [filters, mapPoints]);

  useEffect(() => {
    if (filteredItems.length > 0) {
      const [latitude, longitude] = [
        filteredItems[0]?.latitude,
        filteredItems[0]?.longitude,
      ];
      setCenterPosition([latitude, longitude]);
      setCarPosition([latitude, longitude]);
    }
  }, [filteredItems]);

  const handleSliderChange = (event) => {
    const value = Number(event.target.value);
    currentIndex.current = value;
    setSliderValue(value);
    setCarPosition(getPositionFromSlider(value));
  };

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        if (currentIndex.current < 99) {
          currentIndex.current += 1;
          setSliderValue(currentIndex.current);
          setCarPosition(getPositionFromSlider(currentIndex.current));
        } else {
          setIsPlaying(false);
        }
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isPlaying, filteredItems]);

  const togglePlayPause = () => {
    if (currentIndex.current === 99) {
      currentIndex.current = 0;
      setCarPosition([filteredItems[0]?.latitude, filteredItems[0]?.longitude]);
    }
    setIsPlaying(!isPlaying);
  };

  const getPositionFromSlider = (sliderValue) => {
    const totalPoints = filteredItems.length - 1;
    const index = Math.floor((sliderValue / 100) * totalPoints);
    const nextIndex = Math.min(index + 1, totalPoints);

    const start = [
      filteredItems[index]?.latitude,
      filteredItems[index]?.longitude,
    ];
    const end = [
      filteredItems[nextIndex]?.latitude,
      filteredItems[nextIndex]?.longitude,
    ];

    const t = (sliderValue % (100 / totalPoints)) / (100 / totalPoints);

    const lat = start[0] + t * (end[0] - start[0]);
    const lng = start[1] + t * (end[1] - start[1]);

    return [lat, lng];
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <MapContainer
        center={centerPosition}
        key={centerPosition[0]}
        zoom={7}
        className="w-full grow max-lg:h-[60vh] rounded-lg overflow-hidden"
        style={{ direction: "ltr" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {filteredItems.length > 0 &&
          filteredItems.map((position, index) => (
            <Marker
              key={index}
              position={[position?.latitude, position?.longitude]}
            >
              <Popup>{position?.latitude + ", " + position?.longitude}</Popup>
            </Marker>
          ))}

        {filteredItems.length > 0 && (
          <Polyline
            positions={filteredItems.map((item) => [
              item?.latitude,
              item?.longitude,
            ])}
            color="blue"
          />
        )}

        {filteredItems.length > 0 && carPosition && (
          <Marker
            position={carPosition}
            icon={L.icon({
              iconUrl: "/images/icons/map-marker.png",
              iconSize: [32, 32],
              iconAnchor: [16, 16],
            })}
          >
            <Popup>{carPosition?.join(", ")}</Popup>
          </Marker>
        )}
      </MapContainer>
      {filteredItems.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center gap-2 w-full">
          <button onClick={togglePlayPause}>
            {isPlaying ? "Pause" : "Play"}
          </button>

          <Slider
            min="0"
            max={99}
            value={sliderValue}
            onChange={handleSliderChange}
            step="1"
            pointsLength={filteredItems.length}
          />
        </div>
      )}
    </div>
  );
}

export default MapComponent;
