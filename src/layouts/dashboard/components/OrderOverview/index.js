// @mui material components
import Card from "@mui/material/Card";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";


function OrdersOverview() {
  return (
    <Card className="h-100">
      <VuiBox mb="16px">
        <VuiTypography variant="lg" fontWeight="bold" mb="5px" color="white">
          About Customers 
        </VuiTypography>
        <VuiBox mb={2}>
        </VuiBox>
      </VuiBox>
    </Card>
  );
}

export default OrdersOverview;
