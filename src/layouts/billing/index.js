// @mui material components
import Grid from "@mui/material/Grid";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography"; // Make sure to import VuiTypography if it's used in other places

// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Billing page components
import PaymentMethod from "layouts/billing/components/PaymentMethod";
import Invoices from "layouts/billing/components/Invoices";
import BillingInformation from "layouts/billing/components/BillingInformation";
import Transactions from "layouts/billing/components/Transactions";
import CreditBalance from "./components/CreditBalance";

function Billing() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox mt={4}>
        <VuiBox mb={1.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={7} xl={8}>
              <Grid container spacing={3}>
                <Grid item xs={12} xl={6}>
                  <VuiBox display="flex" flexDirection="column" alignItems="center" p={3} bgcolor="primary.main" borderRadius={8}>
                    <VuiTypography variant="h2" color="info" fontWeight="bold" mb={2}>
                      Real-Time Customer Churn Prediction for Telecommunications
                    </VuiTypography>
                  </VuiBox>
                </Grid>
                <Grid item xs={12} md={12} xl={6}>
                  <CreditBalance />
                </Grid>
                <Grid item xs={12}>
                  <PaymentMethod />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={5} xl={4}>
              <Invoices />
            </Grid>
          </Grid>
        </VuiBox>
        <VuiBox my={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={5}>
              <BillingInformation />
            </Grid>
            <Grid item xs={12} md={7}>
              <Transactions />
            </Grid>
          </Grid>
        </VuiBox>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Billing;
