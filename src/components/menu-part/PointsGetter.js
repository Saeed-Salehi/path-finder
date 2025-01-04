import React from "react";
import * as XLSX from "xlsx";
import useMapStore from "../../store/map";
import FileUploader from "../common/FileUploader";
import Filter from "../filter/FilterForm";

const PointsGetter = () => {
  const { mapPoints, setMapPoints, setFilters } = useMapStore();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(sheet);

      const sortedData = jsonData.sort(
        (a, b) => new Date(a.datetime) - new Date(b.datetime)
      );

      setMapPoints(sortedData);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    setFilters(data);
  };

  return (
    <>
      <FileUploader
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
      />
      {mapPoints.length > 0 && (
        <form onSubmit={handleSubmitForm} className="mt-5">
          <Filter />
          <div className="flex justify-between">
            <button type="reset">Reset</button>
            <button type="submit">Set Filter</button>
          </div>
        </form>
      )}
    </>
  );
};

export default PointsGetter;
