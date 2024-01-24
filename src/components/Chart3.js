import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

// Function to define Bar Chart options
const getChartOptions = (t) => {
  return {
    chart: {
      height: 350,
      type: "bar",
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: "top", // top, center, bottom
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val;
      },
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#304758"],
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
      position: "bottom",
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: "gradient",
          gradient: {
            colorFrom: "#D8E3F0",
            colorTo: "#BED1E6",
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    yaxis: {
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: true,
      },
      title: {
        text: t("kWh/Month"),
        style: {
          fontSize: "11px",
        },
      },
    },
    title: {
      text: t("Monthly Energy Consumption from Charging Stations"),
      floating: true,
      offsetY: 330,
      align: "center",
      style: {
        color: "#444",
      },
    },
  };
};

// ApexBarChart component
const ApexBarChart = () => {
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
    const apiUrl = "https://6569ffb0de53105b0dd802a8.mockapi.io/chart3";

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Translate text received from the API
        const translatedData = translateApiData(data);

        // Set chart data and options
        setChartData({
          ...chartData,
          series: translatedData,
          options: getChartOptions(t),
        });
      })
      .catch((error) => {
        console.error("Error fetching API data:", error);
      });
  };

  // Function to translate text received from the API
  const translateApiData = (apiData) => {
    return apiData.map((item) => {
      // Suppose "name" is a field to translate
      const translatedName = t(item.name);

      // Return a new object with translated text
      return { ...item, name: translatedName };
    });
  };

  // JSX structure for ApexBarChart component
  return (
    <Card>
      <CardContent>
        <Typography variant='h7' gutterBottom>
          {t("Monthly Energy Consumption from Charging Stations")}
        </Typography>
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type='bar'
          height={210}
        />
      </CardContent>
    </Card>
  );
};

// Export the ApexBarChart component as the default export
export default ApexBarChart;
