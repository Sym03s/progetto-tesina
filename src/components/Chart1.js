import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

// Function to define Radial Chart options
const RadialChartOptions = ({ t }) => {
  return {
    chart: {
      type: "radialBar",
      offsetY: -20,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: "#e7e7e7",
          strokeWidth: "97%",
          margin: 5, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            color: "#999",
            opacity: 1,
            blur: 2,
          },
        },
        dataLabels: {
          name: {
            show: true,
          },
          value: {
            offsetY: -40,
            fontSize: "22px",
          },
        },
      },
    },
    grid: {
      padding: {
        top: -10,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        shadeIntensity: 0.4,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 53, 91],
      },
    },
    labels: [
      t("Deposito 1"),
      t("Deposito 2"),
      t("Deposito 3"),
      t("Deposito 4"),
    ],
  };
};

// ApexRadialChart component
const ApexRadialChart = () => {
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
    const apiUrl = "https://656d9a1bbcc5618d3c23856c.mockapi.io/chart1";

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Set chart data and options, utilize useTranslation for labels
        setChartData({
          ...chartData,
          series: data,
          options: RadialChartOptions({ t }),
        });
      })
      .catch((error) => {
        console.error("Error fetching API data:", error);
      });
  };

  // JSX structure for ApexRadialChart component
  return (
    <Card>
      <CardContent>
        <Typography variant='h5' gutterBottom>
          {t("Chargers usati nelle ultime 24 ore")}
        </Typography>
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type='radialBar'
          height={428}
        />
      </CardContent>
    </Card>
  );
};

// Export the ApexRadialChart component as the default export
export default ApexRadialChart;
