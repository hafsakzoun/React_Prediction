// @mui material components
import Card from "@mui/material/Card";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

// Billing page components
import Bill from "layouts/billing/components/Bill";

function BillingInformation() {
  return (
    <Card id="delete-account">
      <VuiBox>
        <VuiTypography variant="lg" color="white" fontWeight="bold">
         Data Description
        </VuiTypography>
      </VuiBox>
      <VuiBox>
        <VuiBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          <Bill
            name="State"
            company="The state code where the customer resides."
          />
          <Bill
            name="Account Length"
            company="The number of days the customer has had an account."
          />
          <Bill
            name="Area Code"
            company="The area code of the customer's phone number."
          />
          <Bill
            name="International Plan"
            company="Whether the customer has an international calling plan (Yes/No)."
          />
          <Bill
            name="Voice Mail Plan"
            company="Whether the customer has a voice mail plan (Yes/No)."
          />
          <Bill
            name="Number of Voice Mail Messages"
            company=" The number of voice mail messages the customer has."
 
          />
        </VuiBox>
      </VuiBox>
    </Card>
  );
}

export default BillingInformation;
