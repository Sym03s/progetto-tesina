import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

// Function to get chart options
const getChartOptions = (t) => {
  return {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: Array.from({ length: 12 }, (_, index) => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() - 1;
        const currentMonth = index;
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
        return format(firstDayOfMonth, "MM/yy");
      }),
    },
    yaxis: {
      title: {
        text: t("Costo Energia ($)"),
      },
    },
  };
};

// ApexLineChart component
const ApexLineChart = () => {
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
    const apiUrl = "https://6569ffb0de53105b0dd802a8.mockapi.io/smallchart1";

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Translate the texts received from the API
        const translatedData = translateApiData(data);

        // Set chart data and options
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

  // Function to translate texts received from the API
  const translateApiData = (apiData) => {
    return apiData.map((item) => {
      // Assume that "label" is a field to be translated
      const translatedName = t(item.name);

      // Return a new object with translated texts
      return { ...item, name: translatedName };
    });
  };

  // JSX structure for the component
  return (
    <Card>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          {t("Energy Costs by Month (0.15$/kWh)")}
        </Typography>
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type='line'
          height={234}
        />
      </CardContent>
    </Card>
  );
};

// Export the ApexLineChart component as the default export
export default ApexLineChart;
