import React from "react";
import { Pie } from "react-chartjs-2";

const PieChart = () => {
  const data = {
    labels: ['Food', 'Service', 'Waiting Time', 'Others'],
    datasets: [
      {
        data: [220, 420, 260, 460],
        backgroundColor: ['#ef4444', '#3b82f6', '#22c55e', '#000000'],
        hoverBackgroundColor: ['#ef4444', '#3b82f6', '#22c55e', '#000000'],
      },
    ],
  };

  return (
    <div className="flex justify-around items-center p-6 bg-transparent rounded-lg w-full h-full">
      <div className="w-1/2">
        <Pie data={data} />
      </div>
      <div className="w-1/2 flex flex-col justify-center">
        <h2 className="text-lg font-semibold mb-2">Graph Review</h2>
        <div>
          <span className="block text-gray-700">Food</span>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 mr-2"></div>
            <span className="font-semibold">220 (10%)</span>
          </div>
        </div>
        <div>
          <span className="block text-gray-700">Service</span>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-500 mr-2"></div>
            <span className="font-semibold">420 (40%)</span>
          </div>
        </div>
        <div>
          <span className="block text-gray-700">Waiting Time</span>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 mr-2"></div>
            <span className="font-semibold">260 (30%)</span>
          </div>
        </div>
        <div>
          <span className="block text-gray-700">Others</span>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-black mr-2"></div>
            <span className="font-semibold">460 (20%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PieChart;
