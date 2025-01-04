import MapComponent from "./components/map-part/MapComponent.js";
import PointsGetter from "./components/menu-part/PointsGetter.js";

function App() {
  return (
    <div className="container flex flex-col mx-auto min-h-screen py-10 gap-4 lg:flex-row">
      <div className="grow">
        <div className="border rounded-2xl h-full">
          <div className="p-6 h-[inherit]">
            <MapComponent />
          </div>
        </div>
      </div>
      <div className="">
        <div className="border h-full rounded-2xl">
          <div className="py-6 px-3">
            <PointsGetter />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
