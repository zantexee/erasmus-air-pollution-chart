import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from '@faker-js/faker';

import { pollutionData } from '../data';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const calculateYearlyAverage = (yearlyData) => {
  if (!yearlyData) return 0;
  let totalLength = 0;
  const sum = Object.values(yearlyData).reduce((acc, curr) => {
    if (curr.length !== 0) {
      let tempSum = acc;
      Object.values(curr).forEach((value) => {
        totalLength++;
        return (tempSum += value);
      });
      return tempSum;
    }
  }, 0);
  return Math.round(sum / totalLength);
};

const LineChart = ({ city }) => {
  const labels = [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022];

  const labelsMonths = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'December',
  ];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Air Pollution Graph',
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'PM10 Levels',
        data: labels.map((label) =>
          calculateYearlyAverage(pollutionData[`${city}Data`][label]),
        ),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  return <Line options={options} data={data} />;
};

export default LineChart;
