import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import React, { useEffect, useState } from 'react';

const VulnChart = () => {
  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date.toLocaleDateString('en-US', { weekday: 'long' }));
    }
    return days;
  };

  const [revenue, setRevenue] = useState([]);
  const [expense, setExpense] = useState([]);

  async function getRevenue() {
    const res = await fetch("http://localhost:3000/api/dashboard");
    const response = await res.json();
    const formattedRevenue = response.revenue.map(item => item.revenue !== null ? parseInt(item.revenue) : 0);
    setRevenue(formattedRevenue);
    
    const formattedExpense = response.expense.map(item => item.revenue !== null ? parseInt(item.revenue) : 0);
    setExpense(formattedExpense);
  }

  useEffect(() => {
    getRevenue();
  }, []);

  const labels = getLast7Days();

  return (
    <div className="w-full h-full">
      <Line
        data={{
          labels: labels,
          datasets: [
            {
              label: "Total Revenue",
              data: revenue,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
              fill: true,
            },{
              label: "Total Expense",
              data: expense,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
              fill: true,
            },
          ],
        }}
        height={300}
        width={500}
        options={{
          scales: {
            x: {
              ticks: {
                rotation: 45,
                padding: 4,
                color: 'white', // Change color of x-axis labels
              },
            },
            y: {
              beginAtZero: true,
              ticks: {
                color: 'white', // Change color of y-axis labels
                callback: function (value) {
                  return '₹' + value; // Format y-axis ticks as rupees
                },
              },
            },
          },
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'top',
              labels: {
                color: 'white', // Change color of legend labels
              },
            },
          },
        }}
      />
    </div>
  );
};

export default VulnChart;
