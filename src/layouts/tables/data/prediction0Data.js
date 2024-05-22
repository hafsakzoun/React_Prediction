import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Icon from "@mui/material/Icon";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiProgress from "components/VuiProgress";



const Prediction0Data = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    // Fetch data from the backend
    axios.get('http://127.0.0.1:5000/data/0')
      .then(response => {
        console.log('Fetched data:', response.data); // Debug log
        // Format data to match the table structure
        const fetchedRows = response.data.map(item => ({
          state: item.state,
          'account length': item.account_length,
          'area code': item.area_code,
          'international plan': item.international_plan,
          'voice mail plan': item.voice_mail_plan,
        }));
        console.log('Formatted rows:', fetchedRows); // Debug log
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

export default Prediction0Data;
