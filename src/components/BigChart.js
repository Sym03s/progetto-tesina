import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { format, subDays } from "date-fns";
import { useTranslation } from "react-i18next";

// Component definition for the ApexMultiChart
const ApexMultiChart = () => {
  // Translation hook
  const { t } = useTranslation();

  // State to manage chart data
  const [chartData, setChartData] = useState({
    series: [],
    options: {},
  });

  // Fetch chart data on component mount
  useEffect(() => {
    fetchChartData();
  }, []);

  // Function to fetch chart data from API
  const fetchChartData = () => {
    const apiUrl = "https://6569feeade53105b0dd80184.mockapi.io/bigChart";

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Translate the texts received from the API
        const translatedData = translateApiData(data);

        // Update the chart data state
        setChartData({
          ...chartData,
          series: translatedData,
          options: getChartOptions(t),
        });
      })
      .catch((error) => {
        console.error("Error during API request:", error);
      });
  };

  // Function to translate API data
  const translateApiData = (apiData) => {
    return apiData.map((item) => {
      const translatedName = t(item.name);

      return { ...item, name: translatedName };
    });
  };

  // JSX structure for the ApexMultiChart component
  return (
    <Card>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          {t("Consumption Last Two Weeks")}
        </Typography>
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type='line'
          height={350}
        />
      </CardContent>
    </Card>
  );
};

// Export the component as the default export
export default ApexMultiChart;

// Function to get ApexChart options
const getChartOptions = (t) => {
  return {
    // Chart configuration options
    chart: {
      height: 350,
      type: "line",
      stacked: false,
    },
    stroke: {
      width: [0, 2, 5],
      curve: "smooth",
    },
    plotOptions: {
      bar: {
        columnWidth: "50%",
      },
    },
    // Fill configuration for the chart
    fill: {
      opacity: [0.85, 0.25, 1],
      gradient: {
        inverseColors: false,
        shade: "light",
        type: "vertical",
        opacityFrom: 0.85,
        opacityTo: 0.55,
        stops: [0, 100, 100, 100],
      },
    },
    // X-axis labels based on the last 14 days
    labels: Array.from({ length: 14 }, (_, index) => {
      const currentDate = new Date();
      const previousDate = subDays(currentDate, index);
      return format(previousDate, "MM/dd/yyyy");
    }).reverse(),
    markers: {
      size: 0,
    },
    xaxis: {
      type: "datetime",
    },
    // Y-axis configuration
    yaxis: {
      title: {
        text: t("Consumi kW/giorno"),
      },
      min: 0,
    },
    // Tooltip configuration
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y) {
          if (typeof y !== "undefined") {
            return y.toFixed(0) + " kW";
          }
          return y;
        },
      },
    },
  };
};
