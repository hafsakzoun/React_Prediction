import React from "react";

// @mui components
import { Card, Stack } from "@mui/material";

// Vision UI Dashboard assets
import balance from "assets/images/billing-background-balance.png";

// Vision UI Dashboard components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
const CreditBalance = () => {
  return (
    <Card sx={{ padding: "30px" }}>
      <VuiBox display="flex" flexDirection="column">
        <VuiBox
          mb="1px"
          p="20px"
          display="flex"
          flexDirection="column"
          sx={{ backgroundImage: `url(${balance})`, backgroundSize: "cover", borderRadius: "18px" }}
        >
          <VuiBox display="flex" justifyContent="space-beetween" alignItems="center">
            <VuiTypography variant="h2" color="white" fontWeight="bold" mr="auto">
              Overview
            </VuiTypography>
          </VuiBox>
          <VuiBox display="flex" justifyContent="space-between" alignItems="center">
            <VuiTypography style={{ fontSize: '16px', color: 'white', fontWeight: 'medium' }} mr="auto">
            This dataset contains detailed customer information from a telecommunications company. Each record represents a customer, including various attributes related to their account and usage patterns.
            </VuiTypography>
          </VuiBox>

        </VuiBox>
      </VuiBox>
    </Card>
  );
};

export default CreditBalance;
