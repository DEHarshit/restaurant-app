import { useState, useEffect } from 'react'

export default function Orders() {

    const [order, setOrder] = useState([])
    const [dropDown, setDropDown] = useState(null);

    async function getOrders() {
        const postData = {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            }
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/orders`, postData);
        const response = await res.json();
        setOrder(response.orders)
    }

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    useEffect(() => {
        getOrders()
    }, [])

    return (
        <div className="flex bg-black justify-center w-screen  ">
            <div className='flex flex-col items-center p-10 space-y-3'>
                <div className='text-3xl font-semibold tracking-widest leading-8'>
                    <span className='bg-gradient-to-b from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text'>ORD</span>ERS
                </div>
                <table className="bg-zinc-900 rounded-2xl w-[1400px] ">
                    <thead className='border-b border-white'>
                        <tr>
                            <th className='py-2'>
                                <div className='flex justify-center'>
                                    <span className='bg-gradient-to-t from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text'>
                                        Serial No.
                                    </span>
                                </div>
                            </th>
                            <th className=''>
                                <span className='bg-gradient-to-t from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text'>
                                    Order</span>ed By
                            </th>
                            <th className=''>
                                <span className='bg-gradient-to-t from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text'>
                                    Phone</span> Number
                            </th>
                            <th className=''><span className='bg-gradient-to-t from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text'>
                                STA</span>TUS
                            </th>
                            <th className=''
                            ><span className='bg-gradient-to-t from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text'>
                                    DATE
                                </span>
                            </th>
                            <th className=''
                            ><span className='bg-gradient-to-t from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text'>
                                    ACTI</span>ONS
                            </th>
                        </tr>
                    </thead>
                    {order.map((ele, index) => (
                        <tbody className='border-b border-zinc-700 hover:bg-[#202022] transition-all'>
                            <tr key={index}>
                                <td className='flex justify-center py-3'>{index + 1}</td>
                                <td className=''>
                                    <div className='flex justify-center'>
                                        {ele.NAME}
                                    </div>
                                </td>
                                <td className=''>
                                    <div className='flex justify-center'>
                                        {ele.ORDPHONE}
                                    </div>
                                </td>
                                <td className=''>
                                    <div className='flex justify-center hover:scale-[1.1] transition-all'>
                                        <span className={`${ele.STATUS === 'Pending' ? 'text-red-800' : 'text-white'}`}>
                                            {ele.STATUS}
                                        </span>
                                    </div>
                                </td>
                                <td className=''>
                                    <div className='flex justify-center'>
                                        {formatDate(ele.DATE)}
                                    </div>
                                </td>
                                <td>
                                    <div className='flex justify-center space-x-8'>
                                        <button type="button" className='bg-zinc-800 hover:bg-green-700 p-1 rounded-full px-2 hover:scale-[1.1] transition-all flex items-center justify-center space-x-1'>
                                            Accept Order
                                        </button>
                                        <button type="button" className='bg-zinc-800 hover:bg-red-700 p-1 rounded-full px-2 hover:scale-[1.1] transition-all flex items-center justify-center space-x-1'>
                                            Cancel Order
                                        </button>
                                        <button type="button" onClick={()=>{dropDown == index ? setDropDown(null) : setDropDown(index)}}>
                                            <div className="  
                                            border-t-[7px] border-t-transparent
                                            border-r-[7px] border-r-white hover:border-r-zinc-500
                                            border-b-[7px] border-b-transparent -rotate-90 transition-all">
                                            </div>
                                        </button>
                                        {dropDown === index && (
                                            <div className='bg-zinc-800 rounded-xl'>
                                                Test
                                            </div>
                                        )}
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