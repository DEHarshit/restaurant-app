import { useState, useEffect } from 'react'
import PreModal from './components/PreModal';

export default function PreMade() {

    const [dishes, setDishes] = useState([]);
    const [modal, setModal] = useState(false);

    const [id,setId] = useState('');
    const [name, setName] = useState('')
    const [counts, setCounts] = useState('');

    async function getDishes() {
        const postData = {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
        };
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/dishes`, postData);
        const response = await res.json();
        setDishes(response.dishes);
    }

    async function addCount(id, count, acount) {
        if (acount + count < 0) {
            count = -acount
        }
        const postData = {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ id: id, count: acount + count })
        };
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/dynamic`, postData);
        const response = await res.json();
        setDishes(response.dishes);
    }

    function handleAdd(ids,names,count){
        setModal(true);
        setId(ids);
        setCounts(count)
        setName(names)
    }

    useEffect(() => {
        getDishes();
    }, [])

    return (
        <div className="flex bg-black justify-center w-screen  ">
            <div className='flex flex-col items-center p-10 space-y-10'>
                <div className='text-3xl font-semibold tracking-widest leading-8'>
                    <span className='bg-gradient-to-b from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text'>Pre</span>Made
                </div>
                <table className="bg-zinc-900 rounded-2xl w-[1400px] ">
                    <thead className='border-b border-white'>
                        <tr>
                            <th className=''>
                                <span className='bg-gradient-to-t from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text'>
                                    Dish</span> Name
                            </th>
                            <th className=''>
                                <div className='flex justify-center'>
                                    <span className='bg-gradient-to-t from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text'>
                                        Current Available <span className='text-white'>Quantity</span>
                                    </span>
                                </div>
                            </th>
                            <th className='w-[500px]'>
                                <div className='hover:scale-[1.1] transition-all flex justify-center'>
                                    <button className='flex items-center justify-center space-x-3'>
                                        <span className='text-green-700 text-2xl transition-all'>
                                            +
                                        </span ><span className='text-lg'> <span className='bg-gradient-to-t from-[#CEA07E] to-[#BB5656] inline-block text-transparent bg-clip-text'>
                                            Add or Remove</span> Servings</span>
                                    </button>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    {dishes.map((ele, index) => {
                        if (ele.ISPRE === 1) {
                            return (
                                <tbody className='border-t border-zinc-700 hover:bg-[#202022] transition-all'>
                                    <tr key={index}>
                                        <td className='flex justify-center py-3'>
                                            <div className='flex justify-center'>
                                                {ele.NAME}
                                            </div>
                                        </td>
                                        <td className=''>
                                            <div className='flex justify-center'>
                                                {ele.COUNT}
                                            </div>
                                        </td>
                                        <td className=''>
                                            <div className='flex justify-center space-x-10'>
                                                <button type="button" onClick={()=>handleAdd(ele.ID,ele.NAME,ele.COUNT)} className='hover:bg-green-900 px-3 py-1 bg-zinc-600 rounded-xl hover:scale-[1.2] transition-all'>
                                                    +ADD
                                                </button>
                                                <button type="button" onClick={() => addCount(ele.ID, -1, ele.COUNT)} className='hover:bg-red-900 px-3 py-1 bg-zinc-600 rounded-xl hover:scale-[1.2] transition-all'>
                                                    -REMOVE
                                                </button>

                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            )
                        }
                    })}

                </table>
            </div>
            <div>
                <PreModal
                    isVisible={modal}
                    setModal={setModal}
                    id={id}
                    name={name}
                    counts={counts}
                    addCount={addCount}
                />
            </div>
        </div>
    )
}