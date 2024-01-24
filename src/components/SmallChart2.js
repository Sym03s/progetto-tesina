import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

// Function to get chart options
const getChartOptions = (t) => {
  return {
    chart: {
      type: "polarArea",
    },
    stroke: {
      colors: ["#fff"],
    },
    fill: {
      opacity: 0.8,
    },
    labels: [
      t("00:00 - 03:00"),
      t("03:00 - 06:00"),
      t("06:00 - 09:00"),
      t("09:00 - 12:00"),
      t("12:00 - 15:00"),
      t("15:00 - 18:00"),
      t("18:00 - 21:00"),
      t("21:00 - 00:00"),
    ],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };
};

// ApexPolarAreaChart component
const ApexPolarAreaChart = () => {
  const { t } = useTranslation();
  const [chartData, setChartData] = useState({
    series: [],
    options: {},
  });

  // Fetch chart data on component mount
  useEffect(() => {
    fetchChartData();
  }, []);

  // Function to fetch chart data from the API
  const fetchChartData = () => {
    const apiUrl = "https://6569feeade53105b0dd80184.mockapi.io/smallChart2";

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Set chart data and options, utilizing useTranslation for labels
        setChartData({
          ...chartData,
          series: data,
          options: getChartOptions(t),
        });
      })
      .catch((error) => {
        console.error("Error during API request:", error);
      });
  };

  // JSX structure for the component
  return (
    <Card>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          {t("Distribuzione Oraria Bus Elettrici")}
        </Typography>
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type='polarArea'
          height={247}
        />
      </CardContent>
    </Card>
  );
};

// Export the ApexPolarAreaChart component as the default export
export default ApexPolarAreaChart;
