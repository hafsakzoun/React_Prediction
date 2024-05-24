// @mui material components
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

// React ApexCharts
import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

// Axios for making HTTP requests
import axios from "axios";

function Invoices() {
  // State to store the churn rate data
  const [churnRates, setChurnRates] = useState(null);
  // State to handle loading state
  const [loading, setLoading] = useState(true);

  // Fetch churn rate data from the API
  useEffect(() => {
    axios.get("http://localhost:5000/churn_rate_by_international_plan")
      .then(response => {
        setChurnRates(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching churn rate data:", error);
        setLoading(false);
      });
  }, []);

  // Chart options
  const chartOptions = {
    labels: churnRates ? Object.keys(churnRates) : [],
    colors: ["#197DBA", "#95DAF1"], // Customize colors as needed
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "14px",
      markers: {
        width: 12,
        height: 12,
      },
    },
  };

  return (
    <Card id="delete-account" sx={{ height: "100%" }}>
      <VuiBox mb="28px" display="flex" justifyContent="space-between" alignItems="center">
        <VuiTypography variant="h6" fontWeight="medium" color="white">
          Churn Rate by International Plan
        </VuiTypography>
      </VuiBox>
      <VuiBox>
        {/* Show loading spinner while data is being fetched */}
        {loading ? (
          <CircularProgress color="primary" />
        ) : (
          // Render the pie chart if data is available
          churnRates && (
            <ReactApexChart options={chartOptions} series={Object.values(churnRates)} type="pie" width="100%" />
          )
        )}
      </VuiBox>
      <VuiBox mb="30px" mt="30px" display="flex" justifyContent="space-between" alignItems="center">
        <VuiTypography variant="h6" fontWeight="small" color="grey" p="10px">
          This pie chart offers a comparative analysis of churn rates among customers with and without international plans. 
        </VuiTypography>
      </VuiBox>
    </Card>
  );
}

export default Invoices;
