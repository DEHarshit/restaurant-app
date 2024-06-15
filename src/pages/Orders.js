import { useState, useEffect } from 'react'
import StockModal from './components/StockModal'

export default function Orders() {

    const [mode, setMode] = useState('');
    const [select, setSelect] = useState([]);

    const [modal, setModal] = useState(false);
    const [ind, setInd] = useState(0);

    const [stock, setStock] = useState([
        { ID: 1, NAME: "test1", QTY: "0.3", UOM: "kg", SUPPLIED_DATE: '2024-05-24', EXP_DATE: '2024-06-07' },
        { ID: 2, NAME: "test2", QTY: "0.1", UOM: "litre", SUPPLIED_DATE: '2024-05-24', EXP_DATE: '2024-06-07' },
        { ID: 3, NAME: "test3", QTY: "0.8", UOM: "kg", SUPPLIED_DATE: '2024-05-24', EXP_DATE: '2024-06-07' },
    ])

    async function handleSaveChanges() {
        if (select.length === 0) {
            handleCancel();
        } else {

        }
    }

    function handleCancel() {
        setSelect([]);
        setMode('');
    }

    function handleRemove(key) {
        if (mode === '') {
            setMode('remove')
            setSelect(sel => [...sel, key])
        }
        if (mode === 'remove') {
            if (!select.includes(key)) {
                setSelect(sel => [...sel, key])

            } else {
                setSelect(sel => {
                    return sel.filter(ele => ele !== key)
                })
            }
            console.log(select)
        }

    }

    function handleEdit(index) {
        setModal(true)
        setMode('edit');
        setInd(index)
    }

    function handleAdd() {
        setModal(true)
        setMode('add');
    }

    return (
        <div className="flex bg-black justify-center w-screen  ">
            <div className='flex flex-col items-center p-10 space-y-3'>
                <div className='text-3xl font-semibold tracking-widest leading-8'>
                    <span className='bg-gradient-to-b from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text'>ORD</span>ERS
                </div>
                <table className="bg-zinc-900 rounded-2xl w-[1400px] ">
                    <thead className='border-b border-white'>
                        <tr>
                            <th className=' py-2 w-[100px]'>
                                <div className='flex justify-center'>
                                    <span className='bg-gradient-to-t from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text'>
                                        Serial No.
                                    </span>
                                </div>
                            </th>
                            <th className=''>
                                    <span className='bg-gradient-to-t from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text'>
                                        Ingredient</span> Name
                            </th>
                            <th className=' w-[100px]'>
                                <div className='flex justify-center'>
                                    <span className='bg-gradient-to-t from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text'>
                                        Quantity
                                    </span>
                                </div>
                            </th>
                            <th className=''><span className='bg-gradient-to-t from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text'>
                                UO</span>M
                            </th>
                            <th className='w-[150px]'><span className='bg-gradient-to-t from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text'>
                                Supplied
                            </span> Date
                            </th>
                            <th className='w-[150px]'><span className='bg-gradient-to-t from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text'>
                                Expiry
                            </span> Date
                            </th>
                            <th className='w-[325px]'>
                                <div className='hover:scale-[1.1] transition-all flex justify-center'>
                                    <button onClick={handleAdd} className='flex items-center justify-center space-x-3'>
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
                        <tbody className='border-b border-zinc-700 hover:bg-[#202022] transition-all'>
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
                                <td className=''>
                                    {mode !== 'remove'
                                        ? <div className='flex justify-center space-x-8'>
                                            <button onClick={() => handleEdit(index)} type="button" className='hover:scale-[1.1] transition-all flex items-center justify-center space-x-1'>
                                                <span className='text-blue-700 text-2xl transition-all'>
                                                    +
                                                </span ><span className='text-lg'>Edit</span>
                                            </button>
                                            <button onClick={() => handleRemove(ele.ID)} type="button" className='hover:scale-[1.1] transition-all flex items-center justify-center space-x-1'>
                                                <span className='text-red-700 text-2xl transition-all'>
                                                    -
                                                </span ><span className='text-lg'>Remove</span>
                                            </button>
                                        </div>
                                        :
                                        <div className='flex justify-center'>
                                            <button onClick={() => handleRemove(ele.ID)} type="button" className={`${select.includes(ele.ID) ? 'scale-[1.1] font-bold text-red-800' : 'hover:scale-[1.1]'}  transition-all flex items-center justify-center space-x-1`}>
                                                <span className='text-red-700 text-2xl transition-all'>
                                                    -
                                                </span ><span className='text-lg'>Remove</span>
                                            </button>
                                        </div>
                                    }
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </div>
            {mode === 'remove' ?
                <div className='p-3 fixed bottom-0 right-0 '>
                    <div className='space-x-10 py-7 px-7 bg-zinc-700 rounded-lg bg-opacity-40'>
                        <button onClick={handleSaveChanges} type="button" className='hover:scale-[1.1] transition-all bg-green-600 text-lg p-1 rounded-full px-2'>
                            Save Changes
                        </button>
                        <button onClick={handleCancel} type="button" className='hover:scale-[1.1] transition-all bg-zinc-600 text-lg p-1 rounded-full px-2'>
                            Cancel
                        </button>
                    </div>
                </div> : null
            }
            <StockModal
                isVisible={modal}
                mode={mode}
                setModal={setModal}
                setMode={setMode}
            />
        </div>
    )
}