import React from "react";
import ChartBar from "./ChartBar/ChartBar";
import "./Chart.css";

const Chart = ({ dataPoints }) => {
 const dataValues=dataPoints.map(dataPoint=>dataPoint.value);
 //max takes list of items not list of values
    const totalMaximum =Math.max(...dataValues);
    return (
    <div className="chart">
      {dataPoints.map((dataPoint) => (
        <ChartBar
          key={dataPoint.label}
          value={dataPoint.value}
          maxValue={totalMaximum}
          label={dataPoint.label}
        />
      ))}
    </div>
  );
};

export default Chart;
