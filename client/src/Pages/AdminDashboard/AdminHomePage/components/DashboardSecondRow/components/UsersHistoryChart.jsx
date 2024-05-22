import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import ReactApexChart from "react-apexcharts";
import { useSelector, useDispatch } from "react-redux";
import { getUserStats } from "../../../../../../redux/actions/UserAction";

// chart options
const splineAreaChartOptions = {
  series: [
    {
      type: "area",
      data: [],
    },
  ],
  chart: {
    height: 350,
    type: "area",
    stacked: true,
  },
  // other options...
};

const UsersHistoryChart = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const userStats = useSelector((state) => state.User.userStats);

  useEffect(() => {
    dispatch(getUserStats());
  }, [dispatch]);

  const { primary, secondary } = theme.palette.text;
  const info = theme.palette.info.light;

  const [series, setSeries] = useState([
    {
      data: [],
    },
  ]);

  const [options, setOptions] = useState(splineAreaChartOptions);

  useEffect(() => {
    // Update chart data with userStats data
    setSeries([
      {
        data: userStats.map((data) => data.total),
      },
    ]);

    // Update chart options
    setOptions((prevState) => ({
      ...prevState,
      colors: [primary],
      xaxis: {
        title: {
          text: "Years",
        },
        labels: {
          style: {
            colors: [
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
            ],
          },
        },
      },
      tooltip: {
        theme: "light",
      },
      chart: {
        type: "area",
        height: 350,
        zoom: {
          enabled: true,
        },
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
        width: 3,
      },
      markers: {
        size: 0,
        style: "hollow",
      },
      yaxis: {
        title: {
          text: "Users",
        },
        min: 0,
      },
      legend: {
        show: true,
        labels: {
          colors: [primary],
          useSeriesColors: true,
        },
      },

      labels: userStats.map((data) => `${data._id.month}/${data._id.year}`),
    }));
  }, [primary, info, secondary, userStats]);

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={420}
      />
    </div>
  );
};

export default UsersHistoryChart;
