import { useEffect, useState } from 'react';
import IngModal from './components/IngModal';
export default function Ingredients() {


    const [ingredients, setIngredients] = useState([]);

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
        <div className="flex bg-black justify-center w-screen  ">
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
                                    <button className='flex items-center justify-center space-x-3'>
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
                        <tbody className='border-b border-zinc-700'>
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
                                    <div className='flex justify-center'>
                                        <button className='flex items-center justify-center space-x-3'>
                                            <span className='text-blue-700 text-2xl transition-all'>
                                                +
                                            </span ><span className='text-lg'>Edit</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </div>
            <IngModal />
        </div>
    )
}