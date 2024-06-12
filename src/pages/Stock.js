import { useState, useEffect } from 'react'


export default function Stock() {

    const [stock, setStock] = useState([
        { NAME: "test", QTY: "0.3", UOM: "kg", SUPPLIED_DATE: '2024-05-24', EXP_DATE: '2024-06-07' },
        { NAME: "test2", QTY: "0.1", UOM: "litre", SUPPLIED_DATE: '2024-05-24', EXP_DATE: '2024-06-07' },
        { NAME: "test3", QTY: "0.8", UOM: "kg", SUPPLIED_DATE: '2024-05-24', EXP_DATE: '2024-06-07' },
    ])

    return (
        <div className="flex bg-black justify-center w-screen  ">
            <div className='flex flex-col items-center p-10 space-y-3'>
                <div className='text-3xl font-semibold tracking-widest leading-8'>
                    <span className='bg-gradient-to-b from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text'>STO</span>CK
                </div>
                <table className="bg-zinc-900 rounded-2xl w-[1500px] ">
                    <thead className='border-b border-white'>
                        <tr>
                            <th className=' py-2 '>
                                <div className='flex justify-center'>
                                    <span className='bg-gradient-to-t from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text'>
                                        Serial No.
                                    </span>
                                </div>
                            </th>
                            <th className=''>
                                <div className='flex justify-center'>
                                    <span className='bg-gradient-to-t from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text'>
                                        Name
                                    </span>
                                </div>
                            </th>
                            <th className=''>
                                <div className='flex justify-center'>
                                    <span className='bg-gradient-to-t from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text'>
                                        Quantity
                                    </span>
                                </div>
                            </th>
                            <th className=''><span className='bg-gradient-to-t from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text'>
                                UO</span>M
                            </th>
                            <th className=''><span className='bg-gradient-to-t from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text'>
                                Supplied
                            </span> Date
                            </th>
                            <th className=''><span className='bg-gradient-to-t from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text'>
                                Expiry
                            </span> Date
                            </th>
                            <th className=''>
                                <div className='flex justify-center'>
                                    <button className='flex items-center justify-center space-x-3'>
                                        <span className='text-green-700 text-2xl transition-all'>
                                            +
                                        </span ><span className='text-lg'> <span className='bg-gradient-to-t from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text'>
                                            Add</span> Stock</span>
                                    </button>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    {stock.map((ele, index) => (
                        <tbody className='border-b border-zinc-700'>
                            <tr key={index}>
                                <td className='flex justify-center py-2'>{index + 1}</td>
                                <td className=''>
                                    <div className='flex justify-center'>
                                        {ele.NAME}
                                    </div>
                                </td>
                                <td className=''>
                                    <div className='flex justify-center'>
                                        {ele.QTY}
                                    </div>
                                </td>
                                <td className=''>
                                    <div className='flex justify-center'>
                                        {ele.UOM}
                                    </div>
                                </td>
                                <td className=''>
                                    <div className='flex justify-center'>
                                        {ele.SUPPLIED_DATE}
                                    </div>
                                </td>
                                <td className=''>
                                    <div className='flex justify-center'>
                                        {ele.EXP_DATE}
                                    </div>
                                </td>
                                <td className='py-2'>
                                    <div className='flex justify-center'>
                                        <button className='hover:scale-[1.1] transition-all flex items-center justify-center space-x-3'>
                                            <span className='text-red-700 text-2xl transition-all'>
                                                -
                                            </span ><span className='text-lg'>Remove Stock</span>
                                        </button>
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