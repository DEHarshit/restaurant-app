import Link from 'next/link';
import BarChart from "./components/BarChart";
import { useState, useEffect } from 'react'

export default function Bills() {

    const [bills, setBills] = useState([])
    const [revenue, setRevenue] = useState([]);
    const [expense, setExpense] = useState([]);
    const texp = expense[expense.length - 1];
    const trev = revenue[revenue.length - 1];

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


    async function getBills() {
        const postData = {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            }
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/bill`, postData);
        const response = await res.json();
        setBills(response.bills)
    }

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    useEffect(() => {
        getBills();
    }, [])


    return (
        <div className="relative flex bg-black justify-center w-screen  ">
            <div className='animate-pulse'>
                <div className='absolute left-0'>
                    <img src="/menu-bg-1.png" className='h-screen' />
                </div>
                <div className='absolute bottom-0 right-0'>
                    <img src="/menu-bg-2.png" />
                </div>
            </div>
            <div className='flex flex-col items-center p-10 space-y-3 z-20'>
                <div className='flex space-x-10'>
                    <div className="items-center flex flex-col">
                        <div className="w-[1030px] h-[380px] p-10 mb-4 bg-gradient-to-t from-zinc-900 to-stone-800 shadow-md rounded border border-gray-300">
                            <BarChart />
                        </div>
                    </div>
                    <div className="items-center flex flex-col">
                        <div className="w-[500px] h-[380px] p-10 mb-4 bg-gradient-to-t from-zinc-900 to-stone-800 shadow-md rounded border border-gray-300">
                            <div className='flex flex-col h-full justify-between items-center'>
                                <div className='flex justify-between w-full'>
                                    <div className='flex flex-col items-center'>
                                        <h2>
                                            Today's Revenues
                                        </h2>
                                        <h2>
                                            ₹ {trev}
                                        </h2>
                                    </div>
                                    <div className='flex flex-col items-center'>
                                        <h2>
                                            Today's Expenses
                                        </h2>
                                        <h2>
                                            ₹ {texp}
                                        </h2>
                                    </div>
                                </div>
                                {trev - texp > 0
                                    ?
                                    <div className='flex flex-col space-y-5 -translate-y-5 items-center'>
                                        <h2>
                                            Today's Profit
                                        </h2>
                                        <div className='flex items-center space-x-5'>
                                            <div>
                                                <div className={` rotate-90
                                        border-t-[7px] border-t-transparent
                                        border-r-[7px] border-r-green-600 scale-[1.5]
                                        border-b-[7px] border-b-transparent  transition-all duration-300`}>
                                                </div>
                                            </div>
                                            <h2 className='text-5xl text-green-600'>
                                                ₹ {Math.floor(trev - texp)}
                                            </h2>
                                        </div>
                                    </div>
                                    :
                                    trev - texp === 0 
                                        ?
                                        <div className='flex flex-col space-y-5 -translate-y-5 items-center'>
                                            <h2>
                                                Today's Profit/Loss
                                            </h2>
                                            <div className='flex items-center space-x-5'>
                                                <div>
                                                    <div className={`text-3xl scale-[1.5]`}>
                                                        -
                                                    </div>
                                                </div>
                                                <h2 className='text-5xl'>
                                                    ₹ {Math.floor(trev - texp)}
                                                </h2>
                                            </div>
                                        </div>
                                        :
                                        <div className='flex flex-col space-y-5 -translate-y-5 items-center'>
                                            <h2>
                                                Today's Loss
                                            </h2>
                                            <div className='flex items-center space-x-5'>
                                                <div>
                                                    <div className={` -rotate-90
                                        border-t-[7px] border-t-transparent
                                        border-r-[7px] border-r-red-600 scale-[1.5]
                                        border-b-[7px] border-b-transparent  transition-all duration-300`}>
                                                    </div>
                                                </div>
                                                <h2 className='text-5xl text-red-600'>
                                                    ₹ {Math.floor((trev - texp)*-1)}
                                                </h2>
                                            </div>
                                        </div>
                                }
                                <div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <span>
                    <div className='text-3xl font-semibold tracking-widest leading-8'>
                        <span className='bg-gradient-to-b from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text'>BI</span>LLS
                    </div>
                </span>
                <table className="bg-zinc-900 rounded-2xl w-[1400px] ">
                    <thead className='border-b border-white'>
                        <tr>
                            <th className='py-2'>
                                <div className='flex justify-center'>
                                    <span className='bg-gradient-to-t from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text'>
                                        Bill ID
                                    </span>
                                </div>
                            </th>
                            <th className=''>
                                <span className='bg-gradient-to-t from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text'>
                                    User</span>ID
                            </th>
                            <th className=''>
                                <span className='bg-gradient-to-t from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text'>
                                    User</span>Name
                            </th>
                            <th className=''>
                                <span className='bg-gradient-to-t from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text'>
                                    Phone</span> Number
                            </th>
                            <th className=''><span className='bg-gradient-to-t from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text'>
                                Generated</span> Date
                            </th>
                            <th className=''
                            ><span className='bg-gradient-to-t from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text'>
                                    Total Amount
                                </span>
                            </th>
                            <th className=''
                            ><span className='bg-gradient-to-t from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text'>
                                    ACTI</span>ONS
                            </th>
                        </tr>
                    </thead>
                    {bills.map((ele, index) => (
                        <tbody key={index} className='border-t border-zinc-700 hover:bg-[#202022] transition-all'>
                            <tr className='hover:scale-[1.01]'>
                                <td className='flex justify-center py-3'>{ele.ID}</td>
                                <td className=''>
                                    <div className='flex justify-center'>
                                        {ele.USERID}
                                    </div>
                                </td>
                                <td className=''>
                                    <div className='flex justify-center'>
                                        {ele.NAME}
                                    </div>
                                </td>
                                <td className=''>
                                    <div className='flex justify-center'>
                                        {ele.PHONE}
                                    </div>
                                </td>
                                <td className=''>
                                    <div className='flex justify-center'>
                                        {formatDate(ele.GEN_DATE)}
                                    </div>
                                </td>
                                <td className=''>
                                    <div className='flex justify-center'>
                                        {ele.TOTAL_AMOUNT}
                                    </div>
                                </td>
                                <td>
                                    <div className='flex justify-center space-x-8'>
                                        <Link href={`/Bill?id=${ele.OID}`}>
                                            <button type="button" className='bg-zinc-800 hover:bg-pink-700 p-1 rounded-full px-2 hover:scale-[1.1] transition-all flex items-center justify-center space-x-1'>
                                                View Bill
                                            </button>
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </div>
        </div>
    )
}