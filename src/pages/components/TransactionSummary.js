import React, { useEffect, useState } from "react";

const TransactionSummary = ({success,cancel}) => {

  let total = success + cancel;
  const [ sPercent, setSPercent] = useState(0);
  const [ cPercent, setCPercent] = useState(0);

  useEffect(()=>{
    let spercent = Math.floor((success/total)*100);
    setSPercent(spercent);
    let cpercent = Math.floor((cancel/total)*100);
    setCPercent(cpercent);
  },[total])

  return (
    <div className="flex justify-around items-center p-6 bg-transparent rounded-lg w-full h-full">
      <div className="flex flex-col items-center">
        <div className="flex items-center space-x-5">
          <div className="flex flex-col items-center">
            <div className="relative w-20 h-20">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 36 36">
                <path
                  className="text-green-500 stroke-current"
                  strokeWidth="4"
                  fill="none"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  strokeDasharray={`${sPercent},100`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-green-500 text-xl font-semibold">{sPercent}%</span>
              </div>
            </div>
            <span className="mt-2 text-xl font-semibold">{success}</span>
            <span className="text-gray-500">Successful Order</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative w-20 h-20">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 36 36">
                <path
                  className="text-red-500 stroke-current"
                  strokeWidth="4"
                  fill="none"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  strokeDasharray={`${cPercent},100`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-red-500 text-xl font-semibold">{cPercent}%</span>
              </div>
            </div>
            <span className="mt-2 text-xl font-semibold">{cancel}</span>
            <span className="text-gray-500">Cancelled orders</span>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center space-x-5">
        <div className="flex flex-col items-center mr-4">
          <h2 className="text-lg mb-2  bg-gradient-to-r from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text">Average</h2>
          <span className="text-3xl font-semibold">87,456</span>
          <span className="text-gray-500">Order</span>
        </div>
      </div>
    </div>
  );
};

export default TransactionSummary;
