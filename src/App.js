import MapComponent from "./components/map-part/MapComponent.js";

function App() {
  return (
    <div className="w-[90%] flex mx-auto min-h-screen py-10">
      <div className="w-[25%] pl-4">
        <div className="border h-full"></div>
      </div>
      <div className="w-[75%] pr-4">
        <div className="border h-full">
          <div className="p-6">
            <MapComponent />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
