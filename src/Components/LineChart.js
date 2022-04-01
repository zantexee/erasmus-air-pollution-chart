/* eslint-disable no-loop-func */
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

const calculateMonthlyAverage = (numberOfMonths, yearlyData) => {
  if (!yearlyData) return 0;
  const values = Object.values(yearlyData).slice().reverse();
  const valuesLength = Object.values(values).length;
  let returnedArray = [];
  for (let i = valuesLength; i > valuesLength - numberOfMonths; i--) {
    let tempLength = 0;
    let sum = 0;
    Object.values(values[i - 1])
      .slice()
      .reverse()
      .forEach((value) => {
        tempLength++;
        sum += value;
      });
    returnedArray.push(Math.round(sum / tempLength));
  }
  return returnedArray;
};

const computeLastMonthValues = (yearlyData) => {
  if (!yearlyData) return 0;
  const values = Object.values(yearlyData);
  const valuesLength = Object.values(values).length;
  console.log(Object.values(values[valuesLength - 1]));
  return Object.values(values[valuesLength - 1]);
};

const LineChart = ({ city, period }) => {
  const labels = {
    yearly: [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
    monthly: [
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
    ],
    daily: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
    ],
  };
  console.log(period, city);
  // Options for the line chart generated with react-chart-js-2
  if (period === 'all') {
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
      labels: labels.yearly,
      datasets: [
        {
          label: 'PM10 Levels',
          data: labels.yearly.map((label) =>
            calculateYearlyAverage(pollutionData[`${city}Data`][label]),
          ),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    };
    return <Line options={options} data={data} />;
  }  
  if (period === '1') {
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
      labels: labels.daily,
      datasets: [
        {
          label: 'PM10 Levels',
          data: labels.daily.map(
            (dayNumber, index) =>
              computeLastMonthValues(pollutionData[`${city}Data`][2022])[index],
          ),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    };
    return <Line options={options} data={data} />;
  } 
   if (period === '3') {
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
      labels: labels.monthly,
      datasets: [
        {
          label: 'PM10 Levels',
          data: calculateMonthlyAverage(
            period,
            pollutionData[`${city}Data`][2022],
          ),

          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    };
    return <Line options={options} data={data} />;
  }
};

export default LineChart;
