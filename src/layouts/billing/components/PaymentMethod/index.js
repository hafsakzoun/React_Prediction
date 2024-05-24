// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";

// Images
import colors from "assets/theme/base/colors";

// Vision UI Dashboard component exemples
import { IoHappy, IoSad } from "react-icons/io5";

import { useEffect, useState } from "react";
import axios from "axios";

function PaymentMethod() {
  const { grey } = colors;
  const [churnRates, setChurnRates] = useState({});

  useEffect(() => {
    async function fetchChurnRates() {
      try {
        const response = await axios.get("http://localhost:5000/churn_rate_by_international_plan");
        setChurnRates(response.data);
      } catch (error) {
        console.error("Error fetching churn rates:", error);
      }
    }

    fetchChurnRates();
  }, []);

  return (
    <Card id="delete-account">
      <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb="32px">
        <VuiTypography variant="lg" fontWeight="bold" color="white">
          Churn Rate by International Plan
        </VuiTypography>
        <VuiButton variant="contained" color="info">
          YES and NO
        </VuiButton>
      </VuiBox>
      <VuiBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <VuiBox
              border="2px solid"
              borderRadius="20px"
              borderColor={grey[600]}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p="22px 20px"
            >
              <IoHappy color="green" width="21px" />
              <VuiTypography pl={2} variant="button" color="white" fontWeight="medium">
                {churnRates.Yes}% {/* Display churn rate for Yes */}
              </VuiTypography>
              <VuiBox ml="auto" lineHeight={0}>
              With international plan 
              </VuiBox>
            </VuiBox>
          </Grid>
          <Grid item xs={12} md={6}>
            <VuiBox
              border="2px solid"
              borderRadius="20px"
              borderColor={grey[600]}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p="22px 20px"
            >
              <IoSad color="red" width="25px" />
              <VuiTypography pl={2} variant="button" color="white" fontWeight="medium">
                {churnRates.No}% {/* Display churn rate for No */}
              </VuiTypography>
              <VuiBox ml="auto" lineHeight={0}>
              No international plan 
              </VuiBox>
            </VuiBox>
          </Grid>
        </Grid>
      </VuiBox>
    </Card>
  );
}

export default PaymentMethod;
