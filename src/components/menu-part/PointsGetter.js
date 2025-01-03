import React from "react";
import * as XLSX from "xlsx";
import useMapStore from "../../store/map";

const PointsGetter = () => {
  const { setMapPoints } = useMapStore();

  // Function to handle file input and parse Excel file
  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      // Assuming the first sheet has the data
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Convert Excel sheet to JSON
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      // Sort data by datetime
      const sortedData = jsonData.sort(
        (a, b) => new Date(a.datetime) - new Date(b.datetime)
      );

      // Store sorted data in state
      setMapPoints(sortedData);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
    </>
  );
};

export default PointsGetter;
