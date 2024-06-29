import { useState, useEffect } from "react";
import Ingredients from "../Ingredients";

export default function IngModal({ isVisible, mode, setModal, setMode, setStock, currStock, setCstock, setVstock, setGstock, setMstock }) {
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [uom, setUom] = useState('')
    const [error, setError] = useState('')



    const [ingredients, setIngredients] = useState([])
    const [selectIngredient, setSelectIngredient] = useState('')
    const [qty, setQty] = useState('');
    const [exp, setExp] = useState('');

    function handleClose() {
        setModal(false);
        setMode('');
    }

    async function handleEdit() {
        if (selectIngredient === currStock.INAME && qty === currStock.QTY && exp === currStock.EXP_DATE) {
            handleClose();
        } else if (qty === '' || exp === '') {
            setError('Fill every field')
        } else {
            const postData = {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ id: currStock.ID, ing: selectIngredient, qty: qty, exp: exp })
            };
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/stock`, postData);
            if (res.status === 200) {
                const response = await res.json();
                setStock(response.stock);
                setMstock(response.mstock)
                setVstock(response.vstock)
                setGstock(response.gstock)
                setCstock(response.cstock)
                handleClose();
            }
            else {
                console.log(res)
            }
        }
    }

    async function handleAdd() {
        if (qty === '' || exp === '') {
            setError('Fill every field')
        } else {
            const postData = {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ ing: selectIngredient, qty: qty, exp: exp })
            };
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/stock`, postData);
            if (res.status === 200) {
                const response = await res.json();
                setStock(response.stock);
                handleClose();
            }
            else {
                console.log(res)
            }
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

    useEffect(() => {
        if (mode === 'edit' && currStock) {
            setId(currStock.ID)
            setSelectIngredient(currStock.INAME);
            setQty(currStock.QTY);
            const expDate = new Date(currStock.EXP_DATE);
            expDate.setDate(expDate.getDate() + 1);
            setExp(expDate.toISOString().split('T')[0]);
        } else {
            setSelectIngredient('');
            setQty('');
            setExp('');
        }
    }, [mode, currStock])


    if (!isVisible) return null
    return (
        <div className="flex justify-center items-center fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm">
            <div className="relative w-[600px] h-[380px] bg-zinc-900 bg-opacity-70 rounded-xl">
                <div className="font-bold text-3xl right-0 absolute p-3 px-6 hover:scale-[1.1] transition-all">
                    <button onClick={handleClose} type="button">
                        X
                    </button>
                </div>
                {mode === 'edit'
                    ?
                    <div>
                        <div className="py-10 px-10 flex">
                            <div>
                                <h2 className="font-bold tracking-widest leading-4">
                                    <span className="bg-gradient-to-r from-[#CEA07E] to-[#BB5656] text-3xl  text-transparent inline-block bg-clip-text">
                                        EDIT CURRENT<span className="text-white"> STOCK</span>
                                    </span>
                                </h2>
                            </div>
                            <div className="px-10">
                                <div> {/* Ingredients */}
                                    <div className='flex flex-col'>
                                        {(Array.isArray(ingredients)) ? (
                                            <div>
                                                <h2 className="bg-zinc-900 p-1 w-fit h-fit translate-x-4 translate-y-3 rounded-lg font-semibold tracking-wide leading-4">
                                                    <span className="bg-gradient-to-r from-[#CEA07E] to-[#BB5656] text-transparent inline-block bg-clip-text">
                                                        Ingredient <span className="text-white">Name</span>
                                                    </span>
                                                </h2>
                                                <div className='flex space-x-4'>
                                                    <select value={selectIngredient} onChange={(e) => setSelectIngredient(e.target.value)} id='ing' name='ing'
                                                        className='p-1 border bg-zinc-900 border-2 border-white text-white h-[45px] w-[255px] rounded-lg'>
                                                        {(Array.isArray(ingredients)) ?
                                                            ingredients.map((opts, i) => <option className='font-primary p-1 border bg-zinc-900 border-2 border-white text-white h-[45px] w-[250px] rounded-lg' key={i}>{opts.NAME}</option>) : null
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                        ) : null}
                                    </div>
                                </div>

                                <span>
                                    <h2 className="bg-zinc-900 p-1 w-fit h-fit translate-x-4 translate-y-3 rounded-lg font-semibold tracking-wide leading-4">
                                        <span className="bg-gradient-to-r from-[#CEA07E] to-[#BB5656] text-transparent inline-block bg-clip-text">
                                            Ingredient <span className="text-white">Quantity</span>
                                        </span>
                                    </h2>
                                    <div className='flex items-center space-x-5'>
                                        <input step="0.1" value={qty} onChange={(e) => setQty(e.target.value)} type="number" className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none p-1 border bg-zinc-900 border-2 border-white text-white h-[43px] w-[250px] rounded-lg" />
                                        <label>g/ml</label>
                                    </div>
                                </span>

                                {currStock.TYPE === 'Groceries'
                                ?
                                <span>
                                    <h2 className="bg-zinc-900 p-1 w-fit h-fit translate-x-4 translate-y-3 rounded-lg font-semibold tracking-wide leading-4">
                                        <span className="bg-gradient-to-r from-[#CEA07E] to-[#BB5656] text-transparent inline-block bg-clip-text">
                                            Expiry <span className="text-white">Date</span>
                                        </span>
                                    </h2>
                                    <div className='flex items-center space-x-5'>
                                        <input value={exp} onChange={(e) => setExp(e.target.value)} type="date" className=" p-1 border bg-zinc-900 border-2 border-white text-white h-[45px] w-[250px] rounded-lg" />
                                    </div>
                                </span>
                                :null
                                }
                            </div>
                        </div>
                        <div>
                            <div className='flex flex-col justify-center items-center space-y-2'>
                                <h2 className="text-red-600">{error}</h2>
                                <button onClick={handleEdit} type="button" className='hover:scale-[1.1] transition-all bg-green-600 text-lg p-1 rounded-full px-2'>
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                    : mode === 'add'
                        ?
                        <div>
                            <div className="py-10 px-10 flex">
                                <div>
                                    <h2 className="font-bold tracking-widest leading-4">
                                        <span className="bg-gradient-to-r from-[#CEA07E] to-[#BB5656] text-3xl  text-transparent inline-block bg-clip-text">
                                            ADD NEW<span className="text-white"> STOCK</span>
                                        </span>
                                    </h2>
                                </div>
                                <div className="px-10">
                                    <div> {/* Ingredients */}
                                        <div className='flex flex-col'>
                                            {(Array.isArray(ingredients)) ? (
                                                <div>
                                                    <h2 className="bg-zinc-900 p-1 w-fit h-fit translate-x-4 translate-y-3 rounded-lg font-semibold tracking-wide leading-4">
                                                        <span className="bg-gradient-to-r from-[#CEA07E] to-[#BB5656] text-transparent inline-block bg-clip-text">
                                                            Ingredient <span className="text-white">Name</span>
                                                        </span>
                                                    </h2>
                                                    <div className='flex space-x-4'>
                                                        <select value={selectIngredient} onChange={(e) => setSelectIngredient(e.target.value)} id='ing' name='ing'
                                                            className='p-1 border bg-zinc-900 border-2 border-white text-white h-[45px] w-[255px] rounded-lg'>
                                                            {(Array.isArray(ingredients)) ?
                                                                ingredients.map((opts, i) => <option className='font-primary p-1 border bg-zinc-900 border-2 border-white text-white h-[45px] w-[250px] rounded-lg' key={i}>{opts.NAME}</option>) : null
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>

                                    <span>
                                        <h2 className="bg-zinc-900 p-1 w-fit h-fit translate-x-4 translate-y-3 rounded-lg font-semibold tracking-wide leading-4">
                                            <span className="bg-gradient-to-r from-[#CEA07E] to-[#BB5656] text-transparent inline-block bg-clip-text">
                                                Ingredient <span className="text-white">Quantity</span>
                                            </span>
                                        </h2>
                                        <div className='flex items-center space-x-5'>
                                            <input step="0.1" value={qty} onChange={(e) => setQty(e.target.value)} type="number" className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none p-1 border bg-zinc-900 border-2 border-white text-white h-[43px] w-[250px] rounded-lg" />
                                            <label>g/ml</label>
                                        </div>
                                    </span>

                                    <span>
                                        <h2 className="bg-zinc-900 p-1 w-fit h-fit translate-x-4 translate-y-3 rounded-lg font-semibold tracking-wide leading-4">
                                            <span className="bg-gradient-to-r from-[#CEA07E] to-[#BB5656] text-transparent inline-block bg-clip-text">
                                                Expiry <span className="text-white">Date</span>
                                            </span>
                                        </h2>
                                        <div className='flex items-center space-x-5'>
                                            <input value={exp} onChange={(e) => setExp(e.target.value)} type="date" className=" p-1 border bg-zinc-900 border-2 border-white text-white h-[45px] w-[250px] rounded-lg" />
                                        </div>
                                    </span>
                                </div>
                            </div>
                            <div>
                                <div className='flex flex-col justify-center items-center space-y-2'>
                                    <h2 className="text-red-600">{error}</h2>
                                    <button onClick={handleAdd} type="button" className='hover:scale-[1.1] transition-all bg-green-600 text-lg p-1 rounded-full px-2'>
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                        : null
                }
            </div>
        </div>
    )
}