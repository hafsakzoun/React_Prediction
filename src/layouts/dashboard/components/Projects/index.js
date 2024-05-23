import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
// @mui material components
import Card from "@mui/material/Card";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

function Projects() {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      labels: [],
    },
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/rates");
      const { subscribing_rate, unsubscribing_rate } = response.data;
      setChartData({
        series: [subscribing_rate, unsubscribing_rate],
        options: {
          labels: ["Subscribing", "Unsubscribing"],
          colors: ["#1a2560", "#65BEDC"],
        },
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <Card
      sx={{
        height: "100% !important",
      }}
    >
      <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb="32px">
        <VuiBox mb="auto">
          <VuiTypography color="white" variant="lg" mb="6px" gutterBottom>
            Prediction Distribution 
          </VuiTypography>
          <Card sx={{ height: "100% !important" }}>
            <div>
              <Chart options={chartData.options} series={chartData.series} type="pie" width="500" />
            </div>
        </Card>
        </VuiBox>
      </VuiBox>
    </Card>
  );
}

export default Projects;
