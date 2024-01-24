import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Veicoli from "../components/Veicoli";
import Charger from "../components/Charger";
import TimeTable from "../components/TimeTable";
import { useTranslation } from "react-i18next";

// Configuration component definition
function Configuration() {
  // Translation hook
  const { t } = useTranslation();

  // State for vehicle, charger, and timetable data
  const [vehicleData, setVehicleData] = useState([]);
  const [chargerData, setChargerData] = useState([]);
  const [timeTableData, setTimeTableData] = useState([]);

  // useEffect to fetch and translate data on component mount
  useEffect(() => {
    // Function to fetch and translate data from API
    const fetchAndTranslateData = async (url, setData) => {
      try {
        const response = await fetch(url);
        const data = await response.json();

        // Translate the data received from the API
        const translatedData = translateApiData(data);
        setData(translatedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch and translate data for vehicles, chargers, and timetable
    fetchAndTranslateData(
      "https://655f0a14879575426b44673d.mockapi.io/vehicles",
      setVehicleData
    );
    fetchAndTranslateData(
      "https://655f0a14879575426b44673d.mockapi.io/chargers",
      setChargerData
    );
    fetchAndTranslateData(
      "https://656d9c82bcc5618d3c238c0d.mockapi.io/timeTable",
      setTimeTableData
    );
  }, [t]);

  // Function to translate specific keys in API data
  const translateApiData = (apiData) => {
    return apiData.map((item) => {
      // Translate specific keys if present
      if (item.hasOwnProperty("Vehicle")) {
        item.Vehicle = t(item.Vehicle);
      }
      if (item.hasOwnProperty("Service")) {
        item.Service = t(item.Service);
      }
      // Add more keys to translate if necessary

      return item;
    });
  };

  // JSX structure for the Configuration component
  return (
    <Box textAlign='center' m={3}>
      <Typography variant='h4'>{t("Configuration Page")}</Typography>

      {/* First Table */}
      <Box mt={3}>
        <Typography variant='h6'>{t("Veicoli")}</Typography>
        <Veicoli vehicles={vehicleData} />
      </Box>

      {/* Second Table */}
      <Box mt={3}>
        <Typography variant='h6'>{t("Charger")}</Typography>
        <Charger chargers={chargerData} />
      </Box>

      {/* Third Table */}
      <Box mt={3}>
        <Typography variant='h6'>{t("TimeTable")}</Typography>
        <TimeTable timeTable={timeTableData} />
      </Box>
    </Box>
  );
}

export default Configuration;
