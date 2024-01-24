import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

// Function to define Pie Chart options
const PieChartOptions = ({ t }) => {
  return {
    chart: {
      width: 380,
      type: "pie",
    },
    labels: [
      t("Charging Costs"),
      t("Infrastructure"),
      t("Energy Management"),
      t("Maintenance Support"),
      t("Environmental Impact"),
      t("Vehicle Costs"),
      t("Regulatory Compliance"),
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
    legend: {
      fontSize: "12px",
    },
  };
};

// ApexChart component
const ApexChart = () => {
  const { t } = useTranslation();
  const [chartData, setChartData] = useState({
    series: [],
    options: {},
  });

  useEffect(() => {
    // Fetch data when the component mounts
    fetchChartData();
  }, []);

  // Function to fetch chart data from API
  const fetchChartData = () => {
    const apiUrl = "https://656d9a1bbcc5618d3c23856c.mockapi.io/chart2";

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Set chart data and options, utilize useTranslation for labels
        setChartData({
          ...chartData,
          series: data,
          options: PieChartOptions({ t }),
        });
      })
      .catch((error) => {
        console.error("Error fetching API data:", error);
      });
  };

  // JSX structure for ApexChart component
  return (
    <Card>
      <CardContent>
        <Typography variant='h7' gutterBottom>
          {t("Estimated Cost Contribution for next 24 Hours ($)")}
        </Typography>
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type='pie'
          width={441}
        />
      </CardContent>
    </Card>
  );
};

// Export the ApexChart component as the default export
export default ApexChart;
