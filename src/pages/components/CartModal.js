import { useState } from "react";

export default function CartModal({ isVisible, setModal, cart, setCart, qty, setQty }) {

    function handleClose() {
        setModal(false);
    }

    function handleAdd(index) {
        const newQty = [...qty];
        newQty[index] += 1;
        setQty(newQty);
    }

    function handleCancel(){
        setCart([])
        setQty([])
        }

    function handleReduce(index) {
        if (qty[index] === 1) {
            // Remove item from cart if quantity is reduced to zero
            setCart((prevCart) => prevCart.filter((_, ind) => ind !== index));
            setQty((prevQty) => prevQty.filter((_, ind) => ind !== index));
        } else {
            const newQty = [...qty];
            newQty[index] -= 1;
            setQty(newQty);
        }
    }

    if (!isVisible) return null;

    return (
        <div className="flex justify-center items-center fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm">
            <div className="relative w-[1000px] h-[600px] bg-zinc-900 bg-opacity-70 rounded-xl p-6 overflow-auto">
                <div className="flex justify-between items-center mb-4"><div className="bg-gradient-to-t from-[#CEA07E] to-[#BB5656] text-transparent bg-clip-text text-3xl font-primary font-bold text-center">
                                SHOPPING CART
                </div>

                    <button onClick={handleClose} className="text-2xl text-white hover:text-gray-300">
                        X
                    </button>
                </div>
                <div className="overflow-y-auto">
                <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-500">
                                <th className="bg-gradient-to-t from-[#CEA07E] to-[#BB5656] text-transparent bg-clip-text py-2 px-4 text-left text-2xl">
                                    DISH
                                </th>
                                <th className="bg-gradient-to-t from-[#CEA07E] to-[#BB5656] text-transparent bg-clip-text py-2 px-4 text-left text-2xl">
                                    QUANTITY
                                </th>
                                <th className="bg-gradient-to-t from-[#CEA07E] to-[#BB5656] text-transparent bg-clip-text py-2 px-4 text-left text-2xl">
                                    ACTIONS
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item, index) => (
                                <tr key={index} className="border-b border-gray-300">
                                    <td className="py-2 px-4 text-lg ">{item}</td>
                                    <td className="py-2 px-4 text-lg ">{qty[index]}</td>
                                    <td className="py-2 px-4 space-x-4">
                                        <button onClick={() => handleAdd(index)} className="text-2xl text-green-600 hover:text-green-800 mr-2">
                                            + <span className='text-2xl text-lg text-white'>ADD</span>
                                        </button>
                                        <button onClick={() => handleReduce(index)} className="text-2xl text-red-600 hover:text-red-800">
                                            - <span className='text-2xl text-lg text-white'>REMOVE</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                </table>

                <div className="flex justify-end mt-4">
                <button className="text-white text-lg px-4 py-2 rounded-md mr-4 bg-gradient-to-t from-[#CEA07E] to-[#BB5656] hover:from-[#BB5656] hover:to-[#CEA07E] hover:text-white hover:bg-gradient-to-t hover:bg-gradient-to-b">
    Place Order
</button>

 <button onClick={() => handleCancel()} className="text-white text-lg px-4 py-2 rounded-md mr-4 bg-gradient-to-t from-[#CEA07E] to-[#BB5656] hover:from-[#BB5656] hover:to-[#CEA07E] hover:text-white hover:bg-gradient-to-t hover:bg-gradient-to-b">
                            Cancel
                        </button>
                </div>

                </div>
            </div>
        </div>
    );
}
