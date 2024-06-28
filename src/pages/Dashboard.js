import { useEffect, useState } from "react";
import BarChart from "./components/BarChart";
import TransactionSummary from "./components/TransactionSummary";
import PieChart from "./components/PieChart";

export default function Dashboard() {
  const [totalMenu, setTotalMenu] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [topDishes, setTopDishes] = useState([]);
  const [tSum, setTSUM] = useState([]);
  const [itemSold, setItemSold] = useState(0);

  async function getTotalMenu() {
    const postData = {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    };
    const res = await fetch("http://localhost:3000/api/dashboard");
    const response = await res.json();
    setTotalMenu(response.mcount);
    setTotalOrders(response.ocount);
    setTopDishes(response.topdishes);
    setTSUM(response.tsummary);
    setItemSold(response.itemsold);
  }

  useEffect(() => {
    getTotalMenu();
  }, []);

  if (totalMenu == 0) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="overflow-x-none min-h-screen">
        <div className="mb-4 flex items-center justify-center">
          <h2 className="font-semibold text-4xl ">
            <span className="bg-gradient-to-r from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text">
              DASHBOARD{" "}
            </span>
          </h2>
        </div>
        <div className="flex flex-wrap items-start justify-center space-x-8 px-10">
          <div className="w-[1000px] h-[380px] p-10 mb-4 bg-gradient-to-t from-zinc-900 to-stone-800 shadow-md rounded border border-gray-300">
            <BarChart />
          </div>
          <div className="w-[500px] h-[380px] mb-4 bg-gradient-to-t from-zinc-900 to-stone-800 shadow-md rounded border border-gray-300 grid grid-cols-2 gap-4 p-8 place-items-center">
            <div className="w-[150px] h-[150px] bg-transparent shadow-md rounded border border-gray-300 flex flex-col items-center justify-between p-4">
              <div className="flex items-center justify-center flex-grow">
                <p className="text-4xl">{totalMenu[0].COUNT}</p>
              </div>
              <div>
                <p className="text-sm font-primary bg-gradient-to-r from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text">
                  TOTAL MENUS
                </p>
              </div>
            </div>
            <div className="w-[150px] h-[150px] bg-transparent shadow-md rounded border border-gray-300 flex flex-col items-center justify-between p-4">
              <div className="flex items-center justify-center flex-grow">
                <p className="text-4xl">472</p>
              </div>
              <div>
                <p className="text-sm bg-gradient-to-r from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text">
                  REVENUES
                </p>
              </div>
            </div>
            <div className="w-[150px] h-[150px] bg-transparent shadow-md rounded border border-gray-300 flex flex-col items-center justify-between p-4">
              <div className="flex items-center justify-center flex-grow">
                <p className="text-4xl">{itemSold[0].COUNT}</p>
              </div>
              <div>
                <p className="text-sm bg-gradient-to-r from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text">
                  ITEM SOLD
                </p>
              </div>
            </div>
            <div className="w-[150px] h-[150px] bg-transparent shadow-md rounded border border-gray-300 flex flex-col items-center justify-between p-4">
              <div className="flex items-center justify-center flex-grow">
                <p className="text-4xl">{totalOrders[0].COUNT}</p>
              </div>
              <div>
                <p className="text-sm bg-gradient-to-r from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text">
                  TOTAL ORDERS
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="w-[500px] h-[380px] p-10 mr-4 mb-5 bg-gradient-to-t from-zinc-900 to-stone-800 shadow-md rounded border border-gray-300">
              <h2 className="text-center bg-gradient-to-r from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text text-xl mb-4">
                TOP DISHES
              </h2>
              <ul className="text-white space-y-2">
                {topDishes.map((ele) => (
                  <li>
                    <div className="flex justify-between">
                      <span>{ele.DNAME}</span>
                      <span>Rs.470</span>
                    </div>
                    <div className="text-gray-400">→ {ele.COUNT} times</div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-[500px] h-[380px] p-10 mb-5 bg-gradient-to-t from-zinc-900 to-stone-800 shadow-md rounded border border-gray-300">
              <PieChart />
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text font-primary font-semibold text-3xl flex items-left">
            TRANSACTIONS SUMMARY
          </div>

          <div className="w-[900px] h-[180px] p-10 mb-5 bg-gradient-to-t from-zinc-900 to-stone-800 shadow-md rounded border border-gray-300">
            <TransactionSummary
              success={tSum[0].COUNT}
              cancel={tSum[1].COUNT}
            />
          </div>
        </div>
      </div>
    );
  }
}
