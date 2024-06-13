import { useEffect, useState } from 'react';
import IngModal from './components/IngModal';
export default function Ingredients() {

    const [mode, setMode] = useState('');
    const [select, setSelect] = useState([]);

    const [modal, setModal] = useState(false);
    const [ind, setInd] = useState(0);

    const [ingredients, setIngredients] = useState([]);

    async function handleSaveChanges() {
        if ( select.length === 0 ){
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
                    body: JSON.stringify({select})
                }
                const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/ingredients`, postData);
                const response = await res.json();
                setIngredients(response.ingredients)
            }
        }
    }

    function handleCancel() {
        setSelect([]);
        setMode('');
    }
    
    function handleEdit(index) {
        setModal(true)
        setMode('edit');
        setInd(index)
    }
    
    function handleAdd(){
        setModal(true)
        setMode('add');
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

    async function getIngredients() {
        const postData = {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
        };
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/ingredients`, postData);
        const response = await res.json();
        setIngredients(response.ingredients);
    }

    useEffect(() => {
        getIngredients();
    }, [])

    return (
        <div className="flex flex-col bg-black justify-start items-center w-screen  ">
            <div className='flex flex-col items-center p-10 space-y-3'>
                <div className='text-3xl font-semibold tracking-widest leading-8'>
                    <span className='bg-gradient-to-b from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text'>INGRED</span>IENTS
                </div>
                <table className="bg-zinc-900 rounded-2xl w-[1000px] ">
                    <thead className='border-b border-white'>
                        <tr>
                            <th className='px-10 py-2'>
                                <div className='flex justify-center'>
                                    <span className='bg-gradient-to-t from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text'>
                                        NAME
                                    </span>
                                </div>
                            </th>
                            <th className=''>
                                <div className='flex justify-center'>
                                    <span className='bg-gradient-to-t from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text'>
                                        TYPE
                                    </span>
                                </div>
                            </th>
                            <th className=''>
                                <div className='flex justify-center space-x-2'>
                                    <span className='bg-gradient-to-t from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text'>
                                        UNIT OF
                                    </span>
                                    <span>
                                        MEASURE
                                    </span>
                                </div>
                            </th>
                            <th className=''>
                                <div className='flex justify-center'>
                                    <button onClick={handleAdd} type="button" className='hover:scale-[1.1] transition-all flex items-center justify-center space-x-3'>
                                        <span className='text-green-700 text-2xl transition-all'>
                                            +
                                        </span ><span className='text-lg'> <span className='bg-gradient-to-t from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text'>
                                            Add</span>  New Ingredient</span>
                                    </button>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    {ingredients.map((ele, index) => (
                        <tbody key={index} className='border-b border-zinc-700 hover:bg-[#202022] transition-all'>
                            <tr>
                                <td className='p-3'>
                                    <div className='flex justify-center'>
                                        {ele.NAME}
                                    </div>
                                </td>
                                <td className=''>
                                    <div className='flex justify-center'>
                                        {ele.TYPE}
                                    </div>
                                </td>
                                <td className=''>
                                    <div className='flex justify-center'>
                                        {ele.UOM}
                                    </div>
                                </td>
                                <td className=''>
                                    {mode !== 'remove'
                                        ? <div className='flex justify-center space-x-8'>
                                            <button onClick={()=>handleEdit(index)} type="button" className='hover:scale-[1.1] transition-all flex items-center justify-center space-x-1'>
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
            <IngModal
                isVisible={modal}
                mode = {mode}
                setModal = {setModal}
                setMode = {setMode}
                ingredient = {ingredients[ind]}
                setIngredients = {setIngredients}
            />
        </div>
    )
}