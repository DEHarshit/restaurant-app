import { useState, useEffect } from 'react'
import StockModal from './components/StockModal'

export default function Stock() {

    const [mode, setMode] = useState('');
    const [select, setSelect] = useState([]);

    const [modal, setModal] = useState(false);
    const [ind, setInd] = useState(0);

    const [stock, setStock] = useState([]);
    const [mstock, setMstock] = useState([]);
    const [vstock, setVstock] = useState([]);
    const [gstock, setGstock] = useState([]);
    const [cstock, setCstock] = useState([]);

    async function handleSaveChanges() {
        if (select.length === 0) {
            handleCancel();
        } else {
            await revIngredient();
            setTimeout(() => handleCancel(), 100)
            async function revIngredient() {
                const postData = {
                    method: "DELETE",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({ select })
                }
                const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/stock`, postData);
                const response = await res.json();
                setStock(response.stock);
                setMstock(response.mstock)
                setVstock(response.vstock)
                setGstock(response.gstock)
                setCstock(response.cstock)
            }
        }
    }

    async function getStock() {
        const postData = {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
        };
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/stock`, postData);
        const response = await res.json();
        setStock(response.stock);
        setMstock(response.mstock)
        setVstock(response.vstock)
        setGstock(response.gstock)
        setCstock(response.cstock)
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
        let ind = stock.findIndex(ele => ele.ID === index)
        setInd(ind)
    }

    function handleAdd() {
        setModal(true)
        setMode('add');
    }

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    useEffect(() => {
        getStock();
    }, [])

    return (
        <div className="flex bg-black items-center py-5 w-screen flex-col">
            <div className='text-4xl font-semibold tracking-widest leading-8'>
                <span className='bg-gradient-to-b from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text'>STO</span>CK
            </div>
            <div className='flex flex-col items-center p-10 space-y-10'>
                <div className='text-3xl font-semibold tracking-widest leading-8'>
                    <span className='bg-gradient-to-b from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text'>MEAT </span> STOCK
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
                            <th className=' py-2 w-[100px]'>
                                <div className='flex justify-center'>
                                    <span className='bg-gradient-to-t from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text'>
                                        Batch No.
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
                    {mstock.map((ele, index) => (
                        <tbody className='border-t border-zinc-700 hover:bg-[#202022] transition-all'>
                            <tr key={index}>
                                <td className='flex justify-center py-2'>{index + 1}</td>
                                <td className=''>
                                    <div className='flex justify-center text-zinc-600'>
                                        {ele.SID}
                                    </div>
                                </td>
                                <td className=''>
                                    <div className='flex justify-center'>
                                        {ele.INAME}
                                    </div>
                                </td>
                                <td className=''>
                                    <div className='flex justify-center'>
                                        {ele.QTY}
                                    </div>
                                </td>
                                <td className=''>
                                    <div className='flex justify-center'>
                                        g/ml
                                    </div>
                                </td>
                                <td className=''>
                                    <div className='flex justify-center'>
                                        {formatDate(ele.SUPPLIED_DATE)}
                                    </div>
                                </td>
                                <td className=''>
                                    {mode !== 'remove'
                                        ? <div className='flex justify-center space-x-8'>
                                            <button onClick={() => handleEdit(ele.ID)} type="button" className='hover:scale-[1.1] transition-all flex items-center justify-center space-x-1'>
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
                <div className='text-3xl font-semibold tracking-widest leading-8'>
                    <span className='bg-gradient-to-b from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text'>VEGETABLE </span> STOCK
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
                            <th className=' py-2 w-[100px]'>
                                <div className='flex justify-center'>
                                    <span className='bg-gradient-to-t from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text'>
                                        Batch No.
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
                    {vstock.map((ele, index) => (
                        <tbody className='border-t border-zinc-700 hover:bg-[#202022] transition-all'>
                            <tr key={index}>
                                <td className='flex justify-center py-2'>{index + 1}</td>
                                <td className=''>
                                    <div className='flex justify-center text-zinc-600'>
                                        {ele.SID}
                                    </div>
                                </td>
                                <td className=''>
                                    <div className='flex justify-center'>
                                        {ele.INAME}
                                    </div>
                                </td>
                                <td className=''>
                                    <div className='flex justify-center'>
                                        {ele.QTY}
                                    </div>
                                </td>
                                <td className=''>
                                    <div className='flex justify-center'>
                                        g/ml
                                    </div>
                                </td>
                                <td className=''>
                                    <div className='flex justify-center'>
                                        {formatDate(ele.SUPPLIED_DATE)}
                                    </div>
                                </td>
                                <td className=''>
                                    {mode !== 'remove'
                                        ? <div className='flex justify-center space-x-8'>
                                            <button onClick={() => handleEdit(ele.ID)} type="button" className='hover:scale-[1.1] transition-all flex items-center justify-center space-x-1'>
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
                <div className='text-3xl font-semibold tracking-widest leading-8'>
                    <span className='bg-gradient-to-b from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text'>GROCERIES </span> STOCK
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
                            <th className=' py-2 w-[100px]'>
                                <div className='flex justify-center'>
                                    <span className='bg-gradient-to-t from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text'>
                                        Batch No.
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
                    {gstock.map((ele, index) => (
                        <tbody className='border-t border-zinc-700 hover:bg-[#202022] transition-all'>
                            <tr key={index}>
                                <td className='flex justify-center py-2'>{index + 1}</td>
                                <td className=''>
                                    <div className='flex justify-center text-zinc-600'>
                                        {ele.SID}
                                    </div>
                                </td>
                                <td className=''>
                                    <div className='flex justify-center'>
                                        {ele.INAME}
                                    </div>
                                </td>
                                <td className=''>
                                    <div className='flex justify-center'>
                                        {ele.QTY}
                                    </div>
                                </td>
                                <td className=''>
                                    <div className='flex justify-center'>
                                        g/ml
                                    </div>
                                </td>
                                <td className=''>
                                    <div className='flex justify-center'>
                                        {formatDate(ele.SUPPLIED_DATE)}
                                    </div>
                                </td>
                                <td className=''>
                                    <div className='flex justify-center'>
                                        {formatDate(ele.EXP_DATE)}
                                    </div>
                                </td>
                                <td className=''>
                                    {mode !== 'remove'
                                        ? <div className='flex justify-center space-x-8'>
                                            <button onClick={() => handleEdit(ele.ID)} type="button" className='hover:scale-[1.1] transition-all flex items-center justify-center space-x-1'>
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
                <div className='text-3xl font-semibold tracking-widest leading-8'>
                    <span className='bg-gradient-to-b from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text'>CONDIMENTS </span> STOCK
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
                            <th className=' py-2 w-[100px]'>
                                <div className='flex justify-center'>
                                    <span className='bg-gradient-to-t from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text'>
                                        Batch No.
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
                    {cstock.map((ele, index) => (
                        <tbody className='border-t border-zinc-700 hover:bg-[#202022] transition-all'>
                            <tr key={index}>
                                <td className='flex justify-center py-2'>{index + 1}</td>
                                <td className=''>
                                    <div className='flex justify-center text-zinc-600'>
                                        {ele.SID}
                                    </div>
                                </td>
                                <td className=''>
                                    <div className='flex justify-center'>
                                        {ele.INAME}
                                    </div>
                                </td>
                                <td className=''>
                                    <div className='flex justify-center'>
                                        {ele.QTY}
                                    </div>
                                </td>
                                <td className=''>
                                    <div className='flex justify-center'>
                                        g/ml
                                    </div>
                                </td>
                                <td className=''>
                                    <div className='flex justify-center'>
                                        {formatDate(ele.SUPPLIED_DATE)}
                                    </div>
                                </td>
                                <td className=''>
                                    {mode !== 'remove'
                                        ? <div className='flex justify-center space-x-8'>
                                            <button onClick={() => handleEdit(ele.ID)} type="button" className='hover:scale-[1.1] transition-all flex items-center justify-center space-x-1'>
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
                setStock={setStock}
                currStock={stock[ind]}
                setVstock={setVstock}
                setGstock={setGstock}
                setMstock={setMstock}
                setCstock={setCstock}
            />
        </div>
    )
}