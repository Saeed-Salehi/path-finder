import React from "react";
import FilterInput from "../common/FilterInput";

const Filter = () => {
  return (
    <div className="">
      <span className="font-semibold text-lg"> Filter Point</span>
      <div className="mt-3">
        <FilterInput label={"Start Date"} name={"start"} />
        <FilterInput label={"End Date"} name={"end"} />
      </div>
    </div>
  );
};

export default Filter;
