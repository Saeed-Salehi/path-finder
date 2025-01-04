import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import useMapStore from "../../store/map";
import FileUploader from "../common/FileUploader";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

const PointsGetter = () => {
  const { mapPoints, setMapPoints, setFilters, filters } = useMapStore();
  const [fileName, setFileName] = useState("");

  const handleFileUpload = (event) => {
    try {
      const file = event.target.files[0];
      setFileName(file.name);
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
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (mapPoints.length > 0) {
      setFilters({
        start: mapPoints[0].datetime.valueOf(),
        end: mapPoints[mapPoints.length - 1].datetime.valueOf(),
      });
    }
  }, [mapPoints]);

  const resetAction = () => {
    setFilters({
      start: mapPoints[0].datetime.valueOf(),
      end: mapPoints[mapPoints.length - 1].datetime.valueOf(),
    });
  };

  return (
    <>
      <FileUploader
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        uploadedName={fileName}
      />
      {mapPoints.length > 0 && (
        <>
          <div className="mt-3">
            <DatePicker
              placeholder="Start Datetime"
              value={filters.start}
              onChange={(d) => setFilters({ ...filters, start: d.valueOf() })}
              editable={false}
              minDate={mapPoints[0].datetime.valueOf()}
              maxDate={filters.end}
              format="YYYY-MM-DD HH:mm:ss"
              inputClass="rmdp-input !rounded-[16px] !p-0"
              calendarPosition={"bottom-end"}
              plugins={[<TimePicker key={"TimePicker"} position="bottom" />]}
            />
          </div>
          <div className="mt-3">
            <DatePicker
              placeholder="End Datetime"
              value={filters.end}
              onChange={(d) => setFilters({ ...filters, end: d.valueOf() })}
              editable={false}
              minDate={filters.start}
              maxDate={mapPoints[mapPoints.length - 1].datetime.valueOf()}
              format="YYYY-MM-DD HH:mm:ss"
              inputClass="rmdp-input !rounded-[16px] !p-0"
              calendarPosition={"bottom-end"}
              plugins={[<TimePicker key={"TimePicker"} position="bottom" />]}
            />
          </div>
          <div className="flex justify-between mt-3">
            <button type="reset" onClick={resetAction}>
              Reset
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default PointsGetter;
