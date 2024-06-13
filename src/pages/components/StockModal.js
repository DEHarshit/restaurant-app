import { useState, useEffect } from "react";
import Ingredients from "../Ingredients";

export default function IngModal({ isVisible, mode, setModal, setMode }) {
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [uom, setUom] = useState('')
    const [error, setError] = useState('')

    function handleClose() {
        setModal(false);
        setMode('');
    }

    async function handleEdit() {
        if (name === ingredient.NAME && type === ingredient.TYPE && uom === ingredient.UOM) {
            handleClose();
        } else {
            
        }
    }

    async function handleAdd() {
        if (name === '' || type === '' || uom === '') {
            setError('Fill every field')
        } else {
            
        }
    }


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
                                        EDIT INGREDIENT<span className="text-white"> DETAILS</span>
                                    </span>
                                </h2>
                            </div>
                            <div className="px-10">
                                <span>
                                    <h2 className="bg-zinc-900 p-1 w-fit h-fit translate-x-4 translate-y-3 rounded-lg font-semibold tracking-wide leading-4">
                                        <span className="bg-gradient-to-r from-[#CEA07E] to-[#BB5656] text-transparent inline-block bg-clip-text">
                                            Ingredient <span className="text-white">Name</span>
                                        </span>
                                    </h2>
                                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="p-1 border bg-zinc-900 border-2 border-white text-white h-[45px] w-[250px] rounded-lg" />
                                </span>
                                <span>
                                    <h2 className="bg-zinc-900 p-1 w-fit h-fit translate-x-4 translate-y-3 rounded-lg font-semibold tracking-wide leading-4">
                                        <span className="bg-gradient-to-r from-[#CEA07E] to-[#BB5656] text-transparent inline-block bg-clip-text">
                                            Type
                                        </span>
                                    </h2>
                                    <input value={type} onChange={(e) => setType(e.target.value)} type="text" className="p-1 border bg-zinc-900 border-2 border-white text-white h-[45px] w-[250px] rounded-lg" />
                                </span>
                                <span>
                                    <h2 className="bg-zinc-900 p-1 w-fit h-fit translate-x-4 translate-y-3 rounded-lg font-semibold tracking-wide leading-4">
                                        <span className="bg-gradient-to-r from-[#CEA07E] to-[#BB5656] text-transparent inline-block bg-clip-text">
                                            Unit of <span className="text-white">Measure</span>
                                        </span>
                                    </h2>
                                    <input value={uom} onChange={(e) => setUom(e.target.value)} type="text" className="p-1 border bg-zinc-900 border-2 border-white text-white h-[45px] w-[250px] rounded-lg" />
                                </span>
                            </div>
                        </div>
                        <div>
                            <div className='flex justify-center items-center space-x-10 py-7 px-7'>
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
                                            ADD INGREDIENT<span className="text-white"> DETAILS</span>
                                        </span>
                                    </h2>
                                </div>
                                <div className="px-10">
                                    <span>
                                        <h2 className="bg-zinc-900 p-1 w-fit h-fit translate-x-4 translate-y-3 rounded-lg font-semibold tracking-wide leading-4">
                                            <span className="bg-gradient-to-r from-[#CEA07E] to-[#BB5656] text-transparent inline-block bg-clip-text">
                                                Ingredient <span className="text-white">Name</span>
                                            </span>
                                        </h2>
                                        <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="p-1 border bg-zinc-900 border-2 border-white text-white h-[45px] w-[250px] rounded-lg" />
                                    </span>
                                    <span>
                                        <h2 className="bg-zinc-900 p-1 w-fit h-fit translate-x-4 translate-y-3 rounded-lg font-semibold tracking-wide leading-4">
                                            <span className="bg-gradient-to-r from-[#CEA07E] to-[#BB5656] text-transparent inline-block bg-clip-text">
                                                Type
                                            </span>
                                        </h2>
                                        <input value={type} onChange={(e) => setType(e.target.value)} type="text" className="p-1 border bg-zinc-900 border-2 border-white text-white h-[45px] w-[250px] rounded-lg" />
                                    </span>
                                    <span>
                                        <h2 className="bg-zinc-900 p-1 w-fit h-fit translate-x-4 translate-y-3 rounded-lg font-semibold tracking-wide leading-4">
                                            <span className="bg-gradient-to-r from-[#CEA07E] to-[#BB5656] text-transparent inline-block bg-clip-text">
                                                Unit of <span className="text-white">Measure</span>
                                            </span>
                                        </h2>
                                        <input value={uom} onChange={(e) => setUom(e.target.value)} type="text" className="p-1 border bg-zinc-900 border-2 border-white text-white h-[45px] w-[250px] rounded-lg" />
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