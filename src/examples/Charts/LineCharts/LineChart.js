import React from "react";
import ReactApexChart from "react-apexcharts";

const LineChart = ({ lineChartData }) => {
  const chartOptions = {
    chart: {
      id: "basic-line-chart"
    },
    xaxis: {
      categories: lineChartData.map((dataPoint) => dataPoint.x),
    },
  };

  return (
    <ReactApexChart
      options={chartOptions}
      series={[{ data: lineChartData.map((dataPoint) => dataPoint.y) }]}
      type="line"
      width="100%"
      height="100%"
    />
  );
};

export default LineChart;
