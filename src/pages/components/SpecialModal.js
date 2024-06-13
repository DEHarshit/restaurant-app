import { useState, useEffect } from "react";
import Ingredients from "../Ingredients";

export default function IngModal({ isVisible, setModal, dishes }) {

    const [special,setSpecial] = useState(0);


    function handleClose() {
        setModal(false);
    }

    async function handleSave() {
        const postData = {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({special: special})
        };
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/dishes`, postData);
        console.log(res);
        handleClose();
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
                <div>
                    <div className="py-10 px-10 flex flex-col items-center space-y-10">
                        <div>
                            <h2 className="font-bold tracking-widest leading-4">
                                <span className="bg-gradient-to-r from-[#CEA07E] to-[#BB5656] text-3xl  text-transparent inline-block bg-clip-text">
                                    SET TODAY'S<span className="text-white"> SPECIAL</span>
                                </span>
                            </h2>
                        </div>
                        <div className="px-10">
                            <div>
                                <div className='flex p-2 gap-2'>
                                    <select value={special} onChange={(e)=>setSpecial(e.target.value)} className='p-3 rounded-full p-1 text-primary font-medium bg-zinc-900 hover:bg-zinc-800 transition-all text-white text-xl'>
                                        {Array.isArray(dishes) ? dishes.map((dish, index) => (
                                            <option className="text-primary" key={index}>{dish.NAME}</option>
                                        )) : null}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='flex justify-center items-center space-x-10 py-7 px-7'>
                            <button onClick={handleSave} type="button" className='hover:scale-[1.1] transition-all bg-green-600 text-lg p-1 rounded-full px-2'>
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}