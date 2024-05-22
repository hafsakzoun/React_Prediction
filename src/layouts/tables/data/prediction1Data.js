import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Icon from "@mui/material/Icon";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiProgress from "components/VuiProgress";

function Completion({ value, color }) {
  return (
    <VuiBox display="flex" flexDirection="column" alignItems="flex-start">
      <VuiTypography variant="button" color="white" fontWeight="medium" mb="4px">
        {value}%&nbsp;
      </VuiTypography>
      <VuiBox width="8rem">
        <VuiProgress value={value} color={color} sx={{ background: "#2D2E5F" }} label={false} />
      </VuiBox>
    </VuiBox>
  );
}

const action = (
  <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small">
    more_vert
  </Icon>
);

const Prediction1Data = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    // Fetch data from the backend
    axios.get('http://127.0.0.1:5000/data/1')
      .then(response => {
        // Format data to match the table structure
        const fetchedRows = response.data.map(item => ({
          state: item.state,
          'account length': item.account_length,
          'area code': item.area_code,
          'international plan': item.international_plan,
          'voice mail plan': item.voice_mail_plan,
        }));
        setRows(fetchedRows);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  const columns = [
    { name: "state", align: "left" },
    { name: "account length", align: "left" },
    { name: "area code", align: "center" },
    { name: "international plan", align: "center" },
    { name: "voice mail plan", align: "center" },
  ];

  return { columns, rows };
};

export default Prediction1Data;
