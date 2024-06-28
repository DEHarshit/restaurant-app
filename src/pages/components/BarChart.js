import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
const VulnChart = () => {
  return (
    <div className="w-full h-full">
      <Line
        data={{
          labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          datasets: [
            {
              label: "Total Revenue",
              data: [1000, 1500, 1200, 1800, 2000],
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
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
