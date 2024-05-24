// @mui material components
import Card from "@mui/material/Card";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";

function PredictionsByState() {
  const [data, setData] = useState({});

  useEffect(() => {
    axios.get("http://localhost:5000/predictions_count_by_state2")
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const chartData = {
    options: {
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          color: "#FF5733"
        }
      },
      xaxis: {
        categories: Object.keys(data)
      }
    },
    series: [{
      name: 'Prediction Count',
      data: Object.values(data)
    }]
  };

  return (
    <Card className="h-100">
      <VuiBox mb="16px">
        <VuiTypography variant="lg" fontWeight="bold" mb="5px" color="white">
          Subscribing Prediction by State 
        </VuiTypography>
        <VuiBox mb={2}>
          <Chart
            options={chartData.options}
            series={chartData.series}
            type="bar"
            height={350}
          />
        </VuiBox>
      </VuiBox>
    </Card>
  );
}

export default PredictionsByState;
