import { useEffect, useState } from "react";
import BarChart from "./components/BarChart";
import TransactionSummary from "./components/TransactionSummary";

export default function Dashboard({ timing }) {
  const [totalMenu, setTotalMenu] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [topDishes, setTopDishes] = useState([]);
  const [tSum, setTSUM] = useState([]);
  const [itemSold, setItemSold] = useState(0);
  const [lstock, setLstock] = useState([]);
  const [ostock, setOstock] = useState([]);
  const [meatIngredients, setMeatIngredients] = useState([]);
  const [isMeatExpanded, setIsMeatExpanded] = useState(false);
  const [isVegetableExpanded, setIsVegetableExpanded] = useState(false);
  const [vegetableIngredients, setVegetableIngredients] = useState([]);
  const [expiry, setExpiry] = useState([]);
  const [out, setOut] = useState(false);
  const [revenue, setRevenue] = useState([]);
  const [expense, setExpense] = useState([]);
  const [genbills, setGenBills] = useState(0);
  const [stores, setStores] = useState('');
  const [remindDate, setRemindDate] = useState('');
  const texp = expense[expense.length - 1];
  const trev = revenue[revenue.length - 1];
  let slno = 0;
  const isSaturday = new Date().getDay() === 2 || new Date().getDay() === 6;

  async function getTotalMenu() {
    const res = await fetch("http://localhost:3000/api/dashboard");
    const response = await res.json();
    setTotalMenu(response.mcount);
    setTotalOrders(response.ocount);
    setTopDishes(response.topdishes.slice(0, 4));
    setTSUM(response.tsummary);
    setItemSold(response.itemsold);
    setGenBills(response.genbills[0].COUNT);
    const formattedRevenue = response.revenue.map((item) =>
      item.revenue !== null ? parseInt(item.revenue) : 0
    );
    setRevenue(formattedRevenue);
    const formattedExpense = response.expense.map((item) =>
      item.revenue !== null ? parseInt(item.revenue) : 0
    );
    setExpense(formattedExpense);
  }

  async function send_mail() {
    if (timing === 'N') {
      const today = new Date().toISOString().split("T")[0];
      if (remindDate === today) {
        console.log(stores)
        const postData = {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ email: stores }),
        };
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/sendemail`,
          postData
        );
        const response = await res.text();
        if (res.status === 200){
          console.log(response);
          setRemindDate(response.date)
        }
      } // date
    } // night
  }

  async function getReminder() {
    const res = await fetch("http://localhost:3000/api/reminder");
    const response = await res.json();
    setLstock(response.lstock);
    setMeatIngredients(response.meatIngredients);
    setVegetableIngredients(response.vegetableIngredients);
    setExpiry(response.expiry);
    setOstock(response.ostock);
  }

  async function getStoresMail() {
    const res = await fetch("http://localhost:3000/api/sendemail");
    const response = await res.json();
    setStores(response.stores[0].EMAIL)
    setRemindDate(response.date)
  }

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  }

  useEffect(()=>{
    send_mail()
  },[timing,stores])

  useEffect(() => {
    getTotalMenu();
    getReminder();
    getStoresMail();
  }, []);

  if (totalMenu == 0) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="overflow-x-none min-h-screen">
        <h2
          className="py-5 flex items-center  justify-center font-semibold text-4xl "
        >
          <span className="bg-gradient-to-r from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text">
            DASHBOARD{" "}
          </span>
        </h2>
        <div className="py-5 ">
          <div className="flex items-center justify-center space-x-5">
            <div className="items-center flex flex-col">
              <div className="w-[1030px] h-[380px] p-10 mb-4 bg-gradient-to-t from-zinc-900 to-stone-800 shadow-md rounded border border-gray-300">
                <BarChart />
              </div>
            </div>
            <div className="">
              <div
                className={`${lstock.length !== 0 || expiry.length !== 0
                    ? "shadow-red-900 shadow-md border-red-900 border-4 animate-pulse-border"
                    : "border border-gray-300 shadow-md"
                  } w-[530px] h-[380px] mb-5 bg-gradient-to-t from-zinc-900 to-stone-800 rounded overflow-auto`}
              >
                <div className="p-4 flex items-center justify-between">
                  <h2 className="text-center font-bold tracking-widest bg-gradient-to-r from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text text-2xl mb-4">
                    ALERTS & REMINDERS
                  </h2>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-red-600 text-lg font-semibold">
                      Out of Stock:{" "}
                    </h2>
                    <input
                      type="checkbox"
                      id="isveg"
                      name="isveg"
                      className="h-[20px] w-[20px]"
                      checked={out}
                      onChange={(e) => setOut(!out)}
                    />
                  </div>
                </div>
                <div className="px-4 space-y-1">
                  {lstock.length !== 0
                    ? lstock.map((ele, index) => {
                      slno = slno + 1;
                      return (
                        <div
                          className="hover:bg-white hover:bg-opacity-10 p-1 border-b border-zinc-600"
                          key={index}
                        >
                          {slno}. {ele.INAME} is{" "}
                          <span className="text-lg animate-pulse animate-reduce font-bold text-red-600">
                            LOW ON STOCK
                          </span>
                        </div>
                      );
                    })
                    : null}

                  {ostock.length !== 0 && out
                    ? ostock.map((ele, index) => {
                      slno = slno + 1;
                      return (
                        <div
                          className="hover:bg-white hover:bg-opacity-10 p-1 border-b border-zinc-600"
                          key={index}
                        >
                          {slno}. {ele.INAME} is{" "}
                          <span className="text-lg animate-pulse animate-reduce font-bold text-red-600">
                            OUT OF STOCK
                          </span>
                        </div>
                      );
                    })
                    : null}

                  {expiry.length !== 0
                    ? expiry.map((ele, index) => {
                      slno = slno + 1;
                      return (
                        <div
                          className="hover:bg-white hover:bg-opacity-10 p-1 border-b border-zinc-600"
                          key={index}
                        >
                          {slno}. {ele.INAME} Stock{" "}
                          <span className="text-zinc-500">({ele.SID})</span>{" "}
                          is{" "}
                          <span className="text-lg animate-pulse animate-reduce font-bold text-red-600">
                            EXPIRING SOON
                          </span>{" "}
                          <span className="text-zinc-500">
                            ({formatDate(ele.EXP_DATE)})
                          </span>
                        </div>
                      );
                    })
                    : null}

                  {"M,N".includes(timing) ? (
                    <div>
                      <div
                        className="flex justify-between hover:bg-white hover:bg-opacity-10 p-1 border-b border-zinc-600 cursor-default"
                        onClick={() => setIsMeatExpanded(!isMeatExpanded)}
                      >
                        <div>
                          {(slno = slno + 1)}. Meat Stock has to be{" "}
                          <span className="text-lg animate-pulse animate-reduce font-bold text-yellow-600">
                            REFILLED
                          </span>
                        </div>
                        <button type="button" className="px-3">
                          <div
                            className={` ${isMeatExpanded ? "rotate-90" : "-rotate-90"
                              }
                                        border-t-[7px] border-t-transparent
                                        border-r-[7px] border-r-white hover:border-r-zinc-500
                                        border-b-[7px] border-b-transparent  transition-all duration-300`}
                          ></div>
                        </button>
                      </div>
                      {isMeatExpanded ? (
                        <div className="pl-4">
                          {meatIngredients.map((ele, index) => (
                            <div key={index}>
                              →{" "}
                              <span className="font-semibold">
                                {ele.NAME.toUpperCase()}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ) : null}

                  {isSaturday ? (
                    <div>
                      <div
                        className="flex justify-between hover:bg-white hover:bg-opacity-10 p-1 border-b border-zinc-600 cursor-default"
                        onClick={() =>
                          setIsVegetableExpanded(!isVegetableExpanded)
                        }
                      >
                        <div>
                          {(slno = slno + 1)}. Vegetables Stock has to be{" "}
                          <span className="text-lg animate-pulse animate-reduce font-bold text-yellow-600">
                            REFILLED
                          </span>
                        </div>
                        <button type="button" className="px-3">
                          <div
                            className={` ${isVegetableExpanded ? "rotate-90" : "-rotate-90"
                              } 
                                          border-t-[7px] border-t-transparent 
                                          border-r-[7px] border-r-white hover:border-r-zinc-500 border-b-[7px] 
                                          border-b-transparent  transition-all duration-300`}
                          ></div>
                        </button>
                      </div>
                      {isVegetableExpanded ? (
                        <div className="pl-4">
                          {vegetableIngredients.map((ele, index) => (
                            <div key={index}>
                              →{" "}
                              <span className="font-semibold">
                                {ele.NAME.toUpperCase()}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-start justify-center space-x-8 px-10">
            <div className="flex space-x-10 items-center justify-center">
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
                    <p className="text-4xl">{genbills}</p>
                  </div>
                  <div>
                    <p className="text-[12px] bg-gradient-to-r from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text">
                      BILLS GENERATED
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
                <div className="w-[500px] h-[380px] p-10 mb-5 bg-gradient-to-t from-zinc-900 to-stone-800 shadow-md rounded border border-gray-300">
                  <h2 className="text-center bg-gradient-to-r from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text text-xl mb-4">
                    TOP DISHES
                  </h2>
                  <ul className="text-white space-y-2">
                    {topDishes.map((ele) => (
                      <li>
                        <div className="flex justify-between">
                          <span>{ele.DNAME}</span>
                          <span>Rs.{ele.PRICE}</span>
                        </div>
                        <div className="text-gray-400">→ {ele.COUNT} times</div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="items-center flex flex-col">
                <div className="w-[500px] h-[380px] p-10 mb-4 bg-gradient-to-t from-zinc-900 to-stone-800 shadow-md rounded border border-gray-300">
                  <div className="flex flex-col h-full justify-between items-center">
                    <div className="flex justify-between w-full">
                      <div className="flex flex-col items-center">
                        <h2>Today's Revenues</h2>
                        <h2>₹ {trev}</h2>
                      </div>
                      <div className="flex flex-col items-center">
                        <h2>Today's Expenses</h2>
                        <h2>₹ {texp}</h2>
                      </div>
                    </div>
                    {trev - texp > 0 ? (
                      <div className="flex flex-col space-y-5 -translate-y-5 items-center">
                        <h2>Today's Profit</h2>
                        <div className="flex items-center space-x-5">
                          <div>
                            <div
                              className={` rotate-90
                                        border-t-[7px] border-t-transparent
                                        border-r-[7px] border-r-green-600 scale-[1.5]
                                        border-b-[7px] border-b-transparent  transition-all duration-300`}
                            ></div>
                          </div>
                          <h2 className="text-5xl text-green-600">
                            ₹ {Math.floor(trev - texp)}
                          </h2>
                        </div>
                      </div>
                    ) : trev - texp === 0 ? (
                      <div className="flex flex-col space-y-5 -translate-y-5 items-center">
                        <h2>Today's Profit/Loss</h2>
                        <div className="flex items-center space-x-5">
                          <div>
                            <div className={`text-3xl scale-[1.5]`}>-</div>
                          </div>
                          <h2 className="text-5xl">
                            ₹ {Math.floor(trev - texp)}
                          </h2>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col space-y-5 -translate-y-5 items-center">
                        <h2>Today's Loss</h2>
                        <div className="flex items-center space-x-5">
                          <div>
                            <div
                              className={` -rotate-90
                                        border-t-[7px] border-t-transparent
                                        border-r-[7px] border-r-red-600 scale-[1.5]
                                        border-b-[7px] border-b-transparent  transition-all duration-300`}
                            ></div>
                          </div>
                          <h2 className="text-5xl text-red-600">
                            ₹ {Math.floor(trev - texp) * -1}
                          </h2>
                        </div>
                      </div>
                    )}
                    <div></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="bg-gradient-to-r from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text font-primary font-semibold text-3xl flex items-left">
                TRANSACTIONS SUMMARY
              </div>

              <div className="w-[900px] h-[180px] p-10 mb-5 bg-gradient-to-t from-zinc-900 to-stone-800 shadow-md rounded border border-gray-300">
                <TransactionSummary
                  success={(tSum && tSum.length > 0 && tSum[0].COUNT) || 0}
                  cancel={(tSum && tSum.length > 1 && tSum[1].COUNT) || 0}
                  totalord={
                    (totalOrders &&
                      totalOrders.length > 0 &&
                      totalOrders[0].COUNT) ||
                    0
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
