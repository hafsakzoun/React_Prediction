import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { Card } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import WelcomeMark from "layouts/dashboard/components/WelcomeMark";
import Projects from "layouts/dashboard/components/Projects";
import OrderOverview from "layouts/dashboard/components/OrderOverview";
import PredictionsByState from "layouts/dashboard/components/PredictionsByState";
import SatisfactionRate from "layouts/dashboard/components/SatisfactionRate";
import ReferralTracking from "layouts/dashboard/components/ReferralTracking";
import LineChart from "examples/Charts/LineCharts/LineChart";
import { IoGlobe } from "react-icons/io5";
import { IoWallet } from "react-icons/io5";
import { IoDocumentText } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";

function Dashboard() {
  const [counts, setCounts] = useState({ prediction_0: 0, prediction_1: 0, total_clients: 0 });
  const [chartData, setChartData] = useState([]);
  const [chartData2, setChartData2] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const predictionsResponse = await axios.get('http://localhost:5000/count_predictions');
        const totalClientsResponse = await axios.get('http://localhost:5000/total_clients');
        const response = await axios.get("http://localhost:5000/churn_data");
        const response2 = await axios.get("http://localhost:5000/churn_data2");
        // Process the data to transform it into the required format
        const formattedData = response.data.map((item, index) => ({
          x: index + 1,
          y: item.probability[1] // Assuming you want the second probability
        })); 
        
        const formattedData2 = response2.data.map((item, index) => ({
          x: index + 1,
          y: item.probability[1] // Assuming you want the second probability
        }));
        
        setChartData(formattedData);
        setChartData2(formattedData2);
        setCounts({
          prediction_0: predictionsResponse.data.prediction_0,
          prediction_1: predictionsResponse.data.prediction_1,
          total_clients: totalClientsResponse.data.total_clients,
        });
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        <VuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Total Customers", fontWeight: "regular" }}
                count={counts.total_clients}
                icon={{ color: "info", component: <IoWallet size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Unsubscribing Number" }}
                count={counts.prediction_1}
                icon={{ color: "info", component: <IoGlobe size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Subscribing Number" }}
                count={counts.prediction_0}
                icon={{ color: "info", component: <IoDocumentText size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "New Customers" }}
                count="100"
                percentage={{ color: "success", text: "+5%" }}
                icon={{ color: "info", component: <FaShoppingCart size="20px" color="white" /> }}
              />
            </Grid>
          </Grid>
        </VuiBox>
        <VuiBox mb={3}>
          <Grid container spacing="18px">
            <Grid item xs={12} lg={12} xl={4}>
              <WelcomeMark />
            </Grid>
            <Grid item xs={12} lg={6} xl={3}>
              <SatisfactionRate />
            </Grid>
            <Grid item xs={12} lg={6} xl={5}>
              <ReferralTracking />
            </Grid>
          </Grid>
        </VuiBox>

        <VuiBox mb={3} >
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6} xl={12}>
              <Card>
                <VuiBox sx={{ height: "100%" }}>
                  <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
                    Churn Prediction 1 Probability
                  </VuiTypography>
                  <VuiBox display="flex" alignItems="center" mb="40px"></VuiBox>
                  <VuiBox sx={{ height: "310px" }}>
                    <LineChart lineChartData={chartData} />
                  </VuiBox>
                </VuiBox>
              </Card>
            </Grid>
            <Grid item xs={12} lg={6} xl={12}>
              <Card>
                <VuiBox sx={{ height: "100%" }}>
                  <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
                    Churn Prediction 0 Probability
                  </VuiTypography>
                  <VuiBox display="flex" alignItems="center" mb="40px"></VuiBox>
                  <VuiBox sx={{ height: "310px" }}>
                    <LineChart lineChartData={chartData2} />
                  </VuiBox>
                </VuiBox>
              </Card>
            </Grid>
          </Grid>
        </VuiBox>
        <Grid container spacing={3} direction="row" justifyContent="center" alignItems="stretch">
          <Grid item xs={12} md={6} lg={6}>
            <Projects />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <OrderOverview />
          </Grid>
          <Grid item xs={12} md={6} lg={12}>
            <PredictionsByState/>
          </Grid>
        </Grid>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;