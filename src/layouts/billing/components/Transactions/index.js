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

function Transactions() {
  // State to store the churn rate data by customer service calls
  const [churnRatesByServiceCalls, setChurnRatesByServiceCalls] = useState(null);
  // State to store the churn rate data by account length
  const [churnRatesByAccountLength, setChurnRatesByAccountLength] = useState(null);
  
  // State to handle loading state for both charts
  const [loading, setLoading] = useState(true);

  // Fetch churn rate data by customer service calls from the API
  useEffect(() => {
    axios.get("http://localhost:5000/churn_rate_by_customer_service_calls")
      .then(response => {
        setChurnRatesByServiceCalls(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching churn rate data by customer service calls:", error);
        setLoading(false);
      });
  }, []);

  // Fetch churn rate data by account length from the API
  useEffect(() => {
    axios.get("http://localhost:5000/churn_rate_by_account_length")
      .then(response => {
        setChurnRatesByAccountLength(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching churn rate data by account length:", error);
        setLoading(false);
      });
  }, []);

  // Convert churn rate data into series for both charts
  const seriesDataByServiceCalls = churnRatesByServiceCalls ? Object.values(churnRatesByServiceCalls) : [];
  const labelsByServiceCalls = churnRatesByServiceCalls ? Object.keys(churnRatesByServiceCalls) : [];

  const seriesDataByAccountLength = churnRatesByAccountLength ? Object.values(churnRatesByAccountLength) : [];
  const labelsByAccountLength = churnRatesByAccountLength ? Object.keys(churnRatesByAccountLength) : [];

  // Chart options for both charts
  const chartOptionsByServiceCalls = {
    chart: {
      type: "line",
      height: 350,
      toolbar: {
        show: false
      }
    },
    colors: ['#5ACDF4'], 
    xaxis: {
      categories: labelsByServiceCalls,
    },
  };

  const chartOptionsByAccountLength = {
    chart: {
      type: "line",
      height: 350,
      toolbar: {
        show: false
      }
    },
    colors: ['#5ACDF4'], 
    xaxis: {
      categories: Object.keys(churnRatesByAccountLength),
    },
  };

  return (
    <Card sx={{ height: "100%" }}>
      <VuiBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb="18px"
        sx={({ breakpoints }) => ({
          [breakpoints.down("lg")]: {
            flexDirection: "column",
          },
        })}
      >
        <VuiTypography
          variant="lg"
          fontWeight="bold"
          textTransform="capitalize"
          color="white"
          sx={({ breakpoints }) => ({
            [breakpoints.only("sm")]: {
              mb: "6px",
            },
          })}
        >
          Churn Rate by Customer Service Calls
        </VuiTypography>
      </VuiBox>
      <VuiBox p="20px">
        {/* Show loading spinner while data is being fetched */}
        {loading ? (
          <CircularProgress color="primary" />
        ) : (
          // Render the chart if data is available
          <ReactApexChart options={chartOptionsByServiceCalls} series={[{ data: seriesDataByServiceCalls }]} type="line" height={350} />
        )}
      </VuiBox>
      <VuiBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb="18px"
        sx={({ breakpoints }) => ({
          [breakpoints.down("lg")]: {
            flexDirection: "column",
          },
        })}
      >
        <VuiTypography
          variant="lg"
          fontWeight="bold"
          textTransform="capitalize"
          color="white"
          sx={({ breakpoints }) => ({
            [breakpoints.only("sm")]: {
              mb: "6px",
            },
          })}
        >
          Churn Rate by Account Length
        </VuiTypography>
      </VuiBox>
      <VuiBox p="20px">
        {/* Show loading spinner while data is being fetched */}
        {loading ? (
          <CircularProgress color="primary" />
        ) : (
          // Render the chart if data is available
          <ReactApexChart options={chartOptionsByAccountLength} series={[{ data: seriesDataByAccountLength }]} type="line" height={350} />
        )}
      </VuiBox>
    </Card>
  );
}

export default Transactions;
