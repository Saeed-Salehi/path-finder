import React from "react";

const Slider = ({pointsLength = 0 ,...reset}) => {
  return (
    <div className="relative grow w-full">
      <label htmlFor="labels-range-input" className="sr-only">
        Labels range
      </label>
      <input
        id="labels-range-input"
        type="range"
        value="1000"
        min="100"
        max="1500"
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        {...reset}
      />
      <div className="flex items-center justify-between">
        {Array(pointsLength)
          .fill({})
          .map((_,index) => (
            <span key={index} className="text-sm text-gray-500">
              point {index +1}
            </span>
          ))}
      </div>
    </div>
  );
};

export default Slider;
